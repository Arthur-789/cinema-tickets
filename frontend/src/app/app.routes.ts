import { Routes } from '@angular/router';
import { Login } from '../components/login/login';
import { Home } from '../components/home/home';
import { authGuard } from '../auth/guard/auth-guard';
import { Register } from '../components/register/register';
import { Sessao } from '../components/sessao/sessao';

export const routes: Routes = [
    {
        path: '',
        component: Login,
    },
    {
        path: 'home',
        component: Home,
        //canActivate: [authGuard]
    },
    { 
        path: 'cadastro', 
        component: Register
    },
    {
        path: 'cadastro-sessao', 
        component: Sessao,
        //canActivate: [authGuard]
    }
];
