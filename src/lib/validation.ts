// lib/validation.ts
import { z } from 'zod';

export const resumeDataSchema = z.object({
  personal: z.object({
    fullName: z.string().min(1, 'Full name is required').max(100),
    email: z.string().email('Invalid email address'),
    phone: z.string().max(20),
    location: z.string().max(100),
    linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
    title: z.string().max(100),
  }),
  summary: z.string().max(1000, 'Summary must be less than 1000 characters'),
  experience: z.array(z.object({
    id: z.string(),
    company: z.string().max(100),
    position: z.string().max(100),
    duration: z.string().max(50),
    description: z.string().max(1000),
    achievements: z.array(z.string().max(500)),
  })),
  education: z.array(z.object({
    id: z.string(),
    school: z.string().max(100),
    degree: z.string().max(100),
    year: z.string().max(10),
  })),
  skills: z.array(z.string().max(50)),
  targetRole: z.string().max(100),
  targetKeywords: z.array(z.string().max(50)),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general'], {
    required_error: 'Please select a feedback type',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  email: z.string().email('Invalid email address').optional(),
});
