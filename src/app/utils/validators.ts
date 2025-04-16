import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const nameRegex = /^[A-Za-z]{3}/;
  return value && !nameRegex.test(value) ? { invalidName: true } : null;
}

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSpecial = /[@$!%*?&]/.test(value);

  const isValid = hasUpper && hasLower && hasDigit && hasSpecial;

  return !isValid ? { passwordStrength: true } : null;
}

export function confirmPasswordValidator(passwordField: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;

    const password = control.parent.get(passwordField)?.value;
    const confirm = control.value;

    return password !== confirm ? { passwordMismatch: true } : null;
  };
}
