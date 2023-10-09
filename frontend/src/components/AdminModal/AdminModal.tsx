import React, { useState } from 'react';
import RadioButton from '../RadioButton/RadioButton';
import BorderInput from '../Input/BorderInput';
import { FaTimes } from 'react-icons/fa';
import styles from './AdminModal.module.scss';
import BlackButton from '../Button/BlackButton';
import { brand, gender, concentration, hashtags } from '../../assets/enum';

interface AdminModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AdminModal({ isOpen, onClose }: AdminModalProps) {
	const [formData, setFormData] = useState({});

	const handleChange = (field: string, value: string | number | null) => {
		setFormData(prevData => ({ ...prevData, [field]: value }));
	};

	return isOpen ? (
		<div className={styles.modal}>
			<div className={styles.backDrop} onClick={onClose}></div>
			<div className={styles.modalContent}>
				<div className={styles.modalBox}>
					<button className={styles.closeBtn} onClick={onClose}>
						<FaTimes className={styles.closeBtn} />
					</button>
					<h5>상품 추가</h5>
					<div className={styles.textInput}>
						<p>상품명</p>
						<BorderInput
							type="text"
							onChange={placeName =>
								handleChange('placeName', placeName)
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>가격</p>
						<BorderInput
							type="number"
							onChange={price => handleChange('price', price)}
						/>
					</div>
					<div className={styles.check}>
						<p>성별</p>
						<div className={styles.radio}>
							{gender.map(el => (
								<RadioButton
									key={el}
									label={el}
									checked={false}
									onChange={() => handleChange('el', el)}
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
									onChange={() => handleChange('el', el)}
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
									onChange={() => handleChange('el', el)}
								/>
							))}
						</div>
					</div>
					<div className={styles.textInput}>
						<p>메인 이미지</p>
						<BorderInput
							type="text"
							onChange={description =>
								handleChange('description', description)
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>상세 이미지</p>
						<BorderInput
							type="text"
							onChange={description =>
								handleChange('description', description)
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>상세 설명</p>
						<BorderInput
							type="text"
							onChange={detailImage =>
								handleChange('detailImage', detailImage)
							}
						/>
					</div>
					<div className={styles.textInput}>
						<p>재고</p>
						<BorderInput
							type="text"
							onChange={bookingURL =>
								handleChange('bookingURL', bookingURL)
							}
						/>
					</div>
					<div className={styles.check}>
						<p>해시태그</p>
						<div className={styles.radio}>
							{hashtags.map(el => (
								<RadioButton
									key={el}
									label={el}
									checked={false}
									onChange={() => handleChange('el', el)}
								/>
							))}
						</div>
					</div>

					<BlackButton text="확인" onClick={() => {}}></BlackButton>
				</div>
			</div>
		</div>
	) : null;
}
