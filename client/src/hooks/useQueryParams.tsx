import { useEffect, useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { FilterState, SortOption, ConsultationType } from '../types/doctor';

export function useQueryParams(): [FilterState, (newState: Partial<FilterState>) => void] {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  
  const [filterState, setFilterState] = useState<FilterState>({
    search: params.get('search') || '',
    consultationType: (params.get('mode') as ConsultationType) || '',
    specialties: params.get('specialties') ? params.get('specialties')!.split(',') : [],
    sortBy: (params.get('sort') as SortOption) || '',
  });
  
  useEffect(() => {
    const params = new URLSearchParams(search);
    setFilterState({
      search: params.get('search') || '',
      consultationType: (params.get('mode') as ConsultationType) || '',
      specialties: params.get('specialties') ? params.get('specialties')!.split(',') : [],
      sortBy: (params.get('sort') as SortOption) || '',
    });
  }, [search]);
  
  const updateQueryParams = (newState: Partial<FilterState>) => {
    const updatedState = { ...filterState, ...newState };
    setFilterState(updatedState);
    
    const params = new URLSearchParams();
    
    if (updatedState.search) {
      params.set('search', updatedState.search);
    }
    
    if (updatedState.consultationType) {
      params.set('mode', updatedState.consultationType);
    }
    
    if (updatedState.specialties.length > 0) {
      params.set('specialties', updatedState.specialties.join(','));
    }
    
    if (updatedState.sortBy) {
      params.set('sort', updatedState.sortBy);
    }
    
    const newUrl = `${location.split('?')[0]}${params.toString() ? '?' + params.toString() : ''}`;
    setLocation(newUrl);
  };
  
  return [filterState, updateQueryParams];
}
