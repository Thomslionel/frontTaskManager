import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { Dashbord } from './components/dashbord/dashbord';
import { authGuard } from './guard/auth-guard';
import { Categories } from './components/categories/categories';
import { Taches } from './components/taches/taches';

export const routes: Routes = [
     {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },

    // 🔐 AUTH PAGES
    { path: 'login', component: Login },
    { path: 'signup', component: Signup },

    // 🏠 DASHBOARD (protégé)
    {
        path: 'dashboard',
        component: Dashbord,
        canActivate: [authGuard]
    },
    {path : "categories",
        component : Categories
    },
    {path : "taches",
        component : Taches
    },
];


