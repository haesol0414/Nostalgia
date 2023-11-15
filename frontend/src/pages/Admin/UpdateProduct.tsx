import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddAndUpdateProduct.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { Product } from '../../model/product';
import {
	MessageResponse,
	getProductsDetails,
	patchProductDetail,
} from '../../utils/apiRequests';
import ProductForm from '../../components/ProductForm/ProductForm';
import { isFieldEmpty } from '../../utils/isFieldEmpty';

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

	const handleFieldChange = (field: string, value: any) => {
		if (product) {
			setProduct({ ...product, [field]: value });
		}
	};

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

	const addPriceBySizeInput = () => {
		if (product) {
			setProduct({
				...product,
				priceBySize: [...product.priceBySize, { size: 0, price: 0 }],
			});
		}
	};
	const addMainImageInput = () => {
		if (product) {
			setProduct({ ...product, mainImage: [...product.mainImage, ''] });
		}
	};

	// 상품 수정
	const handleUpdateButton = async () => {
		try {
			if (
				isFieldEmpty(product?.title) ||
				isFieldEmpty(product?.brand) ||
				isFieldEmpty(product?.concentration) ||
				isFieldEmpty(product?.gender) ||
				isFieldEmpty(product?.description) ||
				isFieldEmpty(product?.hashTag) ||
				isFieldEmpty(product?.mainImage[0])
			) {
				alert('누락된 필드를 확인하세요.');
				return;
			}

			const response = await patchProductDetail<MessageResponse>({
				updatedProduct: product,
			});

			console.log(response);
			if (response.status === 200) {
				alert('상품 수정 완료');
			}
			navigate('/admin/products');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className={styles.adminSection}>
				{product ? (
					<div>
						<h5>상품 수정</h5>
						<ProductForm
							product={product}
							handleFieldChange={handleFieldChange}
							handleSizeChange={handleSizeChange}
							handleMainImageURLChange={handleMainImageURLChange}
							addMainImageInput={addMainImageInput}
							addPriceBySizeInput={addPriceBySizeInput}
						/>

						<div className={styles.submitButton}>
							<BlackButton
								text="상품 수정"
								onClick={handleUpdateButton}
							/>
						</div>
					</div>
				) : (
					<p>상품을 조회할 수 없습니다.</p>
				)}
			</section>
		</>
	);
}
