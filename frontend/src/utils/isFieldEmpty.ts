export const isFieldEmpty = (field: string | undefined | null): boolean => {
	return !field || field.trim() === '';
};
