// src/components/ResumeBuilder/PersonalInfoForm.tsx
'use client';
import React, { useState } from 'react';
import { PersonalInfo } from '@/types/resume';
import { Button } from '@/components/ui/Button';

interface PersonalInfoFormProps {
  initialData: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ initialData, onUpdate }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
<input
  type="text"
  value={formData.fullName}
  onChange={(e) => handleChange('fullName', e.target.value)}
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sleek-input"
  placeholder="John Doe"
  required
/>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sleek-input" // Apply sleek-input
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sleek-input" // Apply sleek-input
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sleek-input" // Apply sleek-input
            placeholder="New York, NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            value={formData.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sleek-input" // Apply sleek-input
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Portfolio Website
          </label>
          <input
            type="url"
            value={formData.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent sleek-input" // Apply sleek-input
            placeholder="https://johndoe.com"
          />
        </div>
      </div>
    </div>
  );
}
