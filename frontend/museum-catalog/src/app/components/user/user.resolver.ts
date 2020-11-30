import { Injectable } from '@angular/core';
import { Resolve, Router } from "@angular/router";
import { UserService } from '../../core/user.service';
import { FirebaseUserModel } from '../../core/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve() : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        user.name = res.displayName;
        user.provider = res.providerData[0].providerId;
        return resolve(user);
      }, err => {
        console.log(err)
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
