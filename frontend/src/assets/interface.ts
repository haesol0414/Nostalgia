export interface Product {
	_id: string;
	title: string;
	gender: string;
	brand: string;
	priceBySize: [
		{
			price: number;
			size: number;
		},
	];
	concentration: string;
	description: string;
	mainImage: [string];
	detailImage?: string;
	curruentAmount?: number;
}

export interface NewUser {
	email: string;
	name: string;
	password: string;
}

export interface User {
	_id: string;
	email: string;
	name: string;
	phone?: string;
	address?: string;
	detailAddress?: string;
	isDeleted: boolean;
	registerDate: Date;
	role: string;
	coupons?: string[];
}
