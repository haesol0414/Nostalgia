import React, { useState } from 'react';
import styles from './AddressSearch.module.scss';
import DaumPostcode from 'react-daum-postcode';
import { Address } from '../../model/user';
import WhiteButton from '../../components/Button/WhiteButton';

interface AddressSearchProps {
	address: Address;
	onComplete: (data: any) => void;
}

export default function AddressSearch({
	address,
	onComplete,
}: AddressSearchProps) {
	const [modalState, setModalState] = useState<boolean>(false);
	const handleAddressSearchBtn = () => {
		setModalState(!modalState);
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

			{modalState ? (
				<DaumPostcode onComplete={onComplete}></DaumPostcode>
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
