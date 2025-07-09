# SmartATS Resume Setup Guide

This guide will help you set up the SmartATS Resume project for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Git**
- A code editor (VS Code recommended)

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sidewayzAITsolutions/SmartATS-Resume.git
cd SmartATS-Resume
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in the required environment variables:

#### Supabase Setup
1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your project URL and anon key from Settings > API
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

#### OpenAI Setup
1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

#### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

#### Stripe Setup (Optional for payments)
1. Create a [Stripe](https://stripe.com) account
2. Get your API keys from the dashboard
3. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

### 4. Database Setup

#### Supabase Database Schema

Run the following SQL in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  template_id TEXT,
  ats_score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create templates table
CREATE TABLE templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  preview_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own resumes" ON resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own resumes" ON resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON resumes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own resumes" ON resumes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Templates are viewable by everyone" ON templates
  FOR SELECT USING (true);
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Workflow

### Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── builder/           # Resume builder
│   └── ...
├── components/            # React components
├── lib/                   # Utility libraries
├── utils/                 # Helper functions
└── types/                 # TypeScript definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Write meaningful commit messages

### Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env.local` is in the root directory
   - Restart the development server after changes
   - Check for typos in variable names

2. **Supabase Connection Issues**
   - Verify URL and keys are correct
   - Check if RLS policies are properly set up
   - Ensure database tables exist

3. **Build Errors**
   - Clear Next.js cache: `rm -rf .next`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

4. **TypeScript Errors**
   - Run `npm run type-check` to see all errors
   - Ensure all dependencies have type definitions

### Getting Help

- Check existing [GitHub Issues](https://github.com/sidewayzAITsolutions/SmartATS-Resume/issues)
- Create a new issue with detailed information
- Contact maintainers at dev@smartats.com

## Next Steps

After setup:

1. Explore the codebase
2. Read the [API Documentation](API.md)
3. Check out the [Component Guide](COMPONENTS.md)
4. Review the [Contributing Guidelines](../CONTRIBUTING.md)

Happy coding! 🚀
