import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Doctor } from '../types/doctor';
import AutocompleteSuggestion from './AutocompleteSuggestion';
import { getTop3MatchingDoctors } from '../lib/doctors';

interface SearchBarProps {
  doctors: Doctor[];
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({ doctors, searchTerm, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [matchingDoctors, setMatchingDoctors] = useState<Doctor[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (inputValue.length >= 2) {
      const matches = getTop3MatchingDoctors(doctors, inputValue);
      setMatchingDoctors(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, doctors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current !== event.target
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    if (inputValue.length >= 2 && matchingDoctors.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (doctorName: string) => {
    setInputValue(doctorName);
    onSearch(doctorName);
    setShowSuggestions(false);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Doctors, Specialties, Clinics"
          className="w-full py-3 px-10 rounded-md border-0 focus:ring-2 focus:ring-blue-500 text-gray-800 shadow-sm"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          data-testid="autocomplete-input"
        />
        <button 
          className="absolute right-2 top-1.5 bg-[#0e4d92] text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {showSuggestions && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1 border border-gray-200 overflow-hidden"
        >
          <div className="py-2">
            {matchingDoctors.map((doctor) => (
              <AutocompleteSuggestion
                key={doctor.id}
                doctor={doctor}
                onClick={handleSuggestionClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
