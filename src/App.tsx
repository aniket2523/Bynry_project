import React, { useState, useMemo, useEffect } from 'react';
import { ProfileCard } from './components/ProfileCard';
import { MapView } from './components/Map';
import { SearchBar } from './components/SearchBar';
import { AdminPanel } from './components/AdminPanel';
import { profiles as initialProfiles } from './data/profiles';
import type { Profile, MapViewport } from './types';
import { Users, Settings } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [viewport, setViewport] = useState<MapViewport>({
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 3
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProfiles = useMemo(() => {
    let filtered = profiles;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(profile => profile.department.toLowerCase() === activeFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter((profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, activeFilter, profiles]);

  const departments = useMemo(() => {
    return ['all', ...new Set(profiles.map(profile => profile.department.toLowerCase()))];
  }, [profiles]);

  const handleProfileSelect = (profile: Profile) => {
    setSelectedProfile(profile);
    setViewport({
      latitude: profile.coordinates[1],
      longitude: profile.coordinates[0],
      zoom: 12
    });
  };

  const handleAddProfile = (profile: Profile) => {
    setProfiles(prev => [...prev, profile]);
  };

  const handleUpdateProfile = (id: string, updatedProfile: Profile) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id ? updatedProfile : profile
    ));
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    if (selectedProfile?.id === id) {
      setSelectedProfile(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <Users className="w-12 h-12 text-blue-500 animate-bounce" />
          <p className="mt-4 text-gray-600">Loading team directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Directory</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {filteredProfiles.length} team member{filteredProfiles.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setIsAdminPanelOpen(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin Panel
            </button>
          </div>
        </div>
        
        <div className="mb-6 space-y-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                  activeFilter === dept
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-250px)]">
            {filteredProfiles.length > 0 ? (
              <div className="grid gap-6">
                {filteredProfiles.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="transform transition-all duration-300"
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
                    }}
                  >
                    <ProfileCard
                      profile={profile}
                      isSelected={selectedProfile?.id === profile.id}
                      onClick={() => setSelectedProfile(profile)}
                      onLocationClick={() => handleProfileSelect(profile)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No profiles found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
          
          <div className="h-[calc(100vh-250px)] bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <MapView
              profiles={filteredProfiles}
              selectedProfile={selectedProfile}
              viewport={viewport}
              onViewportChange={setViewport}
            />
          </div>
        </div>
      </div>

      {isAdminPanelOpen && (
        <AdminPanel
          profiles={profiles}
          onAddProfile={handleAddProfile}
          onUpdateProfile={handleUpdateProfile}
          onDeleteProfile={handleDeleteProfile}
          onClose={() => setIsAdminPanelOpen(false)}
        />
      )}
    </div>
  );
}

export default App;