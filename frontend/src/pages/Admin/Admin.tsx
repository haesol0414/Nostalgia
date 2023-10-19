import React, { useState } from 'react';
// import AddButton from '../../components/AddButton/AddButton';
// import ModifyButton from '../../components/ModifyButton/ModifyButton';
// import DeleteButton from '../../components/DeleteButton/DeleteButton';
// import CheckBox from '../../components/CheckBox/CheckBox';
import styles from './Admin.module.scss';
import BlackButton from '../../components/Button/BlackButton';
import RadioButton from '../../components/RadioButton/RadioButton';
import BorderInput from '../../components/Input/BorderInput';
import { brand, gender, concentration } from '../../assets/enum';
// import AddButton from '../../components/AddButton/AddButton';

interface NewProduct {
	title: string;
	gender: string;
	brand: string;
	concentration: string;
	description: string;
	mainImage: string;
	detailImage: string;
	currentAmount: number;
}

export default function Admin() {
	const [newProduct, setNewProudct] = useState<NewProduct>({
		title: '',
		gender: '',
		brand: '',
		concentration: '',
		description: '',
		mainImage: '',
		detailImage: '',
		currentAmount: 0,
	});

	const handleConfirmBtn = () => {
		alert(newProduct);
	};

	return (
		<>
			<section className={styles.adminSection}>
				<div className={styles.adminWrap}>
					<h5>상품 추가</h5>
					<div className={styles.textInput}>
						<p>상품명</p>
						<BorderInput
							type="text"
							value={newProduct.title}
							onChange={e =>
								setNewProudct({
									...newProduct,
									title: e.target.value,
								})
							}
						/>
					</div>
					{/* <div className={styles.priceBySize}>
						<div className={styles.textInput}>
							<p>사이즈 / 가격 </p>
							<BorderInput type="number" onChange={() => {}} />
							<BorderInput type="number" onChange={() => {}} />
							<AddButton onClick={() => {}}></AddButton>
						</div>
					</div> */}
					<div className={styles.check}>
						<p>성별</p>
						<div className={styles.radio}>
							{gender.map(el => (
								<RadioButton
									key={el}
									label={el}
									checked={false}
									onChange={() => {}}
								/>
							))}
						</div>
					</div>
					<div className={styles.check}>
						<p>브랜드</p>
						<div className={styles.radio}>
							{brand.map(el => (
								<RadioButton
									key={el}
									label={el}
									checked={false}
									onChange={() => {}}
								/>
							))}
						</div>
					</div>
					<div className={styles.check}>
						<p>농도</p>
						<div className={styles.radio}>
							{concentration.map(el => (
								<RadioButton
									key={el}
									label={el}
									checked={false}
									onChange={() => {}}
								/>
							))}
						</div>
					</div>
					<div className={styles.textInput}>
						<p>메인 이미지</p>
						<BorderInput
							type="text"
							value={newProduct.mainImage}
							onChange={e =>
								setNewProudct({
									...newProduct,
									mainImage: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>상세 이미지</p>
						<BorderInput
							type="text"
							value={newProduct.detailImage}
							onChange={e =>
								setNewProudct({
									...newProduct,
									detailImage: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>상세 설명</p>
						<BorderInput
							type="text"
							value={newProduct.description}
							onChange={e =>
								setNewProudct({
									...newProduct,
									description: e.target.value,
								})
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>재고</p>
						<BorderInput
							type="text"
							value={newProduct.currentAmount}
							onChange={e =>
								setNewProudct({
									...newProduct,
									currentAmount: Number(e.target.value),
								})
							}
						/>
					</div>
					<BlackButton
						text="확인"
						onClick={handleConfirmBtn}
					></BlackButton>
				</div>
			</section>
		</>
	);
}
