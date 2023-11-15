import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './AddressSearch.module.scss';
import { Address } from '../../model/user';
import WhiteButton from '../../components/Button/WhiteButton';

interface AddressSearchProps {
	address: Address;
	onAddressChange: (newAddress: Address) => void;
}

export default function AddressSearch({
	address,
	onAddressChange,
}: AddressSearchProps) {
	const [modal, setModal] = useState<boolean>(false);

	const handleAddressSearchBtn = () => {
		setModal(!modal);
	};

	const closeModal = () => {
		setModal(false);
	};

	const handlePostCode = (data: any) => {
		const newAddress: Address = {
			city: data.address,
			detail: '',
			zipCode: data.zonecode,
		};

		// 콜백 함수
		onAddressChange(newAddress);
		closeModal();
	};

	return (
		<>
			<div className={styles.address}>
				<div className={styles.daumAddress}>
					<p>주소</p>
					<div>{address.city}</div>
				</div>

				<WhiteButton
					text="주소 검색"
					onClick={handleAddressSearchBtn}
				></WhiteButton>
			</div>

			{modal ? (
				<div className={styles.modalContainer}>
					<div className={styles.modalContent}>
						<div className={styles.closeButton}>
							<button onClick={closeModal}>X</button>
						</div>

						<DaumPostcode
							onComplete={handlePostCode}
						></DaumPostcode>
					</div>
				</div>
			) : (
				<></>
			)}

			<div className={styles.daumAddress}>
				<p>우편번호</p>
				<div>{address.zipCode}</div>
			</div>
		</>
	);
}
