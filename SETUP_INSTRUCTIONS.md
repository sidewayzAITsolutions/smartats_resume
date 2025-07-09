# 🚀 SmartATS Resume Builder - Quick Setup Instructions

## ❗ IMPORTANT: Fix the Supabase Client Error

The error you're experiencing when clicking "Build" on the landing page is due to missing Supabase environment variables. Here's how to fix it:

## 🔧 Step 1: Create Environment Variables File

1. **Copy the environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit the `.env.local` file** with your actual credentials:
   ```bash
   nano .env.local
   # or use your preferred editor
   ```

## 🗄️ Step 2: Set Up Supabase (Required)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Wait for the project to be ready (2-3 minutes)

### Get Your Supabase Credentials
1. In your Supabase dashboard, go to **Settings > API**
2. Copy the following values to your `.env.local`:

```env
# Replace these with your actual Supabase values
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `database/migrations/001_initial_schema.sql`
3. Click "Run" to create all tables and policies

## 💳 Step 3: Set Up Stripe (For Premium Features)

### Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create an account
3. Go to **Developers > API keys**

### Get Stripe Keys
```env
# Add these to your .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Create Products in Stripe
1. Go to **Products** in Stripe dashboard
2. Create a product called "Pro Plan Monthly"
3. Set price to $19.99/month
4. Copy the price ID to your `.env.local`:
```env
STRIPE_PRICE_ID_PRO_MONTHLY=price_your_price_id_here
```

## 🔗 Step 4: Configure OAuth (Optional)

For Google OAuth login, add these to `.env.local`:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🌐 Step 5: Set Application URL

```env
# For development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🚀 Step 6: Start the Application

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

## ✅ Step 7: Test the Fix

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Build" or "Get Started" on the landing page
3. You should now be redirected to the login page without errors
4. Try creating an account or logging in

## 🔍 Troubleshooting

### If you still see Supabase errors:

1. **Check your `.env.local` file exists** in the root directory
2. **Verify the environment variables** are correctly set
3. **Restart the development server** after changing environment variables:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Make sure `.env.local` exists and has the correct Supabase URL and keys

2. **"Configuration error"**
   - Double-check your Supabase project URL and API keys
   - Make sure there are no extra spaces or quotes in the `.env.local` file

3. **Database errors**
   - Run the database migration SQL in Supabase SQL Editor
   - Check that RLS policies are enabled

### Development Mode Features:

- The app will show helpful error messages in development mode
- Debug information is available for OAuth issues
- Mock Supabase client prevents crashes when environment variables are missing

## 📞 Need Help?

If you're still experiencing issues:

1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Make sure the Supabase project is active and accessible
4. Try creating a fresh `.env.local` file from the template

## 🎯 Minimal Working Configuration

For a quick test, you only need these essential variables:

```env
# Minimum required for basic functionality
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Once these are set, the landing page navigation should work correctly!

---

**After completing these steps, the "Build" button on your landing page should work perfectly and redirect you to the login page without any Supabase client errors.** 🎉
