-- =============================================================================
-- SmartATS Resume Builder - Initial Database Schema
-- =============================================================================
-- This file contains the initial database schema for the SmartATS Resume Builder
-- Run this in your Supabase SQL editor to set up the database

-- =============================================================================
-- 1. PROFILES TABLE
-- =============================================================================
-- Stores user profile information and premium status

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Premium subscription fields
  is_premium BOOLEAN DEFAULT FALSE,
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'unpaid', 'incomplete', 'incomplete_expired', 'trialing')),
  
  -- Stripe integration fields
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 2. RESUMES TABLE
-- =============================================================================
-- Stores user resume data

CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Resume metadata
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template_id TEXT NOT NULL DEFAULT 'professional',
  
  -- Resume content (stored as JSONB for flexibility)
  content JSONB NOT NULL DEFAULT '{}',
  
  -- ATS analysis data
  ats_score INTEGER DEFAULT 0 CHECK (ats_score >= 0 AND ats_score <= 100),
  ats_analysis JSONB DEFAULT '{}',
  
  -- Metadata
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 3. RESUME_VERSIONS TABLE
-- =============================================================================
-- Stores version history of resumes

CREATE TABLE IF NOT EXISTS resume_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id UUID REFERENCES resumes ON DELETE CASCADE NOT NULL,
  
  -- Version data
  version_number INTEGER NOT NULL,
  content JSONB NOT NULL,
  ats_score INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 4. TEMPLATES TABLE
-- =============================================================================
-- Stores available resume templates

CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  
  -- Template configuration
  is_premium BOOLEAN DEFAULT FALSE,
  preview_image_url TEXT,
  template_config JSONB DEFAULT '{}',
  
  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 5. USER_ANALYTICS TABLE
-- =============================================================================
-- Stores user analytics and usage data

CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Event data
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================================================
-- 6. INDEXES
-- =============================================================================
-- Create indexes for better query performance

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_profiles_is_premium ON profiles(is_premium);

-- Resumes indexes
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_template_id ON resumes(template_id);
CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resumes_ats_score ON resumes(ats_score DESC);

-- Resume versions indexes
CREATE INDEX IF NOT EXISTS idx_resume_versions_resume_id ON resume_versions(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_versions_created_at ON resume_versions(created_at DESC);

-- Templates indexes
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_templates_is_premium ON templates(is_premium);
CREATE INDEX IF NOT EXISTS idx_templates_is_active ON templates(is_active);
CREATE INDEX IF NOT EXISTS idx_templates_sort_order ON templates(sort_order);

-- User analytics indexes
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_event_type ON user_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_user_analytics_created_at ON user_analytics(created_at DESC);

-- =============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Enable RLS and create security policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Resumes policies
CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

-- Resume versions policies
CREATE POLICY "Users can view own resume versions" ON resume_versions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_versions.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own resume versions" ON resume_versions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM resumes 
      WHERE resumes.id = resume_versions.resume_id 
      AND resumes.user_id = auth.uid()
    )
  );

-- Templates policies (public read access)
CREATE POLICY "Anyone can view active templates" ON templates
  FOR SELECT USING (is_active = true);

-- User analytics policies
CREATE POLICY "Users can view own analytics" ON user_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics" ON user_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- 8. FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- 9. INITIAL DATA
-- =============================================================================
-- Insert default templates

INSERT INTO templates (id, name, description, category, is_premium, sort_order) VALUES
  ('professional', 'Professional', 'Clean and professional template perfect for corporate roles', 'business', false, 1),
  ('modern', 'Modern', 'Contemporary design with a fresh look', 'creative', false, 2),
  ('executive', 'Executive', 'Sophisticated template for senior positions', 'business', false, 3),
  ('creative', 'Creative', 'Bold and creative design for artistic roles', 'creative', true, 4),
  ('technical', 'Technical', 'Optimized for technical and engineering roles', 'technical', false, 5),
  ('executive-elite', 'Executive Elite', 'Premium template for C-level executives', 'business', true, 6),
  ('startup-founder', 'Startup Founder', 'Dynamic template for entrepreneurs', 'business', true, 7),
  ('designer-pro', 'Designer Pro', 'Premium template for design professionals', 'creative', true, 8)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- SETUP COMPLETE
-- =============================================================================
-- Your database is now ready for the SmartATS Resume Builder!
-- 
-- Next steps:
-- 1. Configure authentication providers in Supabase Auth settings
-- 2. Set up Stripe webhook integration
-- 3. Update your environment variables
-- 4. Test the application
-- =============================================================================
