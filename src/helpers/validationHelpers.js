export function required (message) {
	return (v) => !!v || message || '';
}

export function match (other, message) {
	return (v) => {

		return v === other || message || '';
	};

}
