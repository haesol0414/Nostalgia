import { Product } from './product';

export interface NewUser {
	email: string;
	name: string;
	password: string;
}

export interface User extends NewUser {
	_id: string;
	phone?: string;
	gender?: string;
	address: Address;
	role: string;
	wishList?: Product;
	registerDate: Date;
	preference?: string;
}

export interface Address {
	city: string;
	detail: string;
	zipCode?: number;
}

export interface AddressWithPhone extends Address {
	phone: string;
}
