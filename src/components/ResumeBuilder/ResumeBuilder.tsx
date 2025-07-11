// components/ResumeBuilder.tsx
import { useEffect, useState } from 'react';
import { useSupabase } from '@/hooks/useSupabase';
import { useUsageTracking, UsageAction } from '@/lib/usage-tracking';
import { toast } from 'react-hot-toast';

export function ResumeBuilder() {
  const supabase = useSupabase();
  const usageTracking = useUsageTracking(supabase);
  const [isSaving, setIsSaving] = useState(false);
  const [sessionInterval, setSessionInterval] = useState<NodeJS.Timeout | null>(null);

  // Initialize usage tracking and session management
  useEffect(() => {
    const init = async () => {
      await usageTracking.initialize();
      
      // Set up session refresh interval
      const interval = setInterval(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.refreshSession();
        }
      }, 20 * 60 * 1000); // Refresh every 20 minutes
      
      setSessionInterval(interval);
    };

    init();

    return () => {
      if (sessionInterval) {
        clearInterval(sessionInterval);
      }
    };
  }, []);

  // Enhanced save function with usage tracking
  const handleSave = async (resumeData: any) => {
    try {
      setIsSaving(true);

      // Check if user can perform save action
      const canSave = await usageTracking.canPerformAction(UsageAction.RESUME_SAVE);
      
      if (!canSave) {
        const remaining = await usageTracking.getRemainingUses(UsageAction.RESUME_SAVE);
        toast.error(`Daily save limit reached. Upgrade to Premium for unlimited saves!`);
        
        // Show upgrade modal here
        showUpgradeModal();
        return;
      }

      // Refresh session before save to prevent timeout
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        toast.error('Session expired. Please log in again.');
        // Redirect to login
        return;
      }

      // Save resume data
      const { data, error } = await supabase
        .from('resumes')
        .upsert({
          user_id: session.user.id,
          data: resumeData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Track the usage
      await usageTracking.trackUsage(UsageAction.RESUME_SAVE, {
        resume_id: data.id,
        template: resumeData.template,
        sections_updated: Object.keys(resumeData).length
      });

      // Show remaining uses for free users
      const remaining = await usageTracking.getRemainingUses(UsageAction.RESUME_SAVE);
      if (remaining !== null && remaining > 0) {
        toast.success(`Resume saved! ${remaining} saves remaining today.`);
      } else {
        toast.success('Resume saved successfully!');
      }

    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save resume. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // ATS Scoring with usage tracking
  const handleATSScore = async () => {
    try {
      // Check if user can perform ATS scan
      const canScan = await usageTracking.canPerformAction(UsageAction.ATS_SCAN);
      
      if (!canScan) {
        const remaining = await usageTracking.getRemainingUses(UsageAction.ATS_SCAN);
        toast.error(`Daily ATS scan limit reached. Upgrade to Premium for unlimited scans!`);
        showUpgradeModal();
        return;
      }

      // Perform ATS scoring
      const score = await calculateATSScore();

      // Track the usage
      await usageTracking.trackUsage(UsageAction.ATS_SCAN, {
        score: score,
        timestamp: new Date().toISOString()
      });

      // Show remaining uses
      const remaining = await usageTracking.getRemainingUses(UsageAction.ATS_SCAN);
      if (remaining !== null) {
        toast.success(`ATS Score: ${score}%. ${remaining} scans remaining today.`);
      }

    } catch (error) {
      console.error('ATS scoring error:', error);
      toast.error('Failed to calculate ATS score.');
    }
  };

  // Usage display component
  const UsageLimitDisplay = ({ action }: { action: UsageAction }) => {
    const [remaining, setRemaining] = useState<number | null>(null);
    
    useEffect(() => {
      const fetchRemaining = async () => {
        const count = await usageTracking.getRemainingUses(action);
        setRemaining(count);
      };
      fetchRemaining();
    }, [action]);

    if (remaining === null) return null; // Premium user or unlimited

    return (
      <div className="text-sm text-gray-600">
        {remaining} {action.replace('_', ' ')}s remaining today
      </div>
    );
  };

  // Auto-save with debouncing
  const autoSave = useDebounce(async (data: any) => {
    if (!isSaving) {
      await handleSave(data);
    }
  }, 30000); // Auto-save every 30 seconds

  return (
    <div className="resume-builder">
      {/* Usage limits display */}
      <div className="usage-limits mb-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Daily Limits</h3>
        <div className="space-y-1">
          <UsageLimitDisplay action={UsageAction.RESUME_SAVE} />
          <UsageLimitDisplay action={UsageAction.ATS_SCAN} />
          <UsageLimitDisplay action={UsageAction.PDF_DOWNLOAD} />
        </div>
      </div>

      {/* Your existing resume builder UI */}
      
      {/* Save button with loading state */}
      <button
        onClick={() => handleSave(resumeData)}
        disabled={isSaving}
        className="save-button"
      >
        {isSaving ? 'Saving...' : 'Save Resume'}
      </button>
    </div>
  );
}

// Utility function for debouncing
function useDebounce(func: Function, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export ResumeBuilder;