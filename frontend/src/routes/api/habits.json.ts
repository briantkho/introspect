export const get = async () => {
	const res = await fetch('');

	return {
		status: 200,
		body: await res.json()
	};
};
