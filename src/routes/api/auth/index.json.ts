import type { RequestHandler, RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = () => ({
	status: 200,
	body: 'Test'
});
