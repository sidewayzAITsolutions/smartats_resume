"use client";

import React, { useState, useEffect } from 'react';

const LogoSplashScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const hasShownSplash = sessionStorage.getItem('hasShownSplash');
    
    if (!hasShownSplash) {
      // Small delay before showing animation
      setTimeout(() => {
        setIsVisible(true);
      }, 100);

      // Start exit animation after 2.5 seconds
      setTimeout(() => {
        setIsExiting(true);
      }, 2500);

      // Remove splash screen after exit animation
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem('hasShownSplash', 'true');
      }, 3200);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      {/* Logo Container */}
      <div className={`relative z-10 transition-all duration-700 ${
        isExiting ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'
      }`}>
        {/* Outer ring animation */}
        <div className={`absolute inset-0 rounded-full border-4 border-teal-500/50 ${
          !isExiting ? 'animate-ping' : ''
        }`} />
        
        {/* Inner ring animation */}
        <div className={`absolute inset-0 rounded-full border-2 border-amber-500/50 animate-spin-slow`} />
        
        {/* Logo */}
        <div className={`relative w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-1 ${
          !isExiting ? 'animate-bounce-slow' : ''
        }`}>
          <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center">
            <img 
              src="/horse-logo.png" 
              alt="SmartATS Logo" 
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>

        {/* Welcome text */}
        <div className={`absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-all duration-500 ${
          isExiting ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-amber-400">
            Welcome to SmartATS
          </h2>
        </div>
      </div>

      {/* Particle effects */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-gradient-to-br from-teal-400 to-amber-400 rounded-full ${
            !isExiting ? 'animate-float' : 'animate-float-away'
          }`}
          style={{
            left: `${50 + 30 * Math.cos((i * Math.PI * 2) / 12)}%`,
            top: `${50 + 30 * Math.sin((i * Math.PI * 2) / 12)}%`,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(0, -20px) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes float-away {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--float-x, 100px), var(--float-y, -100px)) scale(0);
            opacity: 0;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-away {
          animation: float-away 0.7s ease-out forwards;
          --float-x: ${Math.random() * 200 - 100}px;
          --float-y: ${Math.random() * 200 - 100}px;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default LogoSplashScreen;
