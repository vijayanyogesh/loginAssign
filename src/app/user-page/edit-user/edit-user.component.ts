import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm :FormGroup;
  custId: number;
  editDetail = {
    first_name:'',
    last_name:'',
    email:'',
    }

  constructor(private route:ActivatedRoute,
              private http:HttpClient, 
              private router:Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe(
      (param: Params) => {
        this.custId = param['id'];
        console.log(this.custId);     
      }
    ); 
    this.editDetail = this.userService.userData1;
    this.initForm();
    
  }

  saveData(){

    let editDetail = {
      first_name: this.editForm.get('first-name').value,
      last_name:this.editForm.get('last-name').value,
      email:this.editForm.get('email').value,
      }
      
    this.router.navigate(['../'],{relativeTo:this.route});

    this.userService.onChanges(this.custId,editDetail);
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});
  }


  private initForm(){

    this.editForm = new FormGroup({
      'first-name' : new FormControl(this.editDetail.first_name,[Validators.required]),
      'last-name'  : new FormControl(this.editDetail.last_name,[Validators.required]),
      'email'      : new FormControl(this.editDetail.email,[Validators.required,Validators.email]),
    })

  }

}
