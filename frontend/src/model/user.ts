export type User = {
	_id: string;
	email: string;
	name: string;
	phone?: string;
	address: Address;
	role: string;
	registerDate: Date;
};

export interface Address {
	city: string;
	detail: string;
}

export interface AddressWithPhone extends Address {
	phone: string;
}

export type NewUser = {
	email: string;
	name: string;
	password: string;
};
