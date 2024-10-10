export let TG_WEB_APP: WebApp = null!

export function initTgWebView(){
	TG_WEB_APP = window.Telegram.WebApp;
}