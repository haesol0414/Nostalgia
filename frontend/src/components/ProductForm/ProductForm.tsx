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
			<div className={styles.rowContainer}>
				<p className={styles.subject}>상품명</p>
				<BorderInput
					type="text"
					value={product.title}
					onChange={e => handleFieldChange('title', e.target.value)}
				/>
			</div>

			<div className={styles.rowContainer}>
				<p className={styles.subject}>추천 성별</p>
				<SelectBox
					options={gender}
					selectedValue={product.gender}
					onSelect={selectedValue =>
						handleFieldChange('gender', selectedValue)
					}
				/>
			</div>
			<div className={styles.rowContainer}>
				<p className={styles.subject}>브랜드</p>
				<SelectBox
					options={brand}
					selectedValue={product.brand}
					onSelect={selectedValue =>
						handleFieldChange('brand', selectedValue)
					}
				/>
			</div>

			{product.priceBySize.map((sizeInfo, index) => (
				<div key={index}>
					<div className={styles.rowContainer}>
						<p className={styles.subject}>사이즈(ml) &</p>
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
					</div>

					<div className={styles.rowContainer}>
						<p className={styles.subject}>가격 [{index}]</p>
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
					</div>

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

			<div className={styles.rowContainer}>
				<p className={styles.subject}>농도</p>
				<SelectBox
					options={concentration}
					selectedValue={product.concentration}
					onSelect={selectedValue =>
						handleFieldChange('concentration', selectedValue)
					}
				/>
			</div>

			<div className={styles.rowContainer}>
				<p className={styles.subject}>재고</p>
				<BorderInput
					value={product.currentAmount}
					onChange={e =>
						handleFieldChange('currentAmount', e.target.value)
					}
				/>
			</div>

			<div className={styles.rowContainer}>
				<p className={styles.subject}>상품 설명</p>
				<TextArea
					value={product.description}
					onChange={e =>
						handleFieldChange('description', e.target.value)
					}
				/>
			</div>

			{product.mainImage.map((mainImageURL, index) => (
				<div key={index}>
					<div className={styles.rowContainer}>
						<p className={styles.subject}>메인 이미지 [{index}]</p>
						<BorderInput
							type="text"
							value={mainImageURL}
							onChange={e => handleMainImageURLChange(index, e)}
						/>
					</div>

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

			<div className={styles.rowContainer}>
				<p className={styles.subject}>HashTag</p>
				<SelectBox
					options={hashTags}
					selectedValue={product.hashTag}
					onSelect={selectedValue =>
						handleFieldChange('hashTag', selectedValue)
					}
				/>
			</div>
		</div>
	);
}
