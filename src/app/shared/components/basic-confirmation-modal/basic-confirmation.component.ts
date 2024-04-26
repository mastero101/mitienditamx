import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-basic-confirmation',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule
    ],
    template: `<div style="padding:20px"><p>{{message}}</p><mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancelar</button>
    <button mat-raised-button cdkFocusInitial mat-dialog-close="true" color="primary">Aceptar</button>
    </mat-dialog-actions></div>`,
})

export class BasicConfirmationComponent implements OnInit {
    constructor(
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    message = '';

    ngOnInit(): void {
        this.message = this.data?.message;
    }
}