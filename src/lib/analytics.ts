// lib/analytics.ts
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      custom_parameter_1: properties.value,
      ...properties,
    });
  }
  
  // Also send to your database for internal analytics
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventName, properties }),
  });
}
