import React from 'react';
import { Plane, Package, Shield, DollarSign, Clock, Star, ArrowRight, CheckCircle, Globe, Users, Award, TrendingUp, BookOpen, GraduationCap } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../hooks/useAuth';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();

  const handleCTAClick = (type: 'traveler' | 'sender') => {
    if (!isAuthenticated) {
      onPageChange('signup');
    } else if (user?.role === 'traveler') {
      onPageChange('travels');
    } else {
      onPageChange('packages');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Harvard Inspired */}
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Modern airport terminal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 min-h-screen flex items-center">
          <div className="max-w-4xl">
            {/* Harvard-style Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm text-sm font-medium mb-8 text-white">
              <Award className="w-4 h-4 mr-3 text-amber-400" />
              <span className="tracking-wide">EXCELLENCE IN GLOBAL TRANSPORT</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight text-white">
              <span className="font-normal">Connecting</span>
              <br />
              <span className="font-bold text-red-600">Travelers</span>
              <span className="font-light"> & </span>
              <span className="font-bold text-red-600">Senders</span>
              <br />
              <span className="font-light">Worldwide</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl leading-relaxed font-light">
              A revolutionary platform that transforms how packages travel across borders. 
              Join our global community of verified travelers and trusted senders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button
                onClick={() => handleCTAClick('traveler')}
                className="group bg-red-600 text-white px-10 py-5 font-medium text-lg hover:bg-red-700 transition-all duration-300 flex items-center space-x-3 min-w-[280px] justify-center"
              >
                <Plane className="w-6 h-6" />
                <span>BECOME A TRAVELER</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => handleCTAClick('sender')}
                className="group bg-white text-gray-900 px-10 py-5 font-medium text-lg hover:bg-gray-50 transition-all duration-300 flex items-center space-x-3 min-w-[280px] justify-center border border-gray-200"
              >
                <Package className="w-6 h-6" />
                <span>SEND A PACKAGE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Indicators - Harvard Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl font-light mb-2 text-white group-hover:text-red-400 transition-colors">10,000+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Successful Deliveries</div>
              </div>
              <div className="group">
                <div className="text-3xl font-light mb-2 text-white group-hover:text-red-400 transition-colors">150+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Countries Served</div>
              </div>
              <div className="group">
                <div className="text-3xl font-light mb-2 text-white group-hover:text-red-400 transition-colors flex items-center justify-center">
                  4.9 <Star className="w-5 h-5 fill-current text-amber-400 ml-1" />
                </div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Average Rating</div>
              </div>
              <div className="group">
                <div className="text-3xl font-light mb-2 text-white group-hover:text-red-400 transition-colors">99.8%</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm font-medium mb-8 uppercase tracking-wide">
                <BookOpen className="w-4 h-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                Advancing Global
                <span className="block font-normal text-red-600">Connectivity</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                We believe in the power of human connection to transform global commerce. 
                Our platform bridges continents, cultures, and communities through trusted, 
                secure package delivery.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-red-600"></div>
                  <span className="text-gray-700 font-medium">Verified traveler network</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-red-600"></div>
                  <span className="text-gray-700 font-medium">End-to-end security protocols</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-red-600"></div>
                  <span className="text-gray-700 font-medium">Real-time tracking technology</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Global connectivity"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
              <div className="absolute inset-0 border-4 border-white shadow-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Academic Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium mb-8 uppercase tracking-wide">
              <Shield className="w-4 h-4 mr-2" />
              Core Principles
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Built on
              <span className="block font-normal text-red-600">Trust & Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              Our platform is founded on rigorous standards of security, reliability, 
              and user experience that set new benchmarks in global logistics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center">
              <div className="relative mb-8">
                <img 
                  src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Security verification"
                  className="w-full h-64 object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-red-600/10 group-hover:bg-red-600/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 bg-white p-3 shadow-lg">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-light mb-6 text-gray-900">
                Maximum Security
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Comprehensive identity verification, secure payment processing, 
                and real-time tracking ensure complete protection for all parties.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8">
                <img 
                  src="https://images.pexels.com/photos/3483098/pexels-photo-3483098.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Cost savings"
                  className="w-full h-64 object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-red-600/10 group-hover:bg-red-600/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 bg-white p-3 shadow-lg">
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-light mb-6 text-gray-900">
                Exceptional Value
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Reduce shipping costs by up to 70% compared to traditional carriers 
                while maintaining premium service standards.
              </p>
            </div>
            
            <div className="group text-center">
              <div className="relative mb-8">
                <img 
                  src="https://images.pexels.com/photos/1309766/pexels-photo-1309766.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                  alt="Fast delivery"
                  className="w-full h-64 object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-red-600/10 group-hover:bg-red-600/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 bg-white p-3 shadow-lg">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-light mb-6 text-gray-900">
                Express Delivery
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Leverage existing flight schedules for rapid, reliable delivery 
                with personal care and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 text-sm font-medium mb-8 uppercase tracking-wide">
              <Globe className="w-4 h-4 mr-2" />
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Simple, Secure,
              <span className="block font-normal text-red-400">Efficient</span>
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20">
            {/* For Travelers */}
            <div className="space-y-12">
              <div className="flex items-center mb-12">
                <div className="bg-red-600 p-4 mr-6">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-light">For Travelers</h3>
              </div>
              
              <div className="space-y-12">
                <div className="flex items-start space-x-8 group">
                  <div className="bg-white text-gray-900 w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium mb-4 text-white">Register Your Journey</h4>
                    <p className="text-gray-300 leading-relaxed font-light">
                      Submit your travel itinerary with available baggage space. 
                      Our verification process ensures security and trust.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-8 group">
                  <div className="bg-white text-gray-900 w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium mb-4 text-white">Accept Requests</h4>
                    <p className="text-gray-300 leading-relaxed font-light">
                      Review and approve package requests that match your route 
                      and preferences. You maintain full control.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-8 group">
                  <div className="bg-white text-gray-900 w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium mb-4 text-white">Earn Rewards</h4>
                    <p className="text-gray-300 leading-relaxed font-light">
                      Receive compensation for successful deliveries while 
                      contributing to global connectivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* For Senders */}
            <div className="space-y-12">
              <div className="flex items-center mb-12">
                <div className="bg-red-600 p-4 mr-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-light">For Senders</h3>
              </div>
              
              <div className="space-y-12">
                <div className="flex items-start space-x-8 group">
                  <div className="bg-white text-gray-900 w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium mb-4 text-white">Find Your Traveler</h4>
                    <p className="text-gray-300 leading-relaxed font-light">
                      Search verified travelers heading to your destination. 
                      Compare profiles, ratings, and pricing.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-8 group">
                  <div className="bg-white text-gray-900 w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium mb-4 text-white">Secure Transaction</h4>
                    <p className="text-gray-300 leading-relaxed font-light">
                      Complete secure payment with escrow protection. 
                      Your funds are protected until delivery confirmation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-8 group">
                  <div className="bg-white text-gray-900 w-12 h-12 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                  <div className="pt-2">
                    <h4 className="text-xl font-medium mb-4 text-white">Track & Receive</h4>
                    <p className="text-gray-300 leading-relaxed font-light">
                      Monitor your package in real-time with GPS tracking 
                      and direct communication with your traveler.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Global community"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
              <div className="absolute inset-0 border-4 border-white shadow-xl"></div>
            </div>
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 text-sm font-medium mb-8 uppercase tracking-wide">
                <Users className="w-4 h-4 mr-2" />
                Global Community
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 leading-tight">
                Join a Network of
                <span className="block font-normal text-red-600">Trusted Partners</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                Connect with thousands of verified travelers and reliable senders 
                across six continents. Our community is built on trust, 
                transparency, and mutual benefit.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center p-6 bg-gray-50">
                  <div className="text-3xl font-light text-red-600 mb-2">50,000+</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide">Active Members</div>
                </div>
                <div className="text-center p-6 bg-gray-50">
                  <div className="text-3xl font-light text-red-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide">Support Available</div>
                </div>
              </div>

              <button className="bg-red-600 text-white px-8 py-4 font-medium hover:bg-red-700 transition-colors">
                JOIN OUR COMMUNITY
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Airport terminal"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium mb-8 uppercase tracking-wide">
            <GraduationCap className="w-4 h-4 mr-2" />
            Begin Your Journey
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light mb-8">
            Ready to Transform
            <span className="block font-normal text-red-400">Global Delivery?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of users who trust our platform for secure, 
            efficient, and cost-effective international package delivery.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={() => handleCTAClick('traveler')}
              className="group bg-red-600 text-white px-10 py-5 font-medium text-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-3 min-w-[280px]"
            >
              <Plane className="w-6 h-6" />
              <span>START AS TRAVELER</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => handleCTAClick('sender')}
              className="group bg-white text-gray-900 px-10 py-5 font-medium text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3 min-w-[280px]"
            >
              <Package className="w-6 h-6" />
              <span>SEND PACKAGE</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center text-gray-400">
            <p className="text-sm uppercase tracking-wide">✓ Free Registration • ✓ Secure Platform • ✓ 24/7 Support</p>
          </div>
        </div>
      </section>
    </div>
  );
}