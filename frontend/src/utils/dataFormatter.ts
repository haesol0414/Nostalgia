export function formatDate(date: Date): string {
	date = new Date(date);

	const year: number = date.getFullYear();
	const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
	const day: string = date.getDate().toString().padStart(2, '0');

	return `${year}/${month}/${day}`;
}

export function formatPhoneNumber(phoneNumber: string): string {
	const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
	if (numericPhoneNumber.length !== 11) {
		return phoneNumber;
	}

	const formattedPhoneNumber = numericPhoneNumber.replace(
		/(\d{3})(\d{4})(\d{4})/,
		'$1-$2-$3',
	);

	return formattedPhoneNumber;
}
