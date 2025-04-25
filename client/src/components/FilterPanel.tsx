import { useState } from 'react';
import { ChevronDown, ChevronUp, Video, MapPin, ArrowDownAZ, ArrowUpAZ } from 'lucide-react';
import { FilterState, SortOption, ConsultationType } from '../types/doctor';

interface FilterPanelProps {
  specialties: string[];
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
}

export default function FilterPanel({ specialties, filters, onFilterChange }: FilterPanelProps) {
  const [showSpecialties, setShowSpecialties] = useState(true);
  const [showConsultation, setShowConsultation] = useState(true);
  const [showSort, setShowSort] = useState(true);

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    
    onFilterChange({ specialties: newSpecialties });
  };

  const handleConsultationTypeChange = (type: ConsultationType) => {
    // If the same type is clicked again, clear the selection
    const newType = filters.consultationType === type ? '' : type;
    onFilterChange({ consultationType: newType });
  };

  const handleSortChange = (sort: SortOption) => {
    // If the same sort is clicked again, clear the selection
    const newSort = filters.sortBy === sort ? '' : sort;
    onFilterChange({ sortBy: newSort });
  };

  const toggleSpecialties = () => setShowSpecialties(!showSpecialties);
  const toggleConsultation = () => setShowConsultation(!showConsultation);
  const toggleSort = () => setShowSort(!showSort);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header with Clear All */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg bajaj-blue-text">Filters</h2>
        <button 
          className="text-xs bajaj-blue-text hover:underline"
          onClick={() => onFilterChange({ 
            consultationType: '', 
            specialties: [], 
            sortBy: '' 
          })}
          data-testid="clear-filters"
        >
          Clear All
        </button>
      </div>

      {/* Sort Section */}
      <div className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center mb-3 cursor-pointer" onClick={toggleSort}>
          <h3 className="font-semibold bajaj-blue-text" data-testid="filter-header-sort">Sort by</h3>
          <button className="text-gray-500">
            {showSort ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        {showSort && (
          <div className="space-y-3">
            <div 
              className={`flex items-center p-2 rounded-md cursor-pointer ${filters.sortBy === 'fees' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => handleSortChange('fees')}
            >
              <ArrowDownAZ className={`h-5 w-5 mr-2 ${filters.sortBy === 'fees' ? 'bajaj-blue-text' : 'text-gray-400'}`} />
              <label className={`text-sm cursor-pointer ${filters.sortBy === 'fees' ? 'font-medium bajaj-blue-text' : 'text-gray-700'}`}>
                Price (Low to High)
              </label>
            </div>
            <div 
              className={`flex items-center p-2 rounded-md cursor-pointer ${filters.sortBy === 'experience' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => handleSortChange('experience')}
            >
              <ArrowUpAZ className={`h-5 w-5 mr-2 ${filters.sortBy === 'experience' ? 'bajaj-blue-text' : 'text-gray-400'}`} />
              <label className={`text-sm cursor-pointer ${filters.sortBy === 'experience' ? 'font-medium bajaj-blue-text' : 'text-gray-700'}`}>
                Experience (High to Low)
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Mode of Consultation Filter Section */}
      <div className="mb-6 border-b pb-4">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer" 
          onClick={toggleConsultation}
        >
          <h3 className="font-semibold bajaj-blue-text" data-testid="filter-header-moc">Consultation Mode</h3>
          <button className="text-gray-500">
            {showConsultation ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        {showConsultation && (
          <div className="space-y-3">
            <div 
              className={`flex items-center p-2 rounded-md cursor-pointer ${filters.consultationType === 'video' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => handleConsultationTypeChange('video')}
              data-testid="filter-video-consult"
            >
              <Video className={`h-5 w-5 mr-2 ${filters.consultationType === 'video' ? 'bajaj-blue-text' : 'text-gray-400'}`} />
              <label className={`text-sm cursor-pointer ${filters.consultationType === 'video' ? 'font-medium bajaj-blue-text' : 'text-gray-700'}`}>
                Video Consultation
              </label>
            </div>
            <div 
              className={`flex items-center p-2 rounded-md cursor-pointer ${filters.consultationType === 'clinic' ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => handleConsultationTypeChange('clinic')}
              data-testid="filter-in-clinic"
            >
              <MapPin className={`h-5 w-5 mr-2 ${filters.consultationType === 'clinic' ? 'bajaj-blue-text' : 'text-gray-400'}`} />
              <label className={`text-sm cursor-pointer ${filters.consultationType === 'clinic' ? 'font-medium bajaj-blue-text' : 'text-gray-700'}`}>
                In-Clinic Consultation
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Specialities Filter Section */}
      <div className="mb-4">
        <div 
          className="flex justify-between items-center mb-3 cursor-pointer" 
          onClick={toggleSpecialties}
        >
          <h3 className="font-semibold bajaj-blue-text" data-testid="filter-header-speciality">Specialities</h3>
          <button className="text-gray-500">
            {showSpecialties ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        {showSpecialties && (
          <div className="space-y-2">
            <div className="max-h-48 overflow-y-auto pr-2 space-y-2">
              {specialties.map((specialty) => {
                const formattedSpecialty = specialty.replace('/', '-');
                const testId = `filter-specialty-${formattedSpecialty}`;
                const isSelected = filters.specialties.includes(specialty);
                
                return (
                  <div 
                    className={`flex items-center p-2 rounded-md cursor-pointer ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    key={specialty}
                    onClick={() => handleSpecialtyChange(specialty)}
                  >
                    <input 
                      type="checkbox" 
                      id={`specialty-${formattedSpecialty}`} 
                      className={`mr-2 h-4 w-4 rounded text-blue-600 focus:ring-blue-500`}
                      data-testid={testId}
                      checked={isSelected}
                      onChange={() => {}} // Handled by the parent div click
                    />
                    <label 
                      htmlFor={`specialty-${formattedSpecialty}`} 
                      className={`text-sm cursor-pointer ${isSelected ? 'font-medium bajaj-blue-text' : 'text-gray-700'}`}
                    >
                      {specialty}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
