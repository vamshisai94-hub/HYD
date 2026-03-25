import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { VEHICLES, HYDERABAD_AREAS } from '../mockData';
import VehicleCard from '../components/VehicleCard';
import { cn } from '../lib/utils';

export default function BuyVehicles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [type, setType] = useState(searchParams.get('type') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');
  const [fuel, setFuel] = useState('');
  const [budget, setBudget] = useState(searchParams.get('budget') || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(v => {
      const matchesType = !type || v.type === type;
      const matchesArea = !area || v.area === area;
      const matchesFuel = !fuel || v.fuelType === fuel;
      const matchesSearch = !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.brand.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesBudget = true;
      if (budget) {
        const [min, max] = budget.split('-').map(Number);
        if (budget.includes('+')) {
          matchesBudget = v.price >= 2000000;
        } else {
          matchesBudget = v.price >= min && v.price <= max;
        }
      }

      return matchesType && matchesArea && matchesFuel && matchesSearch && matchesBudget;
    });
  }, [type, area, fuel, budget, searchQuery]);

  const clearFilters = () => {
    setType('');
    setArea('');
    setFuel('');
    setBudget('');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Find Your Next Vehicle</h1>
          <p className="text-slate-500">Browse {filteredVehicles.length} available vehicles in Hyderabad</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vehicle Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['Car', 'Bike'].map(t => (
                      <button
                        key={t}
                        onClick={() => setType(type === t ? '' : t)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                          type === t 
                            ? "bg-blue-600 border-blue-600 text-white shadow-md" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-600"
                        )}
                      >
                        {t}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Area (Hyderabad)</label>
                  <select 
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-50 border-slate-100 rounded-xl text-sm p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">All Areas</option>
                    {HYDERABAD_AREAS.map(a => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Budget Range</label>
                  <select 
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-50 border-slate-100 rounded-xl text-sm p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Any Budget</option>
                    <option value="0-200000">Under 2 Lakhs</option>
                    <option value="200000-500000">2 - 5 Lakhs</option>
                    <option value="500000-1000000">5 - 10 Lakhs</option>
                    <option value="1000000-2000000">10 - 20 Lakhs</option>
                    <option value="2000000+">Above 20 Lakhs</option>
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Fuel Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Petrol', 'Diesel', 'Electric', 'CNG'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFuel(fuel === f ? '' : f)}
                        className={cn(
                          "px-3 py-2 rounded-xl text-xs font-medium border transition-all text-center",
                          fuel === f 
                            ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                            : "bg-white border-slate-200 text-slate-600 hover:border-blue-600"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search and Sort */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search brand, model, or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border-none text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
                <div className="relative flex-1 md:flex-none">
                  <select className="w-full md:w-48 appearance-none bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold pr-10 outline-none">
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>KM: Low to High</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-20 text-center border border-slate-100">
                <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No vehicles found</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                  We couldn't find any vehicles matching your current filters. Try adjusting your search or clearing filters.
                </p>
                <button 
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="h-6 w-6 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Reuse filter sections from desktop sidebar */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Vehicle Type</label>
                <div className="flex flex-wrap gap-2">
                  {['Car', 'Bike'].map(t => (
                    <button
                      key={t}
                      onClick={() => setType(type === t ? '' : t)}
                      className={cn(
                        "px-6 py-3 rounded-2xl text-sm font-bold border transition-all",
                        type === t 
                          ? "bg-blue-600 border-blue-600 text-white shadow-md" 
                          : "bg-white border-slate-200 text-slate-600"
                      )}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Area (Hyderabad)</label>
                <select 
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-slate-50 border-slate-100 rounded-2xl text-sm p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">All Areas</option>
                  {HYDERABAD_AREAS.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Budget Range</label>
                <select 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 border-slate-100 rounded-2xl text-sm p-4 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Any Budget</option>
                  <option value="0-200000">Under 2 Lakhs</option>
                  <option value="200000-500000">2 - 5 Lakhs</option>
                  <option value="500000-1000000">5 - 10 Lakhs</option>
                  <option value="1000000-2000000">10 - 20 Lakhs</option>
                  <option value="2000000+">Above 20 Lakhs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Fuel Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Petrol', 'Diesel', 'Electric', 'CNG'].map(f => (
                    <button
                      key={f}
                      onClick={() => setFuel(fuel === f ? '' : f)}
                      className={cn(
                        "px-4 py-3 rounded-2xl text-sm font-bold border transition-all text-center",
                        fuel === f 
                          ? "bg-blue-600 border-blue-600 text-white shadow-sm" 
                          : "bg-white border-slate-200 text-slate-600"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <button 
                onClick={clearFilters}
                className="py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Reset
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="py-4 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
