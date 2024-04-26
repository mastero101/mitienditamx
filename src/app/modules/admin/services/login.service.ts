import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { User } from "../models/user.model";

@Injectable({ providedIn: 'root' })

export class LoginService {
    
    constructor(
        private localStorageService: LocalStorageService,
        private router: Router
    ) { }

    login(email: string, password: string) {
        if (email != "admin@admin.com" && email != "user@user.com" && email != "user2@user.com" && email != "user3@user.com") {
            return;
        }

        let userAddresses: string[] = [
            'Dirección 1: Calle 421 N. 22 Entre 123 y 212 Campeche, Campeche, CP 24000',
            'Dirección 2: Calle 641 N. 22 Entre 123 y 212 Campeche, Campeche, CP 24000',
            'Dirección 3: Calle 122 N. 22 Entre 123 y 212 Campeche, Campeche, CP 24000'
        ];

        let user = <User>{
            email,
            name: email === "admin@admin.com" ? "Administrador" : email,
            isAdmin: email === "admin@admin.com",
            addresses: userAddresses
        };

        this.localStorageService.update('loggedUser', user);
        this.router.navigate(['/dashboard']);
    }

    logout() {
        this.localStorageService.clearAll('loggedUser');
        this.router.navigate(['/login']);
    }

    register(name:string, email: string, password: string) {
        let newUser = <User>{
           name: name,
           email: email,
           password: password,
           isAdmin: false
       };

       this.localStorageService.update('registeredUser', newUser);

       alert('Registro completado');
   }

    get loggedUser(): User {
        return this.localStorageService.getItem('loggedUser');
    }

    setSelectedAddress(address: string): void {
        localStorage.setItem('selectedAddress', address);
    }
    
    getSelectedAddress(): string | null {
        return localStorage.getItem('selectedAddress');
    }

    editAddress(address: string): void {
        this.localStorageService.update('selectedAddress', address);
    }
}