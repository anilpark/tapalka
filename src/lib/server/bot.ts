import { Telegraf } from 'telegraf';

export async function sendInvoice() {
	const bot = new Telegraf('YOUR_BOT_TOKEN')

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