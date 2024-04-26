import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Params, RouterModule } from '@angular/router';
import { LoginService } from '../../../modules/admin/services/login.service';
import { MenuItem } from '../../../shared/models/menu-item.model';

@Component({
    selector: 'app-menu-item',
    standalone: true,
    imports: [
        MatIconModule,
        RouterModule,
    ],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
})

export class MenuItemComponent {
    constructor(
        private loginService: LoginService
    ) { }

    @Input() item!: MenuItem;
    @Input() isSubmenu = false;

    getRoute(route: string | null): string | null {
        if (route) {
            return route;
        }
        else {
            return null;
        }
    }

    getQueryParams(queryParams: string[] | null | undefined): Params | null {
        if (queryParams && queryParams.length > 0) {
            return <Params>{
                tags: queryParams.join(",")
            };
        } else {
            return null;
        }
    }

    get isAdminUser(): boolean {
        return this.loginService.loggedUser?.isAdmin;
    }
}
