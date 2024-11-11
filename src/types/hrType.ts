import { Document } from "mongoose";

export interface HrType extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  age: number;
  isPasswordCorrects(password: string): Promise<boolean>;
  getJWTToken(): string;
}
