import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { HomeComponent } from './layout/home/home.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { ConfigurationComponent } from './modules/admin/components/configuration/configuration.component';
import { LoginComponent } from './modules/admin/components/login/login.component';
import { InventoryListComponent } from './modules/inventory/components/inventory-list-component/inventory-list.component';
import { ClientOrdersListComponent } from './modules/orders/components/client-orders-list/client-orders-list.component';
import { OrdersListComponent } from './modules/orders/components/orders-list/orders-list.component';
import { ProductDetailsComponent } from './modules/products/components/product-details/product-details.component';
import { ProductListComponent } from './modules/products/components/product-list/product-list.component';
import { AuthGuard } from './shared/services/auth.service';
import { CheckoutStepsComponent } from './modules/checkout/components/checkout-steps/checkout-steps.component';
import { OrderPlacedComponent } from './modules/checkout/components/order-placed/order-placed.component';
import { DashboardComponent } from './modules/admin/components/dashboard/dashboard.component';

export const routes: Routes = [
    //Public routes
    { path: "products", component: ProductListComponent, title: environment.settings.toolbarTitle },
    { path: "products/:id", component: ProductDetailsComponent, title: environment.settings.toolbarTitle },
    { path: "checkout", component: CheckoutStepsComponent, title: environment.settings.toolbarTitle },
    { path: "ordered", component: OrderPlacedComponent, title: environment.settings.toolbarTitle },
    { path: "login", component: LoginComponent, title: environment.settings.toolbarTitle },    
    
    //Client routes
    { path: "myorders", component: ClientOrdersListComponent, title: environment.settings.toolbarTitle, canActivate: [() => inject(AuthGuard).canActivateClient()] },
    { path: "dashboard", component: DashboardComponent, title: environment.settings.toolbarTitle, canActivate: [() => inject(AuthGuard).canActivateClient()]},

    //Admin routes    
    { path: "inventory", component: InventoryListComponent, title: environment.settings.toolbarTitle, canActivate: [() => inject(AuthGuard).canActivateAdmin()] },
    { path: "orders", component: OrdersListComponent, title: environment.settings.toolbarTitle, canActivate: [() => inject(AuthGuard).canActivateAdmin()] },
    { path: "configuration", component: ConfigurationComponent, title: environment.settings.toolbarTitle, canActivate: [() => inject(AuthGuard).canActivateAdmin()] },
    
    //Fallback routes
    { path: "", component: HomeComponent, title: environment.settings.toolbarTitle },
    { path: "**", component: NotFoundComponent, title: environment.settings.toolbarTitle },
];
