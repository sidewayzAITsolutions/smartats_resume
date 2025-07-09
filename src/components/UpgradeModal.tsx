import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Button } from '@/components/ui/Button'; // Assuming your Button component
import { X, Check } from 'lucide-react'; // IMPOTANT: Added 'Check' icon here

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  // Added props based on how it's used in app/builder/page.tsx
  feature?: string;
  remainingUses?: number;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({
  open,
  onClose,
  title = 'Upgrade to Pro',
  children,
  feature, // Destructure new prop
  remainingUses, // Destructure new prop
}) => {
  const router = useRouter(); // Initialize useRouter

  if (!open) return null; // Don't render if not open

  const handleUpgradeClick = () => {
    // Redirect to the pricing page when "Upgrade Now" is clicked
    router.push('/pricing');
    onClose(); // Close the modal after redirection
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md relative border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 p-1 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">{title}</h2>
        
        {/* Main Content Area */}
        <div className="mb-6 text-center">
          {children || ( // Render children if provided, otherwise default content
            (<>
              {/* Conditional message based on feature and remaining uses */}
              {remainingUses !== undefined && remainingUses <= 0 ? (
                <p className="mb-3 text-red-600 font-semibold">
                  You've used all your free {feature ? feature : 'features'}.
                </p>
              ) : (
                <p className="mb-3 text-gray-700">
                  Unlock premium features for an unparalleled experience!
                </p>
              )}
              <ul className="list-none space-y-2 text-left text-gray-700 text-sm mb-4 p-0">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  All premium templates
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Export as PDF & DOCX
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Unlimited resumes
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Email & chat support
                </li>
              </ul>
            </>)
          )}
        </div>

        {/* Upgrade Button */}
        <Button
          onClick={handleUpgradeClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg btn-modern" // Apply btn-modern for consistency
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default UpgradeModal;
