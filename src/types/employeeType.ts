import { Document } from "mongoose";

export interface EmployeeType {
  name: string;
  contact_number: number;
  email: string;
  tech_stack: string;
  resume?: object;
  date_of_joining: Date;
  position: string;
  year_of_exp: number;
  cl: number;
  el: number;
  salary: number;
  performance: string;
  birth_date: Date;
  address: string;
  reliving_letter?: object;
  experience_letter?: object;
  work_anniversary?: Date;
}
