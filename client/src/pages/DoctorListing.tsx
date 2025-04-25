import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import DoctorCard from '@/components/DoctorCard';
import { API_URL, filterDoctors, extractSpecialties } from '@/lib/doctors';
import { Doctor, ApiDoctor } from '@/types/doctor';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Loader2 } from 'lucide-react';

export default function DoctorListing() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useQueryParams();
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      return response.json() as Promise<ApiDoctor[]>;
    }
  });
  
  useEffect(() => {
    if (data) {
      // Transform API doctors to our application format
      const processedDoctors = data.map(apiDoctor => {
        // Extract fee number from string like "₹ 500"
        const feeMatch = apiDoctor.fees.match(/\d+/);
        const fees = feeMatch ? parseInt(feeMatch[0]) : 0;
        
        // Extract experience number from string like "13 Years of experience"
        const expMatch = apiDoctor.experience.match(/\d+/);
        const experience = expMatch ? parseInt(expMatch[0]) : 0;
        
        // Extract specialties as comma-separated string
        const specialty = apiDoctor.specialities.map(s => s.name).join(', ');
        
        // Determine consultation modes
        const consultationMode: ("Video Consult" | "In Clinic")[] = [];
        if (apiDoctor.video_consult) consultationMode.push("Video Consult");
        if (apiDoctor.in_clinic) consultationMode.push("In Clinic");
        
        return {
          id: apiDoctor.id,
          name: apiDoctor.name,
          specialty,
          experience,
          fees,
          clinicName: apiDoctor.clinic?.name,
          location: `${apiDoctor.clinic?.address.locality}, ${apiDoctor.clinic?.address.city}`,
          consultationMode,
          imageUrl: apiDoctor.photo,
          gender: "" // API doesn't provide gender info
        } as Doctor;
      });
      
      setDoctors(processedDoctors);
      setSpecialties(extractSpecialties(processedDoctors));
    }
  }, [data]);
  
  useEffect(() => {
    if (doctors.length > 0) {
      const filtered = filterDoctors(
        doctors,
        filters.search,
        filters.consultationType,
        filters.specialties,
        filters.sortBy
      );
      setFilteredDoctors(filtered);
    }
  }, [doctors, filters]);
  
  const handleSearch = (searchTerm: string) => {
    setFilters({ search: searchTerm });
  };
  
  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(newFilters);
  };
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load doctors data. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bajaj-blue text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-center items-center">
          <SearchBar 
            doctors={doctors} 
            searchTerm={filters.search} 
            onSearch={handleSearch} 
          />
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto p-4 flex-grow flex flex-col md:flex-row">
        {/* Filter Sidebar */}
        <div className="md:w-1/4 p-4 md:pr-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <FilterPanel 
              specialties={specialties} 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          )}
        </div>
        
        {/* Doctor Listing */}
        <div className="md:w-3/4 flex-grow">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Loading doctors...</span>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              <p>No doctors match your search criteria.</p>
              <p className="mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
