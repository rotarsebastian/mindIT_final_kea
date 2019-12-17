import Home from '../pages/Home.svelte';
import CreateQuiz from '../pages/CreateQuiz.svelte';
import AnswerQuiz from '../pages/AnswerQuiz.svelte';
import EditQuiz from '../pages/EditQuiz.svelte';
import Login from '../pages/Login.svelte';
import MyProfile from '../pages/MyProfile.svelte';
import EditCards from '../pages/EditCards.svelte';
import AddCard from '../pages/AddCard.svelte';
import MyQuizzes from '../pages/MyQuizzes.svelte';
import Logout from '../pages/Logout.svelte';

import { writable } from 'svelte/store';

const router = {
    '/': Login,
    '/home': Home,
    '/create-quiz': CreateQuiz,
    '/quiz': AnswerQuiz,
    '/edit-quiz': EditQuiz,
    '/my-profile': MyProfile,
    '/edit-cards': EditCards,
    '/add-card': AddCard,
    '/my-quizzes': MyQuizzes,
    '/logout': Logout,
    '/login': Login
}
export default router;

export const curRoute = writable('/home');