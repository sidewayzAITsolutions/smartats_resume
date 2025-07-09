// components/FeatureCard.jsx
import React from 'react';

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-[#F0F0F0] rounded-xl p-6 border border-[#D4A136]/30 hover:shadow-lg transition-all duration-300">
      <div className="w-12 h-12 bg-[#1A504B]/50 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#1A504B] mb-2">{title}</h3>
      <p className="text-[#1A504B]/70 text-sm">{description}</p>
      <button className="mt-4 px-4 py-2 bg-gradient-to-r from-[#1A504B] to-[#D4A136] text-[#F5E7CB] rounded-lg text-sm font-medium hover:shadow-md transition-all">
        Learn More
      </button>
    </div>
  );
};
