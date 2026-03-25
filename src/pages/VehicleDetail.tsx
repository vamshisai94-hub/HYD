import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Calendar, Gauge, Fuel, Phone, MessageCircle, 
  ChevronLeft, Share2, Heart, ShieldCheck, Info, ArrowRight,
  CheckCircle2, Star
} from 'lucide-react';
import { VEHICLES, DEALERS } from '../mockData';
import { formatCurrency } from '../lib/utils';
import VehicleCard from '../components/VehicleCard';

export default function VehicleDetail() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const vehicle = VEHICLES.find(v => v.id === id);
  
  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Vehicle not found</h2>
        <Link to="/buy" className="text-blue-600 font-bold hover:underline">Back to marketplace</Link>
      </div>
    );
  }

  const dealer = DEALERS.find(d => d.id === vehicle.dealerId);
  const relatedVehicles = VEHICLES.filter(v => v.type === vehicle.type && v.id !== vehicle.id).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs & Actions */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/buy" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Search
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-[16/9] bg-slate-200 rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src={vehicle.images[activeImage]} 
                  alt={vehicle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {vehicle.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative h-20 w-28 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${activeImage === idx ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
                      {vehicle.type}
                    </span>
                    <span className="text-slate-400 text-xs font-medium">• {vehicle.status}</span>
                  </div>
                  <h1 className="text-3xl font-black text-slate-900">{vehicle.title}</h1>
                  <div className="flex items-center gap-2 text-slate-500 mt-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{vehicle.area}, Hyderabad</span>
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Fixed Price</p>
                  <p className="text-4xl font-black text-blue-600">{formatCurrency(vehicle.price)}</p>
                </div>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Calendar className="h-5 w-5 text-blue-600 mb-2" />
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Year</p>
                  <p className="text-base font-bold text-slate-900">{vehicle.year}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Gauge className="h-5 w-5 text-blue-600 mb-2" />
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">KM Driven</p>
                  <p className="text-base font-bold text-slate-900">{vehicle.kmDriven.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Fuel className="h-5 w-5 text-blue-600 mb-2" />
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Fuel Type</p>
                  <p className="text-base font-bold text-slate-900">{vehicle.fuelType}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="h-5 w-5 rounded-full border-2 border-blue-600 flex items-center justify-center text-[10px] font-black text-blue-600 mb-2">A</div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Transmission</p>
                  <p className="text-base font-bold text-slate-900">{vehicle.transmission}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>

              {/* Specifications Table */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    { label: 'Brand', value: vehicle.brand },
                    { label: 'Model', value: vehicle.model },
                    { label: 'Year', value: vehicle.year },
                    { label: 'Fuel Type', value: vehicle.fuelType },
                    { label: 'Transmission', value: vehicle.transmission },
                    { label: 'KM Driven', value: `${vehicle.kmDriven.toLocaleString()} km` },
                    { label: 'Owner', value: '1st Owner' },
                    { label: 'Insurance', value: 'Valid till Dec 2024' },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-slate-50">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="text-slate-900 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex gap-4">
              <div className="bg-amber-100 p-3 rounded-2xl h-fit">
                <ShieldCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Safety Tips for Buyers</h4>
                <ul className="text-sm text-amber-800 space-y-1 list-disc pl-4">
                  <li>Always inspect the vehicle in person before paying.</li>
                  <li>Check all documents (RC, Insurance, PUC) thoroughly.</li>
                  <li>Avoid making any advance payments before seeing the vehicle.</li>
                  <li>Meet the dealer at their physical showroom location.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Dealer Info & Contact */}
          <div className="space-y-6">
            {/* Dealer Card */}
            {dealer && (
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-2xl overflow-hidden border border-slate-100">
                    <img src={dealer.logo} alt={dealer.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <h3 className="font-bold text-slate-900">{dealer.name}</h3>
                      {dealer.isVerified && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-slate-700">{dealer.rating}</span>
                      <span>• {dealer.vehicleCount} Vehicles</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                    <span>{dealer.address}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href={`tel:${dealer.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    <Phone className="h-5 w-5" />
                    Call Dealer
                  </a>
                  <a 
                    href={`https://wa.me/${dealer.whatsapp.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                  <Link 
                    to={`/dealer/${dealer.id}`}
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                  >
                    View Showroom
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Info className="h-4 w-4" />
                    Listing Details
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Listed on</span>
                      <span className="text-slate-900 font-medium">{vehicle.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Listing ID</span>
                      <span className="text-slate-900 font-medium">#HYD-{vehicle.id.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Vehicles */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">Similar Vehicles</h2>
            <Link to="/buy" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedVehicles.map(v => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
