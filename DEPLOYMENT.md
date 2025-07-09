# SmartATS Resume Builder - Deployment Guide

This guide covers deploying the SmartATS Resume Builder to various platforms and environments.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sidewayzAITsolutions/SmartATS-Resume)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/sidewayzAITsolutions/SmartATS-Resume)

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created and configured
- [ ] Stripe account set up with products and webhooks
- [ ] Environment variables prepared
- [ ] Domain name configured (if using custom domain)
- [ ] SSL certificate ready (for custom domains)

## 🌐 Vercel Deployment (Recommended)

### Step 1: Prepare Your Repository
```bash
# Clone and prepare the repository
git clone https://github.com/sidewayzAITsolutions/SmartATS-Resume.git
cd SmartATS-Resume

# Install dependencies and test locally
npm install
npm run build
npm run dev
```

### Step 2: Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings (auto-detected for Next.js)

### Step 3: Configure Environment Variables
In Vercel Dashboard > Settings > Environment Variables, add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Test your deployment

### Step 5: Configure Custom Domain (Optional)
1. Go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## 🐳 Docker Deployment

### Local Docker Build
```bash
# Build the Docker image
docker build -t smartats-resume .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_service_role_key \
  -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key \
  -e STRIPE_SECRET_KEY=your_stripe_secret \
  -e STRIPE_WEBHOOK_SECRET=your_webhook_secret \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  smartats-resume
```

### Docker Compose
```bash
# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Production Docker Deployment
```bash
# Build for production
docker build -t smartats-resume:latest .

# Tag for registry
docker tag smartats-resume:latest your-registry/smartats-resume:latest

# Push to registry
docker push your-registry/smartats-resume:latest

# Deploy on server
docker run -d \
  --name smartats-resume \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env.production \
  your-registry/smartats-resume:latest
```

## ☁️ AWS Deployment

### AWS Amplify
1. Connect your GitHub repository to AWS Amplify
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
3. Add environment variables in Amplify Console
4. Deploy

### AWS ECS (Container Service)
1. Push Docker image to ECR
2. Create ECS task definition
3. Configure service with load balancer
4. Set up auto-scaling

## 🔧 Database Setup

### Supabase Configuration
1. Create new Supabase project
2. Run database migrations:
   ```sql
   -- Copy and paste contents of database/migrations/001_initial_schema.sql
   -- into Supabase SQL Editor
   ```
3. Configure authentication providers
4. Set up Row Level Security policies
5. Update environment variables

### Database Migration Commands
```bash
# If using Supabase CLI
supabase db reset
supabase db push

# Manual migration
# Copy SQL from database/migrations/ and run in Supabase SQL Editor
```

## 💳 Stripe Configuration

### Webhook Setup
1. Go to Stripe Dashboard > Webhooks
2. Create new webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy webhook secret to environment variables

### Product Setup
1. Create products in Stripe Dashboard
2. Set up pricing:
   - Pro Monthly: $19.99/month
   - Pro Yearly: $199.99/year (optional)
3. Copy price IDs to environment variables

## 🔒 Security Configuration

### Environment Variables Security
- Use different keys for development and production
- Rotate API keys regularly
- Never commit secrets to version control
- Use secure secret management in production

### HTTPS Configuration
- Always use HTTPS in production
- Configure SSL certificates
- Set up proper security headers
- Enable HSTS

### Content Security Policy
Add to your deployment configuration:
```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' *.supabase.co *.stripe.com;"
  }
];
```

## 📊 Monitoring & Analytics

### Error Monitoring
```bash
# Add Sentry for error tracking
npm install @sentry/nextjs

# Configure in next.config.js
```

### Performance Monitoring
- Set up Vercel Analytics
- Configure Google Analytics
- Monitor Core Web Vitals
- Set up uptime monitoring

### Logging
```javascript
// Configure structured logging
const logger = {
  info: (message, meta) => console.log(JSON.stringify({ level: 'info', message, meta, timestamp: new Date().toISOString() })),
  error: (message, error) => console.error(JSON.stringify({ level: 'error', message, error: error.message, stack: error.stack, timestamp: new Date().toISOString() }))
};
```

## 🧪 Testing Deployment

### Pre-deployment Tests
```bash
# Run all tests
npm run test

# Build test
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### Post-deployment Tests
1. **Functionality Tests**
   - User registration/login
   - Resume creation and editing
   - PDF export
   - Premium upgrade flow
   - Logout functionality

2. **Performance Tests**
   - Page load times
   - Lighthouse scores
   - Core Web Vitals

3. **Security Tests**
   - HTTPS enforcement
   - Security headers
   - Authentication flows

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🆘 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Environment Variable Issues**
- Check variable names for typos
- Ensure all required variables are set
- Verify API keys are valid

**Database Connection Issues**
- Check Supabase URL and keys
- Verify RLS policies
- Test database connectivity

**Stripe Webhook Issues**
- Verify webhook URL is accessible
- Check webhook secret
- Test webhook endpoint manually

### Support Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

---

For additional help with deployment, please create an issue in the GitHub repository or contact support@smartats.com.

## 📚 Additional Resources

- [API Documentation](./API.md) - Complete API reference
- [Database Schema](./database/migrations/001_initial_schema.sql) - Database structure
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- [Security Guide](./SECURITY.md) - Security best practices
