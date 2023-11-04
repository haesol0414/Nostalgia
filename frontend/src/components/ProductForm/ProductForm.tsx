import React from 'react';
import BorderInput from '../../components/Input/BorderInput';
import SmallButton from '../../components/Button/SmallButton';
import SelectBox from '../../components/SelectBox/SelectBox';
import { NewProduct, Product } from '../../model/product';
import TextArea from '../TextArea/TextArea';
import {
	brand,
	gender,
	concentration,
	hashTags,
} from '../../assets/datas/enum';
import styles from './ProductForm.module.scss';

interface ProductFormProps {
	product: NewProduct | Product;
	handleFieldChange: (field: string, value: any) => void;
	handleSizeChange: (
		index: number,
		newSize: string,
		newPrice: string,
	) => void;
	handleMainImageURLChange: (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => void;
	addMainImageInput: () => void;
	addPriceBySizeInput: () => void;
}

export default function ProductForm({
	product,
	handleFieldChange,
	handleSizeChange,
	handleMainImageURLChange,
	addMainImageInput,
	addPriceBySizeInput,
}: ProductFormProps) {
	return (
		<div className={styles.productForm}>
			<label>
				Title:
				<BorderInput
					type="text"
					value={product.title}
					onChange={e => handleFieldChange('title', e.target.value)}
				/>
			</label>

			<label>
				Gender:
				<SelectBox
					options={gender}
					selectedValue={product.gender}
					onSelect={selectedValue =>
						handleFieldChange('gender', selectedValue)
					}
				/>
			</label>

			<label>
				Brand:
				<SelectBox
					options={brand}
					selectedValue={product.brand}
					onSelect={selectedValue =>
						handleFieldChange('brand', selectedValue)
					}
				/>
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
								handleFieldChange(
									'priceBySize',
									updatedPriceBySize,
								);
							}}
						>
							삭제
						</button>
					)}
				</div>
			))}

			<div className={styles.addButton}>
				<SmallButton text="사이즈 추가" onClick={addPriceBySizeInput} />
			</div>

			<label>
				Concentration:
				<SelectBox
					options={concentration}
					selectedValue={product.concentration}
					onSelect={selectedValue =>
						handleFieldChange('concentration', selectedValue)
					}
				/>
			</label>

			<label>
				CurrentAmount:
				<BorderInput
					value={product.currentAmount}
					onChange={e =>
						handleFieldChange('currentAmount', e.target.value)
					}
				/>
			</label>

			<label>
				Description:
				<TextArea
					value={product.description}
					onChange={e =>
						handleFieldChange('description', e.target.value)
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
								handleFieldChange(
									'mainImage',
									updatedMainImages,
								);
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
						handleFieldChange('hashTag', selectedValue)
					}
				/>
			</label>
		</div>
	);
}
