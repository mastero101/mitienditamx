import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../modules/admin/services/login.service';

@Component({
    selector: 'app-toolbar-user-info',
    standalone: true,
    imports: [
        RouterModule,
        MatButtonModule
    ],
    templateUrl: './toolbar-user-info.component.html',
    styleUrl: './toolbar-user-info.component.scss',
})

export class ToolbarUserInfoComponent {
    constructor(
        private loginService: LoginService
    ) { }

    logout() {
        this.loginService.logout();
    }

    get isUserLogged(): boolean {
        return !!this.loginService.loggedUser;
    }

    get userEmail(): string {
        return this.loginService.loggedUser?.email ?? '';
    }

    get isAdmin(): boolean {
        return this.loginService.loggedUser?.isAdmin;
    }
}