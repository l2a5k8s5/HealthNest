import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRoutes } from './routes/userRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { publicRoutes } from './routes/index.js';



function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  // // Auto-fetch user profile if token exists
  // useEffect(() => {
  //   if (token && !user) {
  //     dispatch(getProfile());
  //   }
  // }, [token, user, dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* { Public Routes */}
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))} 

            {/* Protected User Routes */}
            {userRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}

            {/* Admin Routes
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))} */}

            {/* 404 Page */}
            <Route 
              path="*" 
              element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
                    <a href="/" className="btn-primary">Go Home</a>
                  </div>
                </div>
              } 
            />
          </Routes>
        </main>
        
        <Footer />
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;