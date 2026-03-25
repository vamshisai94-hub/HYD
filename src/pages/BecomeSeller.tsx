import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Zap, BarChart3, Users, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export default function BecomeSeller() {
  const plans = [
    {
      name: 'Starter',
      price: '₹1,499',
      period: 'per month',
      features: [
        'Up to 10 Active Listings',
        'Standard Search Visibility',
        'Basic Dashboard Access',
        'WhatsApp Integration',
        'Standard Support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '₹3,999',
      period: 'per month',
      features: [
        'Up to 50 Active Listings',
        'Featured Listing Badge',
        'Priority Search Visibility',
        'Advanced Analytics',
        'Verified Dealer Badge',
        'Priority Support'
      ],
      cta: 'Most Popular',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '₹7,999',
      period: 'per month',
      features: [
        'Unlimited Active Listings',
        'Premium Search Visibility',
        'Dedicated Account Manager',
        'Custom Branding',
        'API Access',
        '24/7 Support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-24 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            Grow Your Vehicle <br />
            <span className="text-blue-500">Business in Hyderabad</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Join 250+ verified dealers reaching 15,000+ monthly buyers in Hyderabad. 
            List your inventory and get direct enquiries today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
              View Pricing Plans
            </a>
            <Link to="/contact" className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Why Sell on HydWheels?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We provide the tools and reach you need to sell your used vehicles faster and more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: Users, title: 'Targeted Local Reach', desc: 'Connect with buyers specifically looking for vehicles in Hyderabad areas like Kukatpally, Gachibowli, and more.' },
              { icon: Zap, title: 'Instant Enquiries', desc: 'Get direct calls and WhatsApp messages from interested buyers. No middlemen, no delays.' },
              { icon: BarChart3, title: 'Smart Dashboard', desc: 'Manage your entire inventory, track listing performance, and view detailed analytics in one place.' },
              { icon: ShieldCheck, title: 'Verified Trust', desc: 'Our "Verified Dealer" badge builds instant trust with potential buyers, leading to faster sales.' },
              { icon: MessageCircle, title: 'Direct Communication', desc: 'Negotiate and close deals directly with buyers. We don\'t take any commission on your sales.' },
              { icon: CheckCircle2, title: 'Easy Management', desc: 'Upload vehicles in minutes with our mobile-friendly interface. Update prices and status instantly.' }
            ].map((benefit, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="bg-white p-4 rounded-2xl h-fit w-fit mb-6 shadow-sm group-hover:bg-blue-600 transition-colors">
                  <benefit.icon className="h-8 w-8 text-blue-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Choose the plan that fits your business size. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`relative bg-white rounded-[2.5rem] p-10 border-2 transition-all duration-300 flex flex-col ${plan.popular ? 'border-blue-600 shadow-2xl scale-105 z-10' : 'border-slate-100 hover:border-blue-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-slate-400 font-medium">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-slate-600 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-slate-900 mb-4">How to Get Started</h2>
            <p className="text-slate-500">Three simple steps to start selling your vehicles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector line for desktop */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-slate-100 -z-10" />
            
            {[
              { step: '01', title: 'Register & Subscribe', desc: 'Create your dealer profile and choose a subscription plan that fits your needs.' },
              { step: '02', title: 'Upload Inventory', desc: 'Use our easy dashboard to list your vehicles with photos, specs, and pricing.' },
              { step: '03', title: 'Receive Enquiries', desc: 'Get direct calls and WhatsApp messages from verified buyers in Hyderabad.' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="h-20 w-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl shadow-blue-600/20">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
              Ready to Boost Your Sales?
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Join Hyderabad's most professional vehicle marketplace today and start reaching more buyers.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30">
              Create Dealer Account <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
