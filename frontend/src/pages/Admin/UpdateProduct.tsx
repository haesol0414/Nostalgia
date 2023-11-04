import React, { useEffect, useState } from 'react';
import styles from './UpdateProduct.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import BorderInput from '../../components/Input/BorderInput';
import {
	brand,
	gender,
	concentration,
	hashTags,
} from '../../assets/datas/enum';
import SmallButton from '../../components/Button/SmallButton';
import TextArea from '../../components/TextArea/TextArea';
import { Product } from '../../model/product';
import {
	MessageResponse,
	addNewProduct,
	getProductsDetails,
} from '../../utils/apiRequests';
import { useNavigate, useParams } from 'react-router-dom';
import SelectBox from '../../components/SelectBox/SelectBox';

interface ProductDetailResponse {
	message: string;
	productInfo: Product;
}

export default function UpdateProduct() {
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product>();
	const params = useParams();
	const productId = params.productId;

	// 상품 상세 불러오기
	useEffect(() => {
		const getProductInformation = async () => {
			if (productId) {
				try {
					const response =
						await getProductsDetails<ProductDetailResponse>(
							productId,
						);

					console.log('상품 상세 정보 : ', response);

					if (response.data) {
						setProduct(response.data.productInfo);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		getProductInformation();
	}, [productId]);

	const handleSizeChange = (
		index: number,
		newSize: string,
		newPrice: string,
	) => {
		if (product) {
			const updatedPriceBySize = [...product.priceBySize];

			updatedPriceBySize[index] = {
				size: parseInt(newSize, 10),
				price: parseInt(newPrice, 10),
			};

			setProduct({ ...product, priceBySize: updatedPriceBySize });
		}
	};

	const handleMainImageURLChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (product) {
			const updatedMainImages = [...product.mainImage];
			updatedMainImages[index] = e.target.value;
			setProduct({ ...product, mainImage: updatedMainImages });
		}
	};

	const addMainImageInput = () => {
		if (product) {
			setProduct({ ...product, mainImage: [...product.mainImage, ''] });
		}
	};

	const handleSubmitButton = async () => {
		try {
			const response = await addNewProduct<MessageResponse>({
				product,
			});

			alert('상품 등록 완료');
			navigate('/admin');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className={styles.adminSection}>
				{product ? (
					<div className={styles.addProductFrom}>
						<h5>상품 추가</h5>
						<label>
							Title:
							<BorderInput
								type="text"
								value={product.title}
								onChange={e =>
									setProduct({
										...product,
										title: e.target.value,
									})
								}
							/>
						</label>

						<label>
							Gender:
							<SelectBox
								options={gender}
								selectedValue={product.gender}
								onSelect={selectedValue =>
									setProduct({
										...product,
										gender: selectedValue,
									})
								}
							></SelectBox>
						</label>

						<label>
							Brand:
							<SelectBox
								options={brand}
								selectedValue={product.brand}
								onSelect={selectedValue =>
									setProduct({
										...product,
										brand: selectedValue,
									})
								}
							></SelectBox>
						</label>

						{product.priceBySize.map((sizeInfo, index) => (
							<div key={index}>
								<label>
									Size:
									<BorderInput
										type="text"
										value={sizeInfo.size}
										onChange={e =>
											handleSizeChange(
												index,
												e.target.value,
												sizeInfo.price.toString(),
											)
										}
									/>
								</label>

								<label>
									Price:
									<BorderInput
										type="text"
										value={sizeInfo.price}
										onChange={e =>
											handleSizeChange(
												index,
												sizeInfo.size.toString(),
												e.target.value,
											)
										}
									/>
								</label>
								{index !== 0 && (
									<button
										className={styles.closeButton}
										onClick={() => {
											const updatedPriceBySize = [
												...product.priceBySize,
											];
											updatedPriceBySize.splice(index, 1);
											setProduct({
												...product,
												priceBySize: updatedPriceBySize,
											});
										}}
									>
										삭제
									</button>
								)}
							</div>
						))}

						<div className={styles.addButton}>
							<SmallButton
								text="사이즈 추가"
								onClick={() =>
									setProduct({
										...product,
										priceBySize: [
											...product.priceBySize,
											{ size: 0, price: 0 },
										],
									})
								}
							/>
						</div>

						<label>
							Concentration:
							<SelectBox
								options={concentration}
								selectedValue={product.concentration}
								onSelect={selectedValue =>
									setProduct({
										...product,
										concentration: selectedValue,
									})
								}
							></SelectBox>
						</label>

						<label>
							CurrentAmount:
							<BorderInput
								value={product.currentAmount}
								onChange={e =>
									setProduct({
										...product,
										currentAmount: Number(e.target.value),
									})
								}
							/>
						</label>

						<label>
							Description:
							<TextArea
								value={product.description}
								onChange={e =>
									setProduct({
										...product,
										description: e.target.value,
									})
								}
							/>
						</label>

						{product.mainImage.map((mainImageURL, index) => (
							<div key={index}>
								<label>
									MainImage:
									<BorderInput
										type="text"
										value={mainImageURL}
										onChange={e =>
											handleMainImageURLChange(index, e)
										}
									/>
								</label>
								{index !== 0 && (
									<button
										className={styles.closeButton}
										onClick={() => {
											const updatedMainImages = [
												...product.mainImage,
											];
											updatedMainImages.splice(index, 1);
											setProduct({
												...product,
												mainImage: updatedMainImages,
											});
										}}
									>
										삭제
									</button>
								)}
							</div>
						))}
						<div className={styles.addButton}>
							<SmallButton
								text="이미지 추가"
								onClick={addMainImageInput}
							/>
						</div>
						<label>
							HashTag:
							<SelectBox
								options={hashTags}
								selectedValue={product.hashTag}
								onSelect={selectedValue =>
									setProduct({
										...product,
										hashTag: selectedValue,
									})
								}
							></SelectBox>
						</label>
						<BlackButton
							text="상품 추가"
							onClick={handleSubmitButton}
						/>
					</div>
				) : (
					<p>상품을 조회할 수 없습니다.</p>
				)}
			</section>
		</>
	);
}
