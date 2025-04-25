import { Award, MapPin, CheckCircle } from 'lucide-react';
import { Doctor } from '../types/doctor';
import { getRandomImageUrl } from '../lib/doctors';
import { Card } from '@/components/ui/card';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card 
      className="p-4 bg-white rounded-lg shadow-sm mb-4" 
      data-testid="doctor-card"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-16 w-full flex justify-center mb-4 md:mb-0">
          <img 
            src={doctor.imageUrl || getRandomImageUrl(doctor.gender)} 
            alt={doctor.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <div className="md:ml-4 flex-1">
          <h3 
            className="font-semibold text-lg text-gray-800" 
            data-testid="doctor-name"
          >
            {doctor.name}
          </h3>
          <p 
            className="text-sm text-gray-600 mb-1" 
            data-testid="doctor-specialty"
          >
            {doctor.specialty}
          </p>
          <p 
            className="text-sm text-gray-600 mb-2" 
            data-testid="doctor-experience"
          >
            {doctor.experience} yrs exp
          </p>
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <CheckCircle className="h-4 w-4 mr-1" />
            {doctor.clinicName || 'Private Clinic'}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {doctor.location || 'Mumbai'}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 md:text-right">
          <p 
            className="font-bold text-gray-800 mb-2" 
            data-testid="doctor-fee"
          >
            ₹ {doctor.fees}
          </p>
          <button className="bg-white bajaj-blue-text bajaj-blue-border border rounded px-4 py-2 text-sm font-medium hover:bajaj-blue hover:text-white transition-colors w-full md:w-auto">
            Book Appointment
          </button>
        </div>
      </div>
    </Card>
  );
}
