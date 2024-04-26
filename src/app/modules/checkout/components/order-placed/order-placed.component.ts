import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-order-placed',
    standalone: true,
    imports: [
        MatButtonModule,
        ClipboardModule,
        RouterModule
    ],
    templateUrl: './order-placed.component.html',
    styleUrl: './order-placed.component.scss'
})

export class OrderPlacedComponent implements OnInit {
    constructor(
        private router: Router,
        private location: Location
    ) { }

    orderId = '';
    private _copiedOrderId = false;

    ngOnInit(): void {
        const navigationState: any = this.location.getState();

        if (!navigationState?.isAllowed) {
            this.router.navigate(['/products']);
        } else {
            this.orderId = navigationState.orderId;
        }
    }

    copy() {
        this._copiedOrderId = true;
    }

    get copiedOrderId(): boolean {
        return this._copiedOrderId;
    }
}