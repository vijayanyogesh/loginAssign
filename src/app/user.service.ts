import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router:Router,) { }

  userData1 : any = {};
  userUrl: string = 'https://reqres.in/api/users?page=';
  userData = new Subject<any>();

  getUserData(custId:number){
    return this.http.get('https://reqres.in/api/users/' + custId) 
          .pipe(map((userData) => {
            for(let key in userData){
              if( key === 'data'){
              this.userData1 = userData[key];
            }
          }
          return userData;
        }))   
  }

  // getUserData(custId:number){
  //   return this.http.get('https://reqres.in/api/users/' + custId)
  //   .pipe(map((userData) => {
  //     for(let key in userData){
  //       if( key === 'data'){
  //         this.userData1 = userData[key];
  //       }
  //     }
  //     return this.userData1;
  //   }))   
  // }

  getAllData(pageNum,custId) {

    return this.http.get(this.userUrl +pageNum)
    .pipe(map (userData => {

      const userArray =[];

      for(let key of userData['data']){
        if(key.id !== custId){
          userArray.push(key);         
        }
      }
      return userArray;
    })
    )
  }

  sendCred(credData: {email: string, password: string }){

    return this.http.post('https://reqres.in/api/register',credData);
  }

  getId(email:string,i){

    return this.http.get('https://reqres.in/api/users?page=' + i)
      .pipe(map(responseData => {
        let userId;
        for(const key of responseData['data']){
          if(key.email === email ){
            userId = key.id;   
          } 
        }
        return userId;
      })
      );
    }

    onChanges(custId,editDetail){
      this.http.patch('https://reqres.in/api/users/' + custId,editDetail)
      .subscribe(responseData => {
      console.log(responseData);   
      });
    }
    
}
