/**
 * 
 * ================================
 * ; Title: BCRS PROJECT
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: James Brown
 * ; Date: 10/14/2020
 * ; Description: Application for Bobs Computer Repair Shop.
 * ================================
 * 
 */

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { AdministrationComponent } from './pages/administration/administration.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ErrorComponent } from './pages/error/error.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { VerifyUsernameComponent } from './pages/reset-password/verify-username/verify-username.component';
import { VerifySecurityQuestionsComponent } from './pages/reset-password/verify-security-questions/verify-security-questions.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password/reset-password.component';
import { ResetPasswordProcessComponent } from './pages/reset-password/reset-password-process/reset-password-process.component';
import { PurchasegraphComponent } from './pages/administration/purchasegraph/purchasegraph.component';
import { RoleGuard } from './shared/role.guard';
import { SellerHomeComponent } from './pages/seller/seller-home/seller-home.component';
import { ConfigurationComponent } from './pages/seller/config/configuration/configuration.component';

const routes: Routes = [
  {//path for marketplace in users
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'admin',
        component: AdministrationComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'not-found',
        component: NotfoundComponent
      }
    ],
        canActivate: [AuthGuard]
  },

  //path for marketplaces
  {
    path: 'marketplace',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'admin',
        component: AdministrationComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'not-found',
        component: NotfoundComponent
      }
    ],
        canActivate: [AuthGuard]
  },
  //path for seller users
  {
    path: 'seller',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: SellerHomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'not-found',
        component: NotfoundComponent
      },
      {
        path: 'admin',
        component: ConfigurationComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {//path for not logged in users
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path:'createAccount',
        component: CreateAccountComponent
      },
      {
        path: 'resetProcess',
        component: ResetPasswordProcessComponent
      },
      {
        path: 'forgot',
        component: VerifyUsernameComponent
      }, 
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: '404',
        component: NotfoundComponent
      },
      {
        path: '500',
        component: ErrorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
