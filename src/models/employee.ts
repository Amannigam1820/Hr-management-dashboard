import mongoose, { Model } from "mongoose";
import { EmployeeType } from "../types/employeeType.js";
const Schema = mongoose.Schema;

// Define the User schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  tech_stack: {
    type: String,
    required: true,
    trim: true,
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  date_of_joining: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  year_of_exp: {
    type: Number,
    required: true,
  },
  cl: {
    type: Number,
    required: true,
  },
  el: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  performance: {
    type: Number,
    required: true,
  },
  birth_date: { type: Date, required: true },
  address: {
    type: String,
    required: true,
  },
  reliving_letter: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  experience_letter: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  work_anniversary: {
    type: Date,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Employee: Model<EmployeeType> = mongoose.model<EmployeeType>(
  "Employee",
  EmployeeSchema
);

export { Employee };
