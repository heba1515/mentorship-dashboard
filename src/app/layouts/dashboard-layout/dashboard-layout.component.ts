import { Component, HostListener  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  isSidebarCollapsed = false;
  isMobileView = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewport();
  }

  ngOnInit() {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 768;
    if (this.isMobileView) {
      this.isSidebarCollapsed = true;
    } else {
      this.isSidebarCollapsed = false;
    }
  }

  toggleSidebar() {
    if (this.isMobileView) {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
  }
}
