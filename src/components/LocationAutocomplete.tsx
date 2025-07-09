import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface Suggestion {
  place_name: string;
  text: string;
  context?: Array<{ text: string }>;
}

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Location",
  className = ""
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Use Mapbox Geocoding API (free tier available)
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

  // Alternatively, use a free service like Nominatim (OpenStreetMap)
  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    
    try {
      // Option 1: Using Mapbox (requires token)
      if (MAPBOX_TOKEN) {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?` +
          `access_token=${MAPBOX_TOKEN}&types=place,locality,region&limit=5`
        );
        
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.features || []);
        }
      } else {
        // Option 2: Using Nominatim (free, no token required)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
          `q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=us`
        );
        
        if (response.ok) {
          const data: Array<{ display_name: string }> = await response.json();
          setSuggestions(
            data.map((item) => ({
              place_name: item.display_name,
              text: item.display_name.split(',')[0],
            }))
          );
        }
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value) {
        fetchSuggestions(value);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [value]);

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    // Format the location nicely (e.g., "San Francisco, CA")
    const locationParts = suggestion.place_name.split(',');
    let formattedLocation = locationParts[0];
    
    if (locationParts.length > 1) {
      // Try to find state abbreviation or country
      const statePart = locationParts.find(part => 
        part.trim().length === 2 || 
        part.trim().match(/^[A-Z]{2}$/) ||
        part.trim().includes('United States')
      );
      
      if (statePart) {
        formattedLocation += `, ${statePart.trim().replace('United States', 'USA')}`;
      } else if (locationParts[1]) {
        formattedLocation += `, ${locationParts[1].trim()}`;
      }
    }
    
    onChange(formattedLocation);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`pl-10 pr-10 ${className}`}
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 animate-spin" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => {
            const isSelected = index === selectedIndex;
            const locationParts = suggestion.place_name.split(',');
            
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-start space-x-3 ${
                  isSelected ? 'bg-gray-700' : ''
                }`}
              >
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{locationParts[0]}</div>
                  {locationParts.length > 1 && (
                    <div className="text-sm text-gray-400">
                      {locationParts.slice(1).join(', ')}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Usage in your builder page:
// import LocationAutocomplete from '@/components/LocationAutocomplete';
// 
// <LocationAutocomplete
//   value={resumeData.personal.location}
//   onChange={(value) => updateResumeData('personal', 'location', value)}
//   placeholder="Location"
//   className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors w-full"
// />
