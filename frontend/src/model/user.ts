import { Product } from './product';

export interface NewUser {
	email: string;
	name: string;
	password: string;
	phone: string;
}

export interface User extends NewUser {
	_id: string;
	gender: string;
	address: Address;
	preference: string;
	role: string;
	registerDate: Date;
	platform: string;
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
