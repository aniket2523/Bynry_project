import React, { useCallback, useMemo } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import type { Profile, MapViewport } from '../types';

interface MapViewProps {
  profiles: Profile[];
  selectedProfile: Profile | null;
  viewport: MapViewport;
  onViewportChange: (viewport: MapViewport) => void;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V4YW1wbGUwMDAwMnFxMmV4YW1wbGUifQ.example';

export const MapView: React.FC<MapViewProps> = ({
  profiles,
  selectedProfile,
  viewport,
  onViewportChange
}) => {
  const markers = useMemo(() => {
    return profiles.map((profile) => (
      <Marker
        key={profile.id}
        latitude={profile.coordinates[1]}
        longitude={profile.coordinates[0]}
      >
        <div
          className={`map-marker cursor-pointer transition-all duration-300 ${
            selectedProfile?.id === profile.id ? 'scale-125' : ''
          }`}
        >
          <MapPin
            className={`w-6 h-6 ${
              selectedProfile?.id === profile.id
                ? 'text-blue-500 animate-bounce'
                : 'text-gray-700 hover:text-blue-400'
            }`}
          />
        </div>
      </Marker>
    ));
  }, [profiles, selectedProfile]);

  const handleViewportChange = useCallback((newViewport: any) => {
    onViewportChange({
      latitude: newViewport.latitude,
      longitude: newViewport.longitude,
      zoom: newViewport.zoom
    });
  }, [onViewportChange]);

  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        latitude: viewport.latitude,
        longitude: viewport.longitude,
        zoom: viewport.zoom
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      onMove={evt => handleViewportChange(evt.viewState)}
    >
      {markers}

      {selectedProfile && (
        <Popup
          latitude={selectedProfile.coordinates[1]}
          longitude={selectedProfile.coordinates[0]}
          closeButton={true}
          closeOnClick={false}
          anchor="bottom"
          onClose={() => onViewportChange({ ...viewport })}
          className="rounded-lg shadow-lg"
        >
          <div className="p-3">
            <h3 className="font-semibold text-gray-900">{selectedProfile.name}</h3>
            <p className="text-sm text-gray-600">{selectedProfile.address}</p>
            <p className="text-xs text-gray-500 mt-1">{selectedProfile.department}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};