// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getFeaturedProducts } from '../redux/slices/productSlice';
// import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
// import ProductCard from '../components/products/ProductCard';
// import Loader from '../components/common/Loader';

// function Home() {
//   const dispatch = useDispatch();
//   const { featuredProducts, isLoading } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(getFeaturedProducts());
//   }, [dispatch]);

//   const categories = [
//     {
//       name: 'Makhana',
//       image: 'https://images.unsplash.com/photo-1599909533026-33ab99841cfd?w=400',
//       link: '/products?category=makhana',
//       description: '7 Delicious Flavours'
//     },
//     {
//       name: 'Dry Fruits',
//       image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
//       link: '/products?category=dry-fruits',
//       description: 'Premium Quality'
//     },
//     {
//       name: 'Honey',
//       image: 'https://images.unsplash.com/photo-1587049352846-4a222e784269?w=400',
//       link: '/products?category=honey',
//       description: '100% Pure & Natural'
//     },
//     {
//       name: 'Laddoos',
//       image: 'https://images.unsplash.com/photo-1606312619070-d48b4cff0e1f?w=400',
//       link: '/products?category=laddoo',
//       description: 'Traditional & Healthy'
//     },
//   ];

//   const benefits = [
//     'High in Protein & Fiber',
//     'Low in Calories',
//     'Gluten-Free & Vegan',
//     'No Artificial Flavors',
//     'Freshly Roasted',
//     '100% Natural'
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-primary-50 to-secondary-50 py-20">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
//                 Premium Quality
//                 <span className="text-primary-500"> Makhana</span>
//                 <br />& Dry Fruits
//               </h1>
//               <p className="text-xl text-gray-600 mb-8">
//                 Discover the perfect blend of taste and health with our premium roasted makhana, 
//                 organic dry fruits, and pure honey.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <Link to="/products" className="btn-primary">
//                   Shop Now <FiArrowRight className="inline ml-2" />
//                 </Link>
//                 <Link to="/about" className="btn-secondary">
//                   Learn More
//                 </Link>
//               </div>
//             </div>
//             <div className="relative">
//               <img 
//                 src="https://images.unsplash.com/photo-1599909533026-33ab99841cfd?w=600&h=600&fit=crop" 
//                 alt="Premium Makhana"
//                 className="rounded-2xl shadow-2xl"
//               />
//               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
//                 <p className="text-3xl font-bold text-primary-500">100+</p>
//                 <p className="text-gray-600">Happy Customers</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="py-20 bg-white">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
//               Browse Categories
//             </h2>
//             <p className="text-xl text-gray-600">
//               Explore our wide range of healthy and delicious products
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {categories.map((category) => (
//               <Link
//                 key={category.name}
//                 to={category.link}
//                 className="group card overflow-hidden"
//               >
//                 <div className="relative h-64 overflow-hidden">
//                   <img 
//                     src={category.image} 
//                     alt={category.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//                   <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                     <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
//                     <p className="text-sm text-gray-200">{category.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-20 bg-gray-50">
//         <div className="container-custom">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
//               Featured Products
//             </h2>
//             <p className="text-xl text-gray-600">
//               Our most popular and loved products
//             </p>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center">
//               <Loader />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {featuredProducts.slice(0, 8).map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           )}

//           <div className="text-center mt-12">
//             <Link to="/products" className="btn-primary">
//               View All Products <FiArrowRight className="inline ml-2" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-20 bg-white">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
//                 Why Choose Our Products?
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 We source the finest quality ingredients and process them with care to bring 
//                 you the healthiest and most delicious snacks.
//               </p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {benefits.map((benefit, index) => (
//                   <div key={index} className="flex items-center space-x-3">
//                     <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
//                     <span className="text-gray-700">{benefit}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <img 
//                 src="https://images.unsplash.com/photo-1587049352846-4a222e784269?w=600&h=600&fit=crop" 
//                 alt="Healthy Benefits"
//                 className="rounded-2xl shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
//         <div className="container-custom text-center">
//           <h2 className="text-4xl font-display font-bold mb-4">
//             Ready to Start Your Healthy Journey?
//           </h2>
//           <p className="text-xl mb-8 text-primary-50">
//             Order now and get your first purchase delivered with free shipping!
//           </p>
//           <Link to="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center">
//             Shop Now <FiArrowRight className="ml-2" />
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }


// export default Home;


import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProducts } from '../redux/slices/productSlice';
import { FiArrowRight, FiCheckCircle, FiTruck, FiShield, FiStar, FiHeart } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import Loader from '../components/common/Loader';

function Home() {
  const dispatch = useDispatch();
  const { featuredProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getFeaturedProducts());
  }, [dispatch]);

  const categories = [
    {
      name: 'Makhana',
      image: 'https://images.unsplash.com/photo-1599909533026-33ab99841cfd?w=400',
      link: '/products?category=makhana',
      description: '7 Delicious Flavours',
      color: 'from-amber-500 to-orange-500'
    },
    {
      name: 'Dry Fruits',
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
      link: '/products?category=dry-fruits',
      description: 'Premium Quality',
      color: 'from-yellow-500 to-amber-500'
    },
    {
      name: 'Honey',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784269?w=400',
      link: '/products?category=honey',
      description: '100% Pure & Natural',
      color: 'from-orange-400 to-yellow-500'
    },
    {
      name: 'Laddoos',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4cff0e1f?w=400',
      link: '/products?category=laddoo',
      description: 'Traditional & Healthy',
      color: 'from-red-400 to-orange-500'
    },
  ];

  const benefits = [
    'High in Protein & Fiber',
    'Low in Calories',
    'Gluten-Free & Vegan',
    'No Artificial Flavors',
    'Freshly Roasted',
    '100% Natural'
  ];

  const features = [
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: 'Free Shipping',
      description: 'On orders above ₹500'
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Quality Assured',
      description: '100% authentic products'
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Handpicked ingredients'
    },
    {
      icon: <FiHeart className="w-8 h-8" />,
      title: 'Made with Love',
      description: 'Traditional recipes'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Stunning Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white rounded-full opacity-40 animate-float animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-white rounded-full opacity-50 animate-float animation-delay-4000"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 animate-fadeIn">
                ✨ New Arrivals Available Now
              </div>
              <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight animate-slideUp">
                Taste the
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Goodness
                </span>
                of Nature
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-50 leading-relaxed animate-slideUp animation-delay-200">
                Premium roasted makhana, organic dry fruits, and pure honey - handpicked for your health and happiness.
              </p>
              <div className="flex flex-wrap gap-4 animate-slideUp animation-delay-400">
                <Link to="/products" className="group px-8 py-4 bg-white text-green-600 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-green-700 transition-all duration-300 shadow-2xl hover:shadow-yellow-300/50 hover:scale-105 flex items-center">
                  Shop Now 
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/about" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-green-600 transition-all duration-300 shadow-xl hover:scale-105">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative animate-fadeIn animation-delay-600">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1599909533026-33ab99841cfd?w=700&h=700&fit=crop" 
                  alt="Premium Makhana"
                  className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300">
                <p className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">500+</p>
                <p className="text-gray-600 font-semibold">Happy Customers</p>
              </div>
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-2xl z-20 hover:scale-110 transition-transform duration-300">
                <p className="text-4xl font-bold text-white">4.9⭐</p>
                <p className="text-white font-semibold">Rated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white shadow-xl relative z-20 -mt-20 mx-4 md:mx-12 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {features.map((feature, index) => (
            <div key={index} className="p-8 text-center hover:bg-green-50 transition-colors duration-300 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-gray-900 mb-4">
              Explore Our 
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover handpicked products that bring joy to your taste buds and wellness to your life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-75 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-3xl font-bold mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300">{category.name}</h3>
                    <p className="text-sm text-white/90 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-300">{category.description}</p>
                    <div className="mt-4 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      Explore Now <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"></div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-display font-bold text-gray-900 mb-4">
              Bestselling 
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our customers' favorites - tried, tested, and absolutely loved!
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 8).map((product, index) => (
                <div key={product._id} className="animate-fadeIn" style={{animationDelay: `${index * 50}ms`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link to="/products" className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-105">
              View All Products 
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section with Beautiful Background */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-display font-bold mb-6">
                Why Choose
                <span className="block text-yellow-300">HealthNest?</span>
              </h2>
              <p className="text-xl text-green-100 mb-10 leading-relaxed">
                We believe in delivering not just products, but a promise of health, taste, and quality that you can trust.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <FiCheckCircle className="w-7 h-7 text-yellow-300 flex-shrink-0 mt-1" />
                    <span className="text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1587049352846-4a222e784269?w=700&h=700&fit=crop" 
                  alt="Healthy Benefits"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Stunning Gradient */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000"></div>
          </div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-6xl font-display font-bold text-white mb-6 leading-tight">
            Ready to Start Your
            <span className="block">Healthy Journey?</span>
          </h2>
          <p className="text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
            Join thousands of happy customers who trust HealthNest for their daily wellness needs
          </p>
          <Link to="/products" className="group inline-flex items-center px-12 py-5 bg-white text-orange-600 rounded-full font-bold text-xl hover:bg-yellow-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-110">
            Shop Now 
            <FiArrowRight className="ml-3 text-2xl group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Home;