import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

import { Router } from "@angular/router";
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  user: any = {};
  selectedAddress: string | null = null;
  editing: boolean = false;
  editedAddress: string = '';

  constructor(private loginService: LoginService, private router: Router) { 
    this.selectedAddress = this.loginService.getSelectedAddress();
  }
  
  ngOnInit(): void {
    this.user = this.loginService.loggedUser;
  }

  orders() {
    this.router.navigate(['/myorders']);
  }
  
  onSelectAddress(address: string): void {
    this.selectedAddress = address;
    this.loginService.setSelectedAddress(address);
  }

  toggleEditing() {
    this.editing = !this.editing;
    if (this.editing) {
      this.editedAddress = this.selectedAddress || '';
    } else {
      this.editedAddress = '';
    }
  }

  saveAddress(): void {
    if (this.selectedAddress) {
      // Editar la dirección en el servicio login
      this.loginService.editAddress(this.editedAddress);
      this.selectedAddress = this.editedAddress;
      this.toggleEditing();
    } else {
      console.log('Por favor, seleccione una dirección para editar.');
    }
  }
}
