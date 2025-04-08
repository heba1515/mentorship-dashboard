import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isOpen: boolean = false;
  adminDetails: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.adminDetails = this.authService.getAdminDetails();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const dropdownButton = document.querySelector('.dropdown button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (
      dropdownButton &&
      dropdownMenu &&
      !dropdownButton.contains(target) &&
      !dropdownMenu.contains(target)
    ) {
      this.isOpen = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
