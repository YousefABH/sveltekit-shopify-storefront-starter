import { writable } from 'svelte/store';

export const closeCartDialog = writable(true);

export const cartIdStore = writable();
export const cartItemsStore = writable([]);
