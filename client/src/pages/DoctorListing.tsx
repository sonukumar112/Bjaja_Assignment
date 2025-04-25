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
  const [searchTerm, setSearchTerm] = useState('');
  
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
      
      // Set default filter to sort by experience
      if (!filters.sortBy) {
        setFilters({ ...filters, sortBy: 'experience' });
      }
    }
  }, [data, filters, setFilters]);
  
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
    setSearchTerm(searchTerm);
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Header */}
      <header className="text-center py-6 bg-white border-b border-gray-200">
        <h1 className="text-xl text-gray-600 font-medium">Find and connect with the best doctors</h1>
      </header>
      
      {/* Filter Section */}
      <div className="container mx-auto my-6 p-6 bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search by name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search by name</label>
            <input
              type="text"
              placeholder="Enter doctor name..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Specialty selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange({ 
                  specialties: value === "All Specialties" ? [] : [value]
                });
              }}
            >
              <option>All Specialties</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort by */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="flex items-center">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  handleFilterChange({ sortBy: e.target.value as any });
                }}
              >
                <option value="experience">Experience: High to Low</option>
                <option value="fees">Fees: Low to High</option>
              </select>
              <button 
                className="ml-4 px-6 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 transition-colors"
                onClick={() => {
                  setFilteredDoctors(
                    filterDoctors(
                      doctors,
                      filters.search,
                      filters.consultationType,
                      filters.specialties,
                      filters.sortBy
                    )
                  );
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Doctor Listing */}
      <div className="container mx-auto px-6 pb-6 flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Loading doctors...</span>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="space-y-6">
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
  );
}
