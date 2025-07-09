// lib/tracking.ts
export const trackEvent = (eventName: string, properties?: Record<string, string | number | boolean | null>) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Mixpanel (if using)
  if (typeof window !== 'undefined' && window.mixpanel) {
    window.mixpanel.track(eventName, properties);
  }
};

// Usage examples:
// trackEvent('resume_created', { template: 'professional' });
// trackEvent('ats_analysis_completed', { score: 85 });
// trackEvent('checkout_started', { plan: 'pro_monthly' });
// trackEvent('subscription_created', { plan: 'pro_monthly', revenue: 9.99 });
