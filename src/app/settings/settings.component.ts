import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  websiteForm: FormGroup;
  addressForm: FormGroup;
  localizationForm: FormGroup;
  socialForm: FormGroup;
  newAdminForm: FormGroup;

  websiteMessage: string = '';
  addressMessage: string = '';
  adminMessage: string = '';
  isAdminAdded: boolean = false;

  isSuperAdmin: boolean = false;

  countries: string[] = [
    'Egypt',
    'Saudi Arabia',
    'United Arab Emirates',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan',
    'China',
    'Brazil'
  ];

  iconOptions = [
    { icon: 'fa-facebook-f', placeholder: 'https://www.facebook.com' },
    { icon: 'fa-twitter', placeholder: 'https://www.twitter.com' },
    { icon: 'fa-youtube', placeholder: 'https://www.youtube.com' },
    { icon: 'fa-linkedin-in', placeholder: 'https://www.linkedin.com' }
  ];

  constructor(private fb: FormBuilder) {
    this.websiteForm = this.fb.group({
      websiteName: ['', [Validators.required]],
      logo: [null, [Validators.required]],
      favicon: [null, [Validators.required]],
    });

    this.addressForm = this.fb.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      country: ['', [Validators.required]]
    });

    this.localizationForm = this.fb.group({
      timeZone: [''],
      dateFormat: [''],
      timeFormat: [''],
      currencySymbol: ['']
    });

    this.socialForm = this.fb.group({
      links: this.fb.array([])
    });

    this.newAdminForm = this.fb.group({
      image: [null],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });

    for (const option of this.iconOptions) {
      this.addLink(option);
    }
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

  updateAddressDetails() {
    if (this.addressForm.valid) {
      this.addressMessage = 'Address details updated successfully!';
    } else {
      this.addressMessage = 'Please fill in all required fields in the Address Details form.';
    }
  }

  cancel() {
    this.websiteForm.reset();
    this.addressForm.reset();
    this.websiteMessage = '';
    this.addressMessage = '';
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.websiteForm.patchValue({ [controlName]: file });
    }
  }

  timeZones = [
    '(UTC +5:30) Antarctica/Palmer',
    '(UTC +2:00) Africa/Cairo',
    '(UTC +0:00) UTC',
    '(UTC -5:00) America/New_York',
  ];

  dateFormats = [
    '15 May 2016',
    '2016-05-15',
    '05/15/2016',
    '15/05/2016'
  ];

  timeFormats = [
    '12 Hours',
    '24 Hours'
  ];

  currencySymbols = [
    '$', '€', '£', 'LE'
  ];

  onSubmit() {
    if (this.localizationForm.valid) {
      console.log('Localization settings:', this.localizationForm.value);
      alert('Settings updated!');
    }
  }

  get links(): FormArray {
    return this.socialForm.get('links') as FormArray;
  }

  addLink(option?: { icon: string; placeholder: string }) {
    this.links.push(
      this.fb.group({
        icon: [option?.icon || '', Validators.required],
        url: ['', [Validators.required, Validators.pattern('https?://.+')]],
        placeholder: [option?.placeholder || '']
      })
    );
  }

  removeLink(index: number) {
    this.links.removeAt(index);
  }

  onSubmitLink() {
    if (this.socialForm.valid) {
      console.log('Social Links:', this.socialForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  addAdmin() {
    if (this.newAdminForm.valid) {
      const formData = new FormData();
      Object.keys(this.newAdminForm.value).forEach((key) => {
        formData.append(key, this.newAdminForm.value[key]);
      });

      console.log('New Admin Data:', this.newAdminForm.value);

      this.isAdminAdded = true;
      this.adminMessage = 'Admin added successfully!';
      this.newAdminForm.reset();
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
