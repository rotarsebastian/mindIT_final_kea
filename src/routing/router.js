import Home from '../pages/Home.svelte';
import CreateQuiz from '../pages/CreateQuiz.svelte';

import { writable } from 'svelte/store';

const router = {
    '/': Home,
    '/home': Home,
    '/create-quiz': CreateQuiz
}
export default router;

export const curRoute = writable('/home');