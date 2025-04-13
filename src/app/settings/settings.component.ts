import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { admin } from '../interfaces/admin';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  websiteForm: FormGroup;
  newAdminForm: FormGroup;

  websiteMessage: string = '';
  adminMessage: string = '';
  isAdminAdded: boolean = false;

  isSuperAdmin: boolean = false;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.websiteForm = this.fb.group({
      websiteName: ['', [Validators.required]],
      logo: [null, [Validators.required]],
      favicon: [null, [Validators.required]],
    });

    this.newAdminForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmedPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

  }

  ngOnInit() {
    this.isSuperAdmin = this.checkIfSuperAdmin();
  }

  checkIfSuperAdmin(): boolean {
    const adminDetails = JSON.parse(localStorage.getItem('adminDetails') || '{}');
    return adminDetails.isSuperAdmin || false;
  }

  updateWebsiteDetails() {
    if (this.websiteForm.valid) {
      this.websiteMessage = 'Website details updated successfully!';
    } else {
      this.websiteMessage = 'Please fill in all required fields in the Website Details form.';
    }
  }

  cancel() {
    this.websiteForm.reset();
    this.websiteMessage = '';
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.websiteForm.patchValue({ [controlName]: file });
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  addAdmin() {
    if (this.newAdminForm.valid) {
      const newAdminData: Partial<admin> = {
        name: this.newAdminForm.value.name,
        email: this.newAdminForm.value.email,
        phone: this.newAdminForm.value.phone,
        password: this.newAdminForm.value.password,
        confirmedPassword: this.newAdminForm.value.confirmedPassword,
      };

      this.usersService.addAdmin(newAdminData).subscribe({
        next: (res) => {
          console.log('Admin added:', res);
          this.isAdminAdded = true;
          this.adminMessage = 'Admin added successfully!';
          this.newAdminForm.reset();
        },
        error: (err) => {
          console.error('Failed to add admin:', err);
          this.isAdminAdded = false;
          this.adminMessage = 'Failed to add admin. Please try again.';
        }
      });
    } else {
      this.isAdminAdded = false;
      this.adminMessage = 'Please fill in all required fields correctly.';
    }
  }

  cancelNewAdmin() {
    this.newAdminForm.reset();
    this.adminMessage = '';
  }
}
