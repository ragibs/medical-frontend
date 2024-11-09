export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  short_bio: string;
  bio: string;
}

export type Recommendation = {
  doctorId: number;
  doctorName: string;
  recommendation: string;
};
