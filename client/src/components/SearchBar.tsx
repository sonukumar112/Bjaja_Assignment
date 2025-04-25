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

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Symptoms, Doctors, Specialties, Clinics"
          className="w-full py-2 px-4 pr-10 rounded-md border-0 focus:ring-2 focus:ring-blue-400 text-gray-800"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          data-testid="autocomplete-input"
        />
        <button className="absolute right-3 top-2.5 text-gray-500">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {showSuggestions && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1"
        >
          {matchingDoctors.map((doctor) => (
            <AutocompleteSuggestion
              key={doctor.id}
              doctor={doctor}
              onClick={handleSuggestionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
