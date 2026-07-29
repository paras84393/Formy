import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="text-9xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist
        </p>
        <Button
          variant="primary"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};