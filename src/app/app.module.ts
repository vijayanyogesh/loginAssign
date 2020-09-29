import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './user-page/edit-user/edit-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [AppComponent, UserPageComponent, CreateUserComponent, LoginComponent, EditUserComponent, UserDetailComponent],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
