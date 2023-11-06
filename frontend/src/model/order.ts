import { CartProduct } from './product';
import { Address } from './user';

export interface NewOrder {
	recipient: string;
	phone: string;
	shippingAddress: Address;
	purchase: CartProduct[];
	shippingRequest: string;
	shippingFee: number;
	totalProductPrice: number;
	totalPayment: number;
}
