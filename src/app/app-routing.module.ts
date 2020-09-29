import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './user-page/edit-user/edit-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const appRoutes : Routes = [
    { path : '', redirectTo : '/login',pathMatch:'full'},
    { path : 'login', component:LoginComponent}, 
    { path : 'userpage/:id', component:UserPageComponent,
        children:[
            { path: 'edit', component: EditUserComponent},
        ]}, 
    { path : 'createuser', component:CreateUserComponent}, 
    { path : 'userpage/:id/:id1', component:UserDetailComponent}, 
];

@NgModule({

    imports:[
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}