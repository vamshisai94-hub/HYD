import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, Zap, Users, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { VEHICLES, DEALERS, AREAS, HYDERABAD_AREAS } from '../mockData';
import VehicleCard from '../components/VehicleCard';
import DealerCard from '../components/DealerCard';

export default function Home() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('Car');
  const [searchArea, setSearchArea] = useState('');
  const [searchBudget, setSearchBudget] = useState('');

  const featuredVehicles = VEHICLES.filter(v => v.isFeatured);
  const latestVehicles = VEHICLES.slice(0, 4);
  const trustedDealers = DEALERS.filter(d => d.isVerified).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/buy?type=${searchType}&area=${searchArea}&budget=${searchBudget}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-20 pb-32 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-indigo-600/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-600/20 text-blue-400 text-sm font-bold rounded-full mb-6 border border-blue-600/30">
              Hyderabad's #1 Vehicle Marketplace
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]">
              Find the Best Used <br />
              <span className="text-blue-500">Vehicles in Hyderabad</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Connect directly with verified dealers across the city. 
              Browse thousands of cars and bikes at the best prices.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <form 
              onSubmit={handleSearch}
              className="bg-white p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="relative">
                  <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-full bg-slate-50 border-none text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="Car">Cars Only</option>
                    <option value="Bike">Bikes Only</option>
                  </select>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                  <select 
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-full bg-slate-50 border-none text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">All Hyderabad Areas</option>
                    {HYDERABAD_AREAS.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
                <div className="relative">
                  <select 
                    value={searchBudget}
                    onChange={(e) => setSearchBudget(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-full bg-slate-50 border-none text-slate-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="">Any Budget</option>
                    <option value="0-500000">Under 5 Lakhs</option>
                    <option value="500000-1000000">5 - 10 Lakhs</option>
                    <option value="1000000-2000000">10 - 20 Lakhs</option>
                    <option value="2000000+">Above 20 Lakhs</option>
                  </select>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </div>
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Search Now
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Browse by Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Browse by Area</h2>
              <p className="text-slate-500">Find vehicles in your neighborhood across Hyderabad</p>
            </div>
            <Link to="/buy" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              View All Areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {AREAS.map((area) => (
              <Link
                key={area.name}
                to={`/buy?area=${area.name}`}
                className="group bg-slate-50 p-6 rounded-2xl text-center hover:bg-blue-600 transition-all duration-300"
              >
                <h3 className="font-bold text-slate-900 group-hover:text-white mb-1">{area.name}</h3>
                <p className="text-xs text-slate-500 group-hover:text-blue-100">{area.count} Listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Featured Listings</h2>
              <p className="text-slate-500">Handpicked premium vehicles from our top dealers</p>
            </div>
            <Link to="/buy" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              See More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
                Why Thousands Trust <br />
                <span className="text-blue-600">HydWheels Marketplace</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="bg-blue-50 p-4 rounded-2xl h-fit">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Dealers</h3>
                    <p className="text-slate-500 leading-relaxed">
                      We manually verify every dealer on our platform to ensure you only see genuine listings from trusted businesses.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="bg-emerald-50 p-4 rounded-2xl h-fit">
                    <Zap className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Direct Contact</h3>
                    <p className="text-slate-500 leading-relaxed">
                      No middlemen, no hidden fees. Call or WhatsApp dealers directly to negotiate and close the deal.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="bg-indigo-50 p-4 rounded-2xl h-fit">
                    <Users className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Hyderabad Focused</h3>
                    <p className="text-slate-500 leading-relaxed">
                      We specialize only in Hyderabad, giving you the most relevant local results and area-specific search.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
              <div className="relative bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]">
                <img 
                  src="https://picsum.photos/seed/hyderabad/800/1200" 
                  alt="Hyderabad City"
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl">
                    <div className="flex gap-4 mb-4">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-white text-lg font-medium italic mb-6">
                      "Found my dream car in Kukatpally within 2 days. The direct contact with the dealer made the process so smooth!"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">VS</div>
                      <div>
                        <p className="text-white font-bold">Vamshi Sai</p>
                        <p className="text-white/60 text-sm">Happy Buyer, Madhapur</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Dealers */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Our Trusted Dealers</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We partner with the most reputable used vehicle showrooms in Hyderabad to bring you quality inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {trustedDealers.map(dealer => (
              <DealerCard key={dealer.id} dealer={dealer} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/dealers" className="inline-flex items-center gap-2 bg-white border border-slate-200 px-8 py-3 rounded-full font-bold text-slate-900 hover:bg-slate-50 transition-all">
              View All Dealers <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">5,000+</p>
              <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">Active Listings</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">250+</p>
              <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">Verified Dealers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">15k+</p>
              <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">Monthly Buyers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-black text-white mb-2">16+</p>
              <p className="text-blue-100 font-medium uppercase tracking-wider text-sm">Hyderabad Areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Seller CTA */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[120px] rounded-full translate-x-1/3" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  Are You a Vehicle <br />
                  <span className="text-blue-500">Dealer in Hyderabad?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10">
                  Join Hyderabad's fastest growing vehicle marketplace. 
                  Reach thousands of local buyers and manage your inventory with our professional dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/become-seller" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all text-center">
                    Start Selling Today
                  </Link>
                  <Link to="/contact" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all text-center">
                    Contact Sales
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
                  <CheckCircle2 className="h-8 w-8 text-blue-500 mb-4" />
                  <h4 className="text-white font-bold mb-2">Smart Dashboard</h4>
                  <p className="text-slate-500 text-sm">Manage listings, track enquiries, and view analytics.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl mt-8">
                  <CheckCircle2 className="h-8 w-8 text-blue-500 mb-4" />
                  <h4 className="text-white font-bold mb-2">Verified Badge</h4>
                  <p className="text-slate-500 text-sm">Build trust with buyers through our verification process.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl">
                  <CheckCircle2 className="h-8 w-8 text-blue-500 mb-4" />
                  <h4 className="text-white font-bold mb-2">Local Reach</h4>
                  <p className="text-slate-500 text-sm">Connect with buyers specifically looking in your area.</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl mt-8">
                  <CheckCircle2 className="h-8 w-8 text-blue-500 mb-4" />
                  <h4 className="text-white font-bold mb-2">Easy Upload</h4>
                  <p className="text-slate-500 text-sm">List your vehicles in minutes with our mobile-friendly form.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500">Everything you need to know about HydWheels</p>
          </div>

          <div className="space-y-6">
            {[
              { q: "Is HydWheels a dealer or a marketplace?", a: "HydWheels is a pure marketplace connecting buyers and dealers. We do not own, buy, or sell any vehicles ourselves." },
              { q: "How do I contact a dealer?", a: "Every vehicle listing has 'Call' and 'WhatsApp' buttons. Clicking these will connect you directly with the dealer who listed the vehicle." },
              { q: "Are the vehicles inspected by HydWheels?", a: "We verify the dealers on our platform, but we do not physically inspect individual vehicles. We recommend buyers to inspect vehicles personally before purchase." },
              { q: "How much does it cost to list a vehicle?", a: "For individual sellers, the first listing is free. For dealers, we have affordable monthly subscription plans for bulk listings." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
