import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.scss';
import { Product } from '../../model/product';
import {
	MessageResponse,
	deleteProduct,
	getAllProducts,
} from '../../utils/apiRequests';
import ModifyButton from '../../components/ModifyButton/ModifyButton';
import AddButton from '../../components/AddButton/AddButton';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import { isTokenAvailable } from '../../utils/authUtils';
import RadioButton from '../../components/RadioButton/RadioButton';

interface TotalProductsResponse {
	message: string;
	totalProducts: Product[];
}

export default function Admin() {
	const navigate = useNavigate();
	const isLoggedIn = isTokenAvailable();
	const [product, setProduct] = useState<Product[]>([]);
	const [selectedProductId, setSelectedProductId] = useState<string>('');

	useEffect(() => {
		if (!isLoggedIn) {
			alert('로그인이 필요한 페이지입니다.');
			navigate('/login');
		} else {
			const getTotalProducts = async () => {
				try {
					const response =
						await getAllProducts<TotalProductsResponse>();
					console.log('상품 전체: ', response);
					setProduct(response.data.totalProducts);
				} catch (error) {
					console.log(error);
				}
			};
			getTotalProducts();
		}
	}, [isLoggedIn]);

	const handleAddButton = () => {
		navigate('/admin/add-product');
	};

	const handleRadioChange = (productId: string) => {
		setSelectedProductId(productId);
	};

	const handleModifyButton = () => {
		console.log('checked: ', selectedProductId);
	};

	const handleDeleteButton = async () => {
		try {
			console.log('checked: ', selectedProductId);

			if (selectedProductId) {
				const response = await deleteProduct<MessageResponse>({
					selectedProductId: selectedProductId,
				});

				if (response.status === 200) {
					alert('상품 삭제 완료');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{isLoggedIn ? (
				<section className={styles.adminSection}>
					<div className={styles.buttonIcon}>
						<AddButton onClick={handleAddButton}></AddButton>
						<ModifyButton
							onClick={handleModifyButton}
						></ModifyButton>
						<DeleteButton
							onClick={handleDeleteButton}
						></DeleteButton>
					</div>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>
									<p>선택</p>
								</th>
								<th>
									<p>상품명</p>
								</th>
								<th>
									<p>가격</p>
								</th>
								<th>
									<p>성별</p>
								</th>
								<th>
									<p>브랜드</p>
								</th>
								<th>
									<p>농도</p>
								</th>
								<th>
									<p>메인 이미지</p>
								</th>
								<th>
									<p>재고</p>
								</th>
								<th>
									<p>판매량</p>
								</th>
							</tr>
						</thead>
						<tbody>
							{product.length > 0 &&
								product.map(item => (
									<tr key={item._id}>
										<td>
											<RadioButton
												key={item._id}
												product={item}
												selectedProductId={
													selectedProductId
												}
												onRadioChange={
													handleRadioChange
												}
											/>
										</td>
										<td>{item.title}</td>
										<td>
											{item.priceBySize[0].price.toLocaleString()}
										</td>
										<td>{item.gender}</td>
										<td>{item.brand}</td>
										<td>{item.concentration}</td>
										<td>
											<img
												src={item.mainImage[0]}
												alt={item.title}
												style={{
													maxWidth: '100px',
													maxHeight: '100px',
												}}
											/>
										</td>
										<td>{item.currentAmount}</td>
										<td>{item.salesAmount}</td>
									</tr>
								))}
						</tbody>
					</table>
				</section>
			) : null}
		</>
	);
}
