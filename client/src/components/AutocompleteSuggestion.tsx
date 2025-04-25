import { Doctor } from '../types/doctor';

interface AutocompleteSuggestionProps {
  doctor: Doctor;
  onClick: (name: string) => void;
}

export default function AutocompleteSuggestion({ doctor, onClick }: AutocompleteSuggestionProps) {
  return (
    <div 
      className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0" 
      data-testid="suggestion-item"
      onClick={() => onClick(doctor.name)}
    >
      <div className="font-medium">{doctor.name}</div>
      <div className="text-xs text-gray-500">{doctor.specialty}</div>
    </div>
  );
}
