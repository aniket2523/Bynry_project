export interface Profile {
  id: string;
  name: string;
  photo: string;
  description: string;
  address: string;
  coordinates: [number, number];
  email: string;
  phone: string;
  role: string;
  department: string;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}