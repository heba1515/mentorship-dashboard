import { Component } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { admin } from '../interfaces/admin'
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admins',
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  admins: admin[] = [];
  isLoading: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
  this.fetchAdmins();
  }

  fetchAdmins(){
    this.isLoading = true;
    this.usersService.getAdmins().subscribe(
      (data) => {
        this.admins = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching admins:', error);
        this.isLoading = false;
      }
    );
  }

}
