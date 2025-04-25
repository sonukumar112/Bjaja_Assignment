import { Doctor } from "../types/doctor";

export const API_URL = 'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json';

export function getRandomImageUrl(gender = 'male'): string {
  const seed = Math.floor(Math.random() * 1000);
  if (gender.toLowerCase() === 'female') {
    return `https://randomuser.me/api/portraits/women/${seed % 70}.jpg`;
  }
  return `https://randomuser.me/api/portraits/men/${seed % 70}.jpg`;
}

export function getTop3MatchingDoctors(doctors: Doctor[], searchTerm: string): Doctor[] {
  if (!searchTerm || searchTerm.length < 2) return [];
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return doctors
    .filter(doctor => doctor.name.toLowerCase().includes(lowercaseSearch))
    .slice(0, 3);
}

export function filterDoctors(
  doctors: Doctor[], 
  search: string, 
  consultationType: string,
  specialties: string[],
  sortOption: string
): Doctor[] {
  let filteredDoctors = [...doctors];
  
  // Filter by search term
  if (search) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Filter by consultation mode
  if (consultationType === 'video') {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.consultationMode.includes('Video Consult')
    );
  } else if (consultationType === 'clinic') {
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.consultationMode.includes('In Clinic')
    );
  }
  
  // Filter by specialties
  if (specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      return specialties.some(specialty => 
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    });
  }
  
  // Sort by fees or experience
  if (sortOption === 'fees') {
    filteredDoctors.sort((a, b) => a.fees - b.fees);
  } else if (sortOption === 'experience') {
    filteredDoctors.sort((a, b) => b.experience - a.experience);
  }
  
  return filteredDoctors;
}

export function extractSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    if (doctor.specialty) {
      doctor.specialty.split(',').forEach(specialty => {
        const trimmedSpecialty = specialty.trim();
        if (trimmedSpecialty) {
          specialtiesSet.add(trimmedSpecialty);
        }
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
}
