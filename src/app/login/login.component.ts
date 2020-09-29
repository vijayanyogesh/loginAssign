import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userArray=[];

  loginForm : FormGroup;
  loginSuccess:boolean = true;
  userId: number;
  anError:boolean = false;

  constructor(private http: HttpClient,
              private router:Router,
              private route:ActivatedRoute,
              private userService:UserService) {}

  ngOnInit() {
    //this.fetchPosts();

    this.loginForm = new FormGroup({
      'username' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required])
    })
  }

  login(){

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    //this.getId(username);
    this.userService.sendCred( {
      email : username,
      password : password,
    })
    .subscribe(responseToken => {
      const token = responseToken['token'];
      const userId = responseToken['id'];

      if( token === 'QpwL5tke4Pnpja7X' + userId){
        this.router.navigate(['userpage',userId]);        
      }
    },
    error => {
      if(error){
        this.anError = true;
      }
        
    });   
  }

  // private getId(email:string){

  //   for(let i=1;i<3;i++){
  //     this.http.get('https://reqres.in/api/users?page=' + i)
  //     .pipe(map(responseData => {
  //       for(const key of responseData['data']){
  //         if(key.email === email ){
  //           this.userId = key.id;   
  //         } 
  //       }
  //     })
  //     ).subscribe();
  //   }
  // }

  createUser(){
    this.router.navigate(['createuser']);
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Firebase Code this looks an alright set up to me seriously 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  login1(){

    console.log(this.loginForm.get('username').value);

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    const success = this.userArray.find(user => user.username === username && user.password === password);

    //console.log(success);
    if(success){
      this.router.navigate(['userpage',success.id]);
    }else{
      this.loginSuccess = false;
    }
  }

  private fetchPosts(){
    this.http
    .get('https://angular-project-7824e.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postArray= [];
              for(const key in responseData){
          if(responseData.hasOwnProperty(key)){          
          postArray.push({...responseData[key],id:key})
          }
        }
        return postArray;
    })
    )
    .subscribe(posts => {
      //this.userArray = posts;
      console.log(posts);
    })
  }

}
