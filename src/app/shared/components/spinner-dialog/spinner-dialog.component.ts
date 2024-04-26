import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-spinner-dialog',
    standalone: true,
    imports: [
        MatProgressSpinnerModule
    ],
    template: `<mat-spinner></mat-spinner>`
})

export class SpinnerDialogComponent {
}
