import React from 'react';
import BorderInput from '../../components/Input/BorderInput';
import SmallButton from '../../components/Button/SmallButton';
import SelectBox from '../../components/SelectBox/SelectBox';
import { NewProduct, Product } from '../../model/product';

interface ProductFormProps {
	product: NewProduct | Product;
	onSizeChange: (index: number, newSize: string, newPrice: string) => void;
	onMainImageURLChange: (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
	onAddMainImageInput: () => void;
	onSubmit: () => void;
}

export default function ProductForm({
	product,
	onSizeChange,
	onMainImageURLChange,
	onAddMainImageInput,
	onSubmit,
}: ProductFormProps) {
	return (
		<>
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
							onChange={e => handleMainImageURLChange(index, e)}
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
				<SmallButton text="이미지 추가" onClick={addMainImageInput} />
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
			<BlackButton text="상품 추가" onClick={handleSubmitButton} />
		</>
	);
}
