import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MenuItem } from '../../shared/models/menu-item.model';
import { LoginService } from '../../modules/admin/services/login.service';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
    selector: 'app-sidenav-menu',
    standalone: true,
    imports: [
        MatDividerModule,
        MenuItemComponent
    ],
    templateUrl: './sidenav-menu.component.html',
    styleUrl: './sidenav-menu.component.scss'
})

export class SidenavMenuComponent {
    constructor(
        private loginService: LoginService
    ) { }

    private _menuItems: MenuItem[] = [
        {
            id: 1,
            title: 'Inicio',
            isActive: false,
            icon: 'home',
            route: '/',
            children: [],
            isAdmin: false
        },
        {
            id: 2,
            title: 'Catálogo',
            isActive: true,
            icon: 'shopping_cart',
            route: null,
            children: [
                <MenuItem>{
                    id: 4,
                    title: 'Todos los productos',
                    isActive: false,
                    route: '/products',
                },
                <MenuItem>{
                    id: 5,
                    title: 'Promociones',
                    isActive: false,
                    route: '/products',
                    queryParams: ["promocion"]
                },
                <MenuItem>{
                    id: 6,
                    title: 'Nuevos',
                    isActive: false,
                    route: '/products',
                    queryParams: ["nuevo"]
                }
            ],
            isAdmin: false
        },
        {
            id: 3,
            title: 'Inventario',
            isActive: false,
            icon: 'list',
            route: '/inventory',
            children: [],
            isAdmin: true,
        },
        {
            id: 7,
            title: 'Pedidos',
            isActive: false,
            icon: 'content_paste',
            route: '/orders',
            children: [],
            isAdmin: true,
        },
        {
            id: 8,
            title: 'Configuración',
            isActive: false,
            icon: 'settings',
            route: '/configuration',
            children: [],
            isAdmin: true,
        }
    ]

    setActive(id: number) {
        this._menuItems.forEach((item: MenuItem) => {
            item.children?.forEach((element: MenuItem) => {
                element.isActive = false;
            });
            item.isActive = item.id === id;
        });
    }

    setSubActive(parentId: number, id: number) {
        this._menuItems.find(c => c.id === parentId)
            ?.children?.forEach((element: MenuItem) => {
                element.isActive = element.id === id;
            });
    }

    get publicMenuItems(): MenuItem[] {
        return this._menuItems.filter(c => !c.isAdmin);
    }

    get adminMenuItems(): MenuItem[] {
        return this._menuItems.filter(c => c.isAdmin);
    }

    get showAdminSection(): boolean {
        return this.loginService.loggedUser?.isAdmin && this._menuItems.filter(c => c.isAdmin)?.length > 0;
    }
}
