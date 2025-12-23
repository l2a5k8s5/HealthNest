import React from 'react';
import { FiHeart, FiUsers, FiTrendingUp, FiAward, FiShoppingBag, FiGlobe, FiTarget, FiZap, FiClock, FiPackage } from 'react-icons/fi';

function AboutUs() {
  const stats = [
    { icon: FiUsers, value: '50K+', label: 'Happy Customers' },
    { icon: FiShoppingBag, value: '100K+', label: 'Products Sold' },
    { icon: FiGlobe, value: '500+', label: 'Cities Served' },
    { icon: FiAward, value: '4.8/5', label: 'Customer Rating' }
  ];

  const values = [
    {
      icon: FiHeart,
      title: 'Quality First',
      description: 'We source only the finest premium makhana and health products, ensuring every product meets our strict quality standards.'
    },
    {
      icon: FiUsers,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We provide exceptional service and support at every step of your journey with us.'
    },
    {
      icon: FiTrendingUp,
      title: 'Continuous Growth',
      description: 'We constantly expand our product range and improve our services to bring you the best health and wellness solutions.'
    },
    {
      icon: FiZap,
      title: 'Fast & Reliable',
      description: 'Quick delivery, secure packaging, and reliable service ensure your products reach you fresh and on time.'
    }
  ];

  const timeline = [
    {
      year: '2018',
      title: 'The Beginning',
      description: 'Started as a small family business in Bihar, sourcing premium makhana directly from local farmers. Our first warehouse was just a small room with big dreams.',
      icon: '🌱'
    },
    {
      year: '2019',
      title: 'Going Digital',
      description: 'Launched our first e-commerce website, reaching customers beyond our local market. Expanded to 50+ cities across India with our online presence.',
      icon: '💻'
    },
    {
      year: '2020',
      title: 'Product Expansion',
      description: 'Despite challenges, we diversified our product range to include health foods, dry fruits, and wellness products. Established partnerships with 100+ farmers.',
      icon: '📦'
    },
    {
      year: '2021',
      title: 'Quality Certification',
      description: 'Received FSSAI certification and ISO quality standards. Opened our second warehouse and processing facility to meet growing demand.',
      icon: '⭐'
    },
    {
      year: '2022',
      title: 'Major Milestone',
      description: 'Crossed 25,000 happy customers and expanded to 300+ cities. Launched our mobile app for seamless shopping experience.',
      icon: '🚀'
    },
    {
      year: '2023',
      title: 'Pan-India Presence',
      description: 'Established distribution centers across major cities. Introduced subscription boxes and became one of India\'s trusted health snack brands.',
      icon: '🏆'
    },
    {
      year: '2024',
      title: 'Innovation & Growth',
      description: 'Launched new flavored makhana varieties, achieved 50K+ customer base, and introduced eco-friendly packaging. Partnering with 500+ local farmers.',
      icon: '🌟'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Amit Patel',
      role: 'Quality Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    },
    {
      name: 'Sneha Reddy',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1584949091598-c31daaaa4aa9?w=1600&h=900&fit=crop)',
            backgroundBlendMode: 'multiply'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About Makhana Multi
          </h1>
          <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for premium makhana and health products. Bringing wellness and quality to every home.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Our Story Section with Images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in <strong>2018</strong> with a passion for healthy living, Makhana Multi began as a humble family business in the heart of Bihar, India's makhana capital. Our founders, with generations of agricultural experience, recognized the untapped potential of this superfood.
              </p>
              <p>
                What started in a small room with just 10 kg of makhana has now transformed into a comprehensive e-commerce platform serving thousands of families nationwide. We work directly with over 500 local farmers, ensuring fair prices and sustainable farming practices.
              </p>
              <p>
                Our journey has been driven by one simple belief: everyone deserves access to premium, nutritious snacks and health products. From our modest beginnings to becoming one of India's trusted health snack brands, our commitment to quality, authenticity, and customer satisfaction remains unwavering.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
              alt="Premium Makhana"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <FiPackage className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100K+</div>
                  <div className="text-sm text-gray-600">Products Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&h=400&fit=crop"
              alt="Makhana Farming"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Sustainable Farming</h3>
              <p className="text-sm">Direct from farmers</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop"
              alt="Quality Processing"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Quality Processing</h3>
              <p className="text-sm">FSSAI certified facilities</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop"
              alt="Happy Customers"
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-bold">Happy Customers</h3>
              <p className="text-sm">50K+ families trust us</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white bg-opacity-20 rounded-full p-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-green-50 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Section - Our Journey */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Journey Through The Years
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From humble beginnings to becoming a trusted health brand
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-200 via-green-400 to-green-600"></div>

          {timeline.map((item, index) => (
            <div key={index} className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}>
              <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full items-center justify-center shadow-lg z-10 border-4 border-white">
                  <FiClock className="w-6 h-6 text-white" />
                </div>

                {/* Content Card */}
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-green-500">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{item.icon}</span>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in delivering excellence every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 shadow-lg relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
              alt="Our Mission"
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FiTarget className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To make healthy snacking accessible and affordable for everyone by providing premium quality makhana and health products, delivered with care and consistency. We empower local farmers and promote sustainable agriculture.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 shadow-lg relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop"
              alt="Our Vision"
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            />
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FiZap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become India's most trusted e-commerce platform for health and wellness products, inspiring millions to embrace healthier lifestyles through quality nutrition. We envision a future where healthy eating is the norm, not the exception.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section with Real Images */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dedicated people behind Makhana Multi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-2xl mb-4 transform group-hover:scale-105 transition duration-300 shadow-lg">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600 to-transparent opacity-0 group-hover:opacity-90 transition duration-300 flex items-end justify-center pb-6">
                    <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                      <p className="text-sm">Committed to Excellence</p>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 py-20 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&h=600&fit=crop"
          alt="Healthy Lifestyle"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Healthy Living Journey
          </h2>
          <p className="text-xl text-green-50 mb-8 leading-relaxed">
            Start shopping for premium makhana and health products today. Experience the difference quality makes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200">
              Shop Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;