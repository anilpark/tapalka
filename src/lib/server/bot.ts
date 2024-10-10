import { Telegraf } from 'telegraf';

export async function sendInvoice() {
	const bot = new Telegraf('6574670281:AAF3K1lLvohrYvqCXQvxkY03lVAQtNY_244')

	const result  = await bot.telegram.createInvoiceLink( {
		currency: "XTR",
		description: 'Pay money bumagnie',
		payload: 'pqyload',
		title: 'Pay money',
		prices: [{label: 'Pay money', amount: 100}],
		provider_token: ''
	})

	return result;
}