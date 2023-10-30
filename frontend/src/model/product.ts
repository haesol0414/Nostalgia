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
