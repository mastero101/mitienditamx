import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../modules/admin/services/login.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(private loginService: LoginService, private router: Router) { }

    canActivateAdmin(): boolean {
        if (this.loginService.loggedUser?.isAdmin) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

    canActivateClient(): boolean {
        if (this.loginService.loggedUser?.email) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}