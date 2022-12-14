import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { UserService } from "src/app/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthActivate implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  // canActivate():boolean{
  //   return true
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.user$.pipe(
      take(1),
      map(user => {
        const loginRequired = route.data['loginRequired'];
        if (loginRequired === undefined || !!user === loginRequired) { return true; }
        return !!user
      })
    );
  }
    
}