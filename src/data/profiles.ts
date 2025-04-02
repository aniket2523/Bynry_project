import { Profile } from '../types';

export const profiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description: 'Senior Software Engineer with expertise in cloud architecture',
    address: '123 Tech Avenue, San Francisco, CA',
    coordinates: [-122.4194, 37.7749],
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567',
    role: 'Senior Engineer',
    department: 'Engineering'
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    description: 'Product Manager focusing on AI/ML initiatives',
    address: '456 Innovation Drive, Seattle, WA',
    coordinates: [-122.3321, 47.6062],
    email: 'michael.c@example.com',
    phone: '(555) 234-5678',
    role: 'Product Manager',
    department: 'Product'
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    description: 'UX Designer specializing in mobile applications',
    address: '789 Design Street, Austin, TX',
    coordinates: [-97.7431, 30.2672],
    email: 'emma.r@example.com',
    phone: '(555) 345-6789',
    role: 'UX Designer',
    department: 'Design'
  }
];