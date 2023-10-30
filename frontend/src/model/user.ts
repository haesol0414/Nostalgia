export interface NewUser {
	email: string;
	name: string;
	password: string;
}

export interface User extends NewUser {
	_id: string;
	phone?: string;
	address: Address;
	role: string;
	registerDate: Date;
}

export interface Address {
	city: string;
	detail: string;
}

export interface AddressWithPhone extends Address {
	phone: string;
}
