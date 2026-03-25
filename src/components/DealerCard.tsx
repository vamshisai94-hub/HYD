import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Car, CheckCircle2, ChevronRight } from 'lucide-react';
import { Dealer } from '../types';

interface DealerCardProps {
  dealer: Dealer;
  key?: React.Key;
}

export default function DealerCard({ dealer }: DealerCardProps) {
  return (
    <Link 
      to={`/dealer/${dealer.id}`}
      className="group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
          <img 
            src={dealer.logo} 
            alt={dealer.name}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        {dealer.isVerified && (
          <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {dealer.name}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-500 text-sm">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>{dealer.area}, Hyderabad</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-amber-500 font-bold mb-0.5">
            <Star className="h-4 w-4 fill-amber-500" />
            <span>{dealer.rating}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Rating</span>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 text-blue-600 font-bold mb-0.5">
            <Car className="h-4 w-4" />
            <span>{dealer.vehicleCount}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Vehicles</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-semibold text-blue-600">
        <span>View Showroom</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
