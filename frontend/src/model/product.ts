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

export interface Product extends NewProduct {
	_id: string;
	salesAmount: number;
}

export interface CartProduct {
	_id: string;
	title: string;
	brand: string;
	selectedSize: number;
	selectedPrice: number;
	concentration: string;
	mainImage: string;
	orderAmount: number;
	totalPrice: number;
}
