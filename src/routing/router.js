import Home from '../pages/Home.svelte';
import CreateRiddle from '../pages/CreateRiddle.svelte';

import { writable } from 'svelte/store';

const router = {
    '/': Home,
    '/home': Home,
    '/createRiddle': CreateRiddle
}
export default router;

export const curRoute = writable('/home');