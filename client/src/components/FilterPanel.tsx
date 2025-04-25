import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
    onFilterChange({ consultationType: type });
  };

  const handleSortChange = (sort: SortOption) => {
    onFilterChange({ sortBy: sort });
  };

  const toggleSpecialties = () => setShowSpecialties(!showSpecialties);
  const toggleConsultation = () => setShowConsultation(!showConsultation);
  const toggleSort = () => setShowSort(!showSort);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Sort Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 cursor-pointer" onClick={toggleSort}>
          <h2 className="font-semibold text-gray-700" data-testid="filter-header-sort">Sort by</h2>
          <button className="text-gray-500">
            {showSort ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        {showSort && (
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="sortFees" 
                name="sortOption" 
                className="mr-2" 
                data-testid="sort-fees"
                checked={filters.sortBy === 'fees'}
                onChange={() => handleSortChange('fees')}
              />
              <label htmlFor="sortFees" className="text-sm text-gray-700">Price (Low/High)</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="sortExperience" 
                name="sortOption" 
                className="mr-2" 
                data-testid="sort-experience"
                checked={filters.sortBy === 'experience'}
                onChange={() => handleSortChange('experience')}
              />
              <label htmlFor="sortExperience" className="text-sm text-gray-700">Experience: Most Experience first</label>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-gray-800">Filters</h2>
        <button 
          className="text-xs text-blue-600 hover:text-blue-800"
          onClick={() => onFilterChange({ 
            search: '', 
            consultationType: '', 
            specialties: [], 
            sortBy: '' 
          })}
        >
          Clear All
        </button>
      </div>

      {/* Specialities Filter Section */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer" 
          onClick={toggleSpecialties}
        >
          <h3 className="font-semibold text-gray-700" data-testid="filter-header-speciality">Specialities</h3>
          <button className="text-gray-500">
            {showSpecialties ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        {showSpecialties && (
          <div className="pl-1 space-y-2">
            <div className="max-h-48 overflow-y-auto space-y-2">
              {specialties.map((specialty) => {
                const formattedSpecialty = specialty.replace('/', '-');
                const testId = `filter-specialty-${formattedSpecialty}`;
                
                return (
                  <div className="flex items-center" key={specialty}>
                    <input 
                      type="checkbox" 
                      id={`specialty-${formattedSpecialty}`} 
                      className="mr-2" 
                      data-testid={testId}
                      checked={filters.specialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                    />
                    <label 
                      htmlFor={`specialty-${formattedSpecialty}`} 
                      className="text-sm text-gray-700"
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

      {/* Mode of Consultation Filter Section */}
      <div className="mb-6">
        <div 
          className="flex justify-between items-center mb-2 cursor-pointer" 
          onClick={toggleConsultation}
        >
          <h3 className="font-semibold text-gray-700" data-testid="filter-header-moc">Mode of Consultation</h3>
          <button className="text-gray-500">
            {showConsultation ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
        {showConsultation && (
          <div className="pl-1 space-y-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="videoConsult" 
                name="consultationType" 
                className="mr-2" 
                data-testid="filter-video-consult"
                checked={filters.consultationType === 'video'}
                onChange={() => handleConsultationTypeChange('video')}
              />
              <label htmlFor="videoConsult" className="text-sm text-gray-700">Video Consultation</label>
            </div>
            <div className="flex items-center">
              <input 
                type="radio" 
                id="inClinic" 
                name="consultationType" 
                className="mr-2" 
                data-testid="filter-in-clinic"
                checked={filters.consultationType === 'clinic'}
                onChange={() => handleConsultationTypeChange('clinic')}
              />
              <label htmlFor="inClinic" className="text-sm text-gray-700">In-Clinic Consultation</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
