import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SpinnerDialogComponent } from "../components/spinner-dialog/spinner-dialog.component";

@Injectable({
    providedIn: 'root'
})

export class SpinnerDialogService {
    constructor(
        private matDialog: MatDialog
    ) { }

    spinnerDialog!: MatDialogRef<SpinnerDialogComponent>;

    startSpinner() {
        this.closeSpinner();

        this.spinnerDialog = this.matDialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true,
            autoFocus: false
        });
    }

    closeSpinner() {
        if (this.spinnerDialog) {
            this.spinnerDialog.close();
        }
    }
}
