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
