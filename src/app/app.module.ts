import { RouterModule } from '@angular/router';
import { LoginModule } from './pages/login/login.module';
import { SignupModule } from './pages/signup/signup.module';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ROUTES } from './app.routes';
import { SocketManagerModule } from './service/socket-manager/socket-manager.module';

const config: SocketIoConfig = { url: 'http://127.0.0.1:8001', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
  ],
  imports: [
    SocketManagerModule.forRoot(),
    LoginModule,
    SignupModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    // SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
