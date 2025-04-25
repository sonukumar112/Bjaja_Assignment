export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  fees: number;
  clinicName?: string;
  location?: string;
  consultationMode: ("Video Consult" | "In Clinic")[];
  imageUrl?: string;
  gender?: string;
}

export interface DoctorsResponse {
  doctors: Doctor[];
}

export type SortOption = 'fees' | 'experience' | '';
export type ConsultationType = 'video' | 'clinic' | '';

export interface FilterState {
  search: string;
  consultationType: ConsultationType;
  specialties: string[];
  sortBy: SortOption;
}
