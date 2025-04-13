import { Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { admin } from '../interfaces/admin'
import { UsersService } from '../services/users.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-admins',
  imports: [CommonModule, FormsModule, SpinnerComponent, PaginationComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  admins: admin[] = [];
  paginatedAdmins: admin[] = [];
  isLoading: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
  this.fetchAdmins();
  }

  fetchAdmins(){
    this.isLoading = true;
    this.usersService.getAdmins().subscribe(
      (data) => {
        this.admins = data;
        this.updatePaginatedAdmins();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching admins:', error);
        this.isLoading = false;
      }
    );
  }

  updatePaginatedAdmins() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAdmins = this.admins.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedAdmins();
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize;
    this.currentPage = 1;
    this.updatePaginatedAdmins();
  }

}
