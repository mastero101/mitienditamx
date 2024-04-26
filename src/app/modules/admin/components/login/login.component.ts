import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginService } from '../../services/login.service';
import { RegisterComponent } from '../register/register.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        RegisterComponent
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})

export class LoginComponent {
    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
    ) { }

    isInvalidUser = false;
    hidePassword = true;
    loginForm: FormGroup = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    login() {
        this.isInvalidUser = false;
        this.loginService.login(
            this.loginForm.get('email')?.value,
            this.loginForm.get('password')?.value);

        if (!this.loginService.loggedUser) {
            this.isInvalidUser = true;
        }
    }

    get emailControl(): FormControl {
        return this.loginForm?.get('email') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.loginForm?.get('password') as FormControl;
    }
}