import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackBarService {
    constructor(
        private snackBar: MatSnackBar
    ) { }

    displayError(message: string, duration: number = 2000, action: string | undefined = undefined): void {
        this.snackBar.open(message,
            action,
            {
                duration,
                panelClass: 'snack-bar-error'
            });
    }

    displaySuccess(message: string, duration: number = 2000, action: string | undefined = undefined): void {
        this.snackBar.open(message,
            action,
            {
                duration,
                panelClass: 'snack-bar-success'
            });

    }

    displayWarn(message: string, duration: number = 2000, action: string | undefined = undefined): void {
        this.snackBar.open(message,
            action,
            {
                duration,
                panelClass: 'snack-bar-warn'
            });

    }
}
