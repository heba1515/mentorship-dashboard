import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  activeTab = 'about';
  passwordForm: FormGroup;
  editForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.editForm = this.fb.group({
      name: [this.admin.name, [Validators.required]],
      dob: [this.admin.dob, [Validators.required]],
      contactEmail: [this.admin.contactEmail, [Validators.required, Validators.email]],
      phone: [this.admin.phone, [Validators.required, Validators.pattern(/^\d+$/)]],
      address: [this.admin.address, [Validators.required]]
    });
  }

  admin = {
    name: 'Allen Davis',
    email: 'allendavis@admin.com',
    location: 'Florida, United States',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    dob: '24 Jul 1983',
    contactEmail: 'allendavis@example.com',
    phone: '305-310-5857',
    address: `4663 Agriculture Lane,\nMiami,\nFlorida - 33165,\nUnited States.`,
    profileImage: 'profile-img.png'
  };

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

    console.log('Form submitted', this.passwordForm.value);

    this.passwordForm.reset();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editForm.reset({
        name: this.admin.name,
        dob: this.admin.dob,
        contactEmail: this.admin.contactEmail,
        phone: this.admin.phone,
        address: this.admin.address
      });
    }
  }

  saveDetails() {
    if (this.editForm.valid) {
      this.admin = { ...this.admin, ...this.editForm.value };
      this.isEditing = false;
    }
  }
}
