import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { Home } from '../components/home/home';
import { authGuard } from '../auth/guard/auth-guard';
import { Register } from '../components/register/register';
import { Movie } from '../components/movie/movie';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'login',
        component: Login,
    },
    { 
        path: 'cadastro', 
        component: Register
    },
    {
        path: 'movie/:id',
        component: Movie
    },
];
