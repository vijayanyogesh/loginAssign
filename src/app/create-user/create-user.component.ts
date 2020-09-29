import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createForm: FormGroup;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      'username' : new FormControl(null,[Validators.required,Validators.email]),
      'password' : new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'name'     : new FormControl(null,[Validators.required]),
      'job'      : new FormControl(null,[Validators.required]),
      'hobby'    : new FormControl(null),
      'title'    : new FormControl(null),
    })
  }

  sendData(){

    const formData = {
      username: this.createForm.get('username').value,
      password : this.createForm.get('password').value,
      name : this.createForm.get('name').value,
      job : this.createForm.get('job').value,
      hobby : this.createForm.get('hobby').value,
      title : this.createForm.get('title').value,
    }

    this.http.post(
      'https://reqres.in/api/users',
      formData
    )
    .subscribe(responseData => {
      console.log(responseData);
    });

    // this.http.post(
    //   'https://reqres.in/api/register',
    //   formData
    // )
    // .subscribe(responseData => {
    //   console.log(responseData);
    // });

    this.router.navigate(['login']);
    
    this.createForm.reset(); 
  }

  onBack(){
    this.router.navigate(['login']);
  }
}
