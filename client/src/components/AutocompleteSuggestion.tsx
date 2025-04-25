import { Doctor } from '../types/doctor';
import { UserRound } from 'lucide-react';

interface AutocompleteSuggestionProps {
  doctor: Doctor;
  onClick: (name: string) => void;
}

export default function AutocompleteSuggestion({ doctor, onClick }: AutocompleteSuggestionProps) {
  return (
    <div 
      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 flex items-center" 
      data-testid="suggestion-item"
      onClick={() => onClick(doctor.name)}
    >
      <div className="flex-shrink-0 mr-3">
        {doctor.imageUrl ? (
          <img 
            src={doctor.imageUrl} 
            alt={doctor.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <UserRound className="h-6 w-6 text-blue-500" />
          </div>
        )}
      </div>
      <div>
        <div className="font-medium bajaj-blue-text">{doctor.name}</div>
        <div className="text-xs text-gray-500">
          {doctor.specialty}
          <span className="mx-1">•</span>
          <span>{doctor.experience} yrs exp</span>
        </div>
      </div>
    </div>
  );
}
