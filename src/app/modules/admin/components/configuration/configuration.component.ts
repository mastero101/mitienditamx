import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';

@Component({
    selector: 'app-configuration',
    standalone: true,
    imports: [
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './configuration.component.html',
    styleUrl: './configuration.component.scss'
})

export class ConfigurationComponent {
    constructor(
        private localStorage: LocalStorageService
    ) { }

    resetAllKeys(){
        this.localStorage.resetAllKeys();
    }
}