import React, { useState } from 'react';
import { Search, MapPin, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { DEALERS, HYDERABAD_AREAS } from '../mockData';
import DealerCard from '../components/DealerCard';

export default function Dealers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const filteredDealers = DEALERS.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = !selectedArea || dealer.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Trusted Dealers in Hyderabad</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Connect with verified used vehicle showrooms across the city. 
            Every dealer on our platform is manually verified for trust and quality.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search dealer by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative w-full md:w-64">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <select 
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
            >
              <option value="">All Areas</option>
              {HYDERABAD_AREAS.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dealers Grid */}
        {filteredDealers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDealers.map(dealer => (
              <DealerCard key={dealer.id} dealer={dealer} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100">
            <div className="bg-slate-50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No dealers found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any dealers matching your search criteria in this area.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Users } from 'lucide-react';
