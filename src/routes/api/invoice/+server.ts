import { sendInvoice } from '$lib/server/bot';
import { json } from '@sveltejs/kit';

export const POST = async ({request}) => {

const body: {userId: number} = await request.json();

	try {
		const res = await sendInvoice(body.userId);

		return json(res)
	}catch (e: unknown) {
		console.error(e);
		return json({error: 'Error'})
	}
}