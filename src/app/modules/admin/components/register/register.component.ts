import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})

export class RegisterComponent {
    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) { }

    isInvalidUser = false;
    hidePassword = true;
    hideConfirmPassword = true;

    registerForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
            Validators.required,
            Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*/])[a-zA-Z0-9!@#$%^&*/]{8,}$/)
        ]],
        confirmPassword: ['', [
            Validators.required,  
        ]]
    }, { validator: this.passwordMatchValidator });

    register() {
        if (this.registerForm.valid) {
            this.loginService.register(
                this.registerForm.get('name')?.value,
                this.registerForm.get('email')?.value,
                this.registerForm.get('password')?.value
            );
            this.registerForm.reset();
        }
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
            formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
        } else {
            formGroup.get('confirmPassword')?.setErrors(null);
        }
    }

    get nameControl(): FormControl {
        return this.registerForm?.get('name') as FormControl;
    }

    get emailControl(): FormControl {
        return this.registerForm?.get('email') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.registerForm?.get('password') as FormControl;
    }

    get confirmPasswordControl(): FormControl {
        return this.registerForm?.get('confirmPassword') as FormControl;
    }
}