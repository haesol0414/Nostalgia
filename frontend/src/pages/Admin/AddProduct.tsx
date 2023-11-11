import React, { useState } from 'react';
import styles from './AddAndUpdateProduct.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import { NewProduct } from '../../model/product';
import { MessageResponse, addNewProduct } from '../../utils/apiRequests';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/ProductForm/ProductForm';

export default function AddProduct() {
	const navigate = useNavigate();
	const [newProduct, setNewProduct] = useState<NewProduct>({
		title: '',
		brand: '',
		gender: '',
		priceBySize: [{ size: 0, price: 0 }],
		concentration: '',
		description: '',
		currentAmount: 100,
		mainImage: [''],
		hashTag: '',
	});

	const handleFieldChange = (field: string, value: any) => {
		if (newProduct) {
			setNewProduct({ ...newProduct, [field]: value });
		}
	};

	const handleSizeChange = (
		index: number,
		newSize: string,
		newPrice: string,
	) => {
		const updatedPriceBySize = [...newProduct.priceBySize];

		updatedPriceBySize[index] = {
			size: parseInt(newSize, 10),
			price: parseInt(newPrice, 10),
		};

		setNewProduct({ ...newProduct, priceBySize: updatedPriceBySize });
	};

	const handleMainImageURLChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const updatedMainImages = [...newProduct.mainImage];
		updatedMainImages[index] = e.target.value;
		setNewProduct({ ...newProduct, mainImage: updatedMainImages });
	};

	const addPriceBySizeInput = () => {
		if (newProduct) {
			setNewProduct({
				...newProduct,
				priceBySize: [...newProduct.priceBySize, { size: 0, price: 0 }],
			});
		}
	};

	const addMainImageInput = () => {
		setNewProduct({
			...newProduct,
			mainImage: [...newProduct.mainImage, ''],
		});
	};

	const handleSubmitButton = async () => {
		console.log(newProduct);
		try {
			const response = await addNewProduct<MessageResponse>({
				newProduct,
			});

			alert('상품 등록 완료');
			navigate('/admin/products');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<section className={styles.adminSection}>
				<div className={styles.addProductForm}>
					<h5>상품 추가</h5>
					<ProductForm
						product={newProduct}
						handleFieldChange={handleFieldChange}
						handleSizeChange={handleSizeChange}
						handleMainImageURLChange={handleMainImageURLChange}
						addMainImageInput={addMainImageInput}
						addPriceBySizeInput={addPriceBySizeInput}
					/>
					<div className={styles.submitButton}>
						<BlackButton
							text="상품 추가"
							onClick={handleSubmitButton}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
