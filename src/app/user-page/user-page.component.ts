import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  constructor(private route:ActivatedRoute,
    private http:HttpClient, 
    private router:Router,
    private userService: UserService) { }

  custId :number;
  gotUser: boolean = false;
  userDataArray = [];
  url : string = 'https://angular-project-7824e.firebaseio.com/posts/';
  pageNum: number  = 1;
  userData1: any = {};
  adData: any = {};
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.custId = +param['id'];
      }
    );   
    this.userService.getUserData(this.custId)
    .subscribe(
      (posts) => {
        this.userData1 = posts['data'];
        this.adData = posts['ad'];
        //console.log(posts);   
      }
    );
    this.userService.getAllData(this.pageNum,this.custId)
    .subscribe( post => {
        //console.log(post);
        this.userDataArray = post;
      }
    );   
  }

  editUser(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

  onLogOut(){
    this.router.navigate(['']);
  }

  nextPage(){
    this.pageNum = 2;
    this.userService.getAllData(this.pageNum,this.custId)
    .subscribe( post => {
        this.userDataArray = post;
      });
  }

  previousPage(){
    this.pageNum = 1;
    this.userService.getAllData(this.pageNum,this.custId)
    .subscribe( post => {
        this.userDataArray = post;
      });
  }

  onRemove(index:number,userId:number){
    this.userDataArray.splice(index,1);
    this.http.delete('https://reqres.in/api/users/' + userId).subscribe();
    //console.log(userId);  
  }

}
