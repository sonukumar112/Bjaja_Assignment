import { Doctor } from '../types/doctor';
import { getRandomImageUrl } from '../lib/doctors';
import { Card } from '@/components/ui/card';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  // Function to get the image URL with proper fallback
  const getImageUrl = () => {
    if (!doctor.imageUrl || doctor.imageUrl === 'null') {
      return getRandomImageUrl(doctor.gender);
    }
    return doctor.imageUrl;
  };

  return (
    <Card 
      className="overflow-hidden bg-white rounded-lg shadow-sm mb-4" 
      data-testid="doctor-card"
    >
      <div className="flex flex-col md:flex-row">
        {/* Doctor Image */}
        <div className="md:w-1/3 w-full mb-4 md:mb-0 p-4 md:p-6 bg-gray-100 flex justify-center items-center">
          <div className="w-full aspect-square max-w-[200px] bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            {doctor.imageUrl && doctor.imageUrl !== 'null' ? (
              <img 
                src={getImageUrl()} 
                alt={doctor.name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.parentElement!.innerHTML = '<div class="doctor-image-placeholder">Doctor Image</div>';
                }}
              />
            ) : (
              <div className="doctor-image-placeholder">Doctor Image</div>
            )}
          </div>
        </div>
        
        {/* Doctor Info */}
        <div className="flex-1 p-4 md:p-6">
          <h3 
            className="font-semibold text-lg text-gray-800 mb-1" 
            data-testid="doctor-name"
          >
            {doctor.name}
          </h3>
          <p 
            className="text-sm text-blue-500 font-medium uppercase mb-4" 
            data-testid="doctor-specialty"
          >
            {doctor.specialty}
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-start text-sm text-gray-600">
              <span className="font-medium w-32">Experience:</span>
              <span data-testid="doctor-experience">{doctor.experience} Years</span>
            </div>
            
            <div className="flex items-start text-sm text-gray-600">
              <span className="font-medium w-32">Consultation Fee:</span>
              <span className="text-green-600 font-medium">₹ {doctor.fees}</span>
            </div>
            
            <div className="flex items-start text-sm text-gray-600">
              <span className="font-medium w-32">Location:</span>
              <span>{doctor.location || 'Location not specified'}</span>
            </div>
          </div>
          
          <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors w-full md:w-auto">
            Book Appointment
          </button>
        </div>
      </div>
    </Card>
  );
}
