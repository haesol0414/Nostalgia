export const isEmailValid = (email: string): boolean => {
	const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailPattern.test(email);
};

export const isPasswordValid = (password: string): boolean => {
	const passwordPattern =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
	return passwordPattern.test(password);
};
