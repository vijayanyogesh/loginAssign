import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService:UserService, 
              private route:ActivatedRoute, 
              private router:Router) { }
  
  custId:number;
  userData1: any = {};

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.custId = +param['id1'];
      }
    );

    this.userService.getUserData(this.custId)
    .subscribe(
      (posts) => {
        this.userData1 = posts['data'];
        //this.adData = posts['ad'];
        //console.log(posts);   
      }
    );
  }

  goBack(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }

}
