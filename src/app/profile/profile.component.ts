import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  activeTab = 'about';
  passwordForm: FormGroup;
  editForm: FormGroup;
  isEditing = false;
  adminDetails: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      address: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.adminDetails = this.authService.getAdminDetails();

    if (this.adminDetails) {
      this.editForm.patchValue({
        name: this.adminDetails.name,
        dob: this.adminDetails.dob || '',
        contactEmail: this.adminDetails.email,
        phone: this.adminDetails.phone,
        address: this.adminDetails.address || ''
      });
    }
  }

  toggleTab(tab: string) {
    this.activeTab = tab;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  get oldPassword() { return this.passwordForm.get('oldPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmPassword() { return this.passwordForm.get('confirmPassword'); }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    console.log('Password form submitted', this.passwordForm.value);

    this.passwordForm.reset();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.adminDetails) {
      this.editForm.reset({
        name: this.adminDetails.name,
        dob: this.adminDetails.dob || '',
        contactEmail: this.adminDetails.email,
        phone: this.adminDetails.phone,
        address: this.adminDetails.address || ''
      });
    }
  }

  saveDetails() {
    if (this.editForm.valid) {
      this.adminDetails = { ...this.adminDetails, ...this.editForm.value };
      this.isEditing = false;

      console.log('Updated user details:', this.adminDetails);
    }
  }
}
