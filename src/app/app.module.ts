import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AuthEffects } from './effects/auth.effects';
import { UserEffects } from './effects/user.effects';
import { AuthFacade } from './facades/auth.facade';
import { OfferFacade } from './facades/offer.facade';
import { UserFacade } from './facades/user.facade';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OfferComponent } from './pages/offer/offer.component';
import { RegisterComponent } from './pages/register/register.component';
import * as fromAuth from './reducers/auth.reducer';
import { AuthService } from './services/auth.service';
import { OfferService } from './services/offer.service';
import { UserService } from './services/user.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'offer',
    component: OfferComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const FACADES = [AuthFacade, UserFacade, OfferFacade];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    OfferComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreModule.forFeature('auth', fromAuth.reducer),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({ name: 'LeMauvaisCoin' }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([AuthEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [
    AuthGuard,

    AuthService,
    UserService,
    OfferService,

    ...FACADES,

    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
