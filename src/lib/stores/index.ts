import { writable } from 'svelte/store';

export const user = writable<{ telegram_id: number } | null>(null);