export function required (message) {
	return (v) => !!v || message;
}
