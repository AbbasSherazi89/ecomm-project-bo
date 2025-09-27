import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { SellerHome } from './seller-home/seller-home';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    {
        component:Home,
        path:''
    },
    {
        component:SellerAuth,
        path:'seller-auth'
    },
    {
        component:SellerHome,
        path:'seller-home',
        canActivate:[authGuard]
    }
];
