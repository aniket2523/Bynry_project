import React from 'react';
import { MapPin, Mail, Phone, Building2, ExternalLink } from 'lucide-react';
import { Profile } from '../types';
import { clsx } from 'clsx';

interface ProfileCardProps {
  profile: Profile;
  isSelected: boolean;
  onClick: () => void;
  onLocationClick: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isSelected,
  onClick,
  onLocationClick
}) => {
  return (
    <div
      className={clsx(
        'profile-card bg-white rounded-lg shadow-md p-6 cursor-pointer',
        isSelected ? 'ring-2 ring-blue-500 transform scale-[1.02]' : 'hover:shadow-lg'
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="relative group">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {profile.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{profile.description}</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600 group cursor-pointer">
              <MapPin className="w-4 h-4 mr-2 transition-colors group-hover:text-blue-500" />
              <span className="text-sm group-hover:text-blue-500 transition-colors">{profile.address}</span>
            </div>
            <div className="flex items-center text-gray-600 group cursor-pointer">
              <Mail className="w-4 h-4 mr-2 transition-colors group-hover:text-blue-500" />
              <span className="text-sm group-hover:text-blue-500 transition-colors">{profile.email}</span>
            </div>
            <div className="flex items-center text-gray-600 group cursor-pointer">
              <Phone className="w-4 h-4 mr-2 transition-colors group-hover:text-blue-500" />
              <span className="text-sm group-hover:text-blue-500 transition-colors">{profile.phone}</span>
            </div>
            <div className="flex items-center text-gray-600 group cursor-pointer">
              <Building2 className="w-4 h-4 mr-2 transition-colors group-hover:text-blue-500" />
              <span className="text-sm group-hover:text-blue-500 transition-colors">
                {profile.department} - {profile.role}
              </span>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLocationClick();
              }}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Show on Map
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(`mailto:${profile.email}`);
              }}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};