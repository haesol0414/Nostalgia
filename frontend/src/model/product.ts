export interface Product {
	_id: string;
	title: string;
	gender: string;
	brand: string;
	priceBySize: {
		size: number;
		price: number;
	}[];
	concentration: string;
	description: string;
	mainImage: string[];
	detailImage: string;
	currentAmount: number;
	salesAmount?: number;
}

export interface NewProduct {
	title: string;
	gender: string;
	brand: string;
	priceBySize: {
		size: number;
		price: number;
	}[];
	concentration: string;
	description: string;
	mainImage: string[];
	detailImage: string;
	currentAmount: number;
}
