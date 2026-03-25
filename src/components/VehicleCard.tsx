import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Fuel, ChevronRight } from 'lucide-react';
import { Vehicle } from '../types';
import { formatCurrency } from '../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  key?: React.Key;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link 
      to={`/vehicle/${vehicle.id}`}
      className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {vehicle.isFeatured && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-lg">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-md">
          {vehicle.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {vehicle.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
            <MapPin className="h-3 w-3" />
            <span>{vehicle.area}, Hyderabad</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4">
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <Calendar className="h-3.5 w-3.5 text-blue-500" />
            <span>{vehicle.year} Model</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <Gauge className="h-3.5 w-3.5 text-blue-500" />
            <span>{vehicle.kmDriven.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <Fuel className="h-3.5 w-3.5 text-blue-500" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <div className="h-3.5 w-3.5 rounded-full border border-blue-500 flex items-center justify-center text-[8px] font-bold text-blue-500">A</div>
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="text-xl font-black text-blue-600">
            {formatCurrency(vehicle.price)}
          </span>
          <div className="bg-slate-50 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
