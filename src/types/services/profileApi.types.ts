export interface IFormProfile {
  last_name: string;
  first_name: string;
  email: string;
  phoneNumber: string;
  submit: boolean | null;
}

export interface IFormChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  submit: boolean | null;
}
