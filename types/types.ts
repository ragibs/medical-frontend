export type Doctor = {
  id: number;
  first_name: string;
  last_name: string;
  short_bio: string;
  bio: string;
  phone?: string;
  specialization?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  shortBio?: string;
  yearsExperience?: number;
};

export type Recommendation = {
  doctorId: number;
  doctorName: string;
  recommendation: string;
};

export type Patient = {
  id: number; // Assuming the User object has an ID
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  dateOfBirth: string; // Represented as a string in "YYYY-MM-DD" format
};

export type Appointment = {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  symptoms: string;
  aiSummarizedSymptoms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
