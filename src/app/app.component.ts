import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavMenuComponent } from './layout/sidenav-menu/sidenav-menu.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToolbarComponent,
    SidenavMenuComponent,
    RouterOutlet,
    MatSidenavModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor() { }

  @ViewChild(MatDrawer) drawer!: MatDrawer;

  toggleDrawer() {
    if (this.drawer.opened) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }
}