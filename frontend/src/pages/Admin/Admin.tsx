import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import AdminModal from "../AdminModal/AdminModal";
// import AdminEditModal from "../AdminModal/AdminEditModal";
import AdminModal from '../../components/AdminModal/AdminModal';
import AddButton from '../../components/AddButton/AddButton';
import ModifyButton from '../../components/ModifyButton/ModifyButton';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import CheckBox from '../../components/CheckBox/CheckBox';
import styles from './Admin.module.scss';

export default function Admin() {
	//AdminModal
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	// const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	//모달수정시 담을 데이터
	// const [modalData, setModalData] = useState();

	//선택아이디
	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	// 체크박스
	const handleCheckboxChange = (id: number) => {
		const updatedSelectedIds = selectedIds.includes(id)
			? selectedIds.filter(selectedId => selectedId !== id)
			: [...selectedIds, id];
		setSelectedIds(updatedSelectedIds);
	};

	//추가모달
	const handleOpenAddModal = () => {
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
	};

	// 수정모달 닫기
	// const handleCloseEditModal = () => {
	// 	setIsEditModalOpen(false);
	// };

	// 숙소 수정 선택
	// const handleEditSelect = (id: number) => {
	// 	if (data.length > 0) {
	// 		if (selectedIds.length === 1) {
	// 			const selectedItem = data.find(
	// 				item => item.id === selectedIds[0],
	// 			);
	// 			if (selectedItem) {
	// 				setModalData(selectedItem);
	// 				const updatedSelectedIds = selectedIds.includes(id)
	// 					? selectedIds.filter(selectedId => selectedId !== id)
	// 					: [...selectedIds, id];
	// 				setSelectedIds(updatedSelectedIds);
	// 				setIsEditModalOpen(true);
	// 			}
	// 		}
	// 	}
	// };

	return (
		<>
			<div className={styles.tableWrap}>
				<div className={styles.buttonIcon}>
					<AddButton onClick={handleOpenAddModal}></AddButton>
					<ModifyButton onClick={() => {}}></ModifyButton>
					<DeleteButton onClick={() => {}}></DeleteButton>
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
								<p>상세 설명</p>
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
						{/* {data.length > 0 &&
							data.map(item => {
								return (
									<tr key={item.id}>
										<td>
											<CheckBox
												checked={selectedIds.includes(
													item.id,
												)}
												onChange={() =>
													handleCheckboxChange(
														item.id,
													)
												}
											></CheckBox>
										</td>
										<td>{item.placeName}</td>
										<td>{item.price}</td>
										<td>{item.description}</td>
										<td>{item.category}</td>
										<td>{item.region}</td>

										<td>
											<img
												src={item.bannerImage}
												alt={item.placeName}
												style={{
													maxWidth: '100px',
													maxHeight: '100px',
												}}
											/>
										</td>
										<td>
											<img
												src={item.mainImage}
												alt={item.placeName}
												style={{
													maxWidth: '100px',
													maxHeight: '100px',
												}}
											/>
										</td>
										<td>
											<img
												src={item.detailImage}
												alt={item.placeName}
												style={{
													maxWidth: '100px',
													maxHeight: '100px',
												}}
											/>
										</td>
										<td className={styles.link}>
											<Link to={item.bookingURL}>
												{`${item.placeName} 링크`}
											</Link>
										</td>
									</tr>
								);
							})} */}
					</tbody>
				</table>
			</div>
			<AdminModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />
			{/* <AdminEditModal
				isOpen={isEditModalOpen}
				onClose={handleCloseEditModal}
				modalData={modalData}
			/> */}
		</>
	);
}
