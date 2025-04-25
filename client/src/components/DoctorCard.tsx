import { Award, MapPin, CheckCircle, Video } from 'lucide-react';
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
            className="font-semibold text-lg bajaj-blue-text" 
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
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Award className="h-4 w-4 mr-1 text-blue-500" />
            <span data-testid="doctor-experience">{doctor.experience} years experience</span>
          </div>
          
          {/* Consultation Modes */}
          <div className="flex flex-wrap gap-1 mb-2">
            {doctor.consultationMode.map((mode, index) => (
              <span key={index} className="consultation-badge">
                {mode === "Video Consult" ? (
                  <><Video className="h-3 w-3 mr-1" /> {mode}</>
                ) : (
                  <>{mode}</>
                )}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-xs text-gray-600 mb-1">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            {doctor.clinicName || 'Private Clinic'}
          </div>
          <div className="flex items-center text-xs text-gray-600">
            <MapPin className="h-4 w-4 mr-1 text-red-500" />
            {doctor.location || 'Mumbai'}
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 md:text-right">
          <p 
            className="font-bold text-lg bajaj-blue-text mb-2" 
            data-testid="doctor-fee"
          >
            ₹ {doctor.fees}
          </p>
          <button className="book-appointment-btn">
            Book Appointment
          </button>
        </div>
      </div>
    </Card>
  );
}
