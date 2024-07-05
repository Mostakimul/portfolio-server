/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface UserInterface {
  name: string;
  currentRole: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserModel extends Model<UserInterface> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(email: string): Promise<UserInterface>;
}
