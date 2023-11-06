import { Product } from './product';

export interface NewUser {
	email: string;
	name: string;
	password: string;
}

export interface User extends NewUser {
	_id: string;
	phone: string;
	gender: string;
	address: Address;
	preference: string;
	wishList?: Product;
	role: string;
	registerDate: Date;
}

export interface Address {
	city: string;
	detail: string;
	zipCode: string;
}

export interface UserPreference {
	gender: string;
	preference: string;
}
