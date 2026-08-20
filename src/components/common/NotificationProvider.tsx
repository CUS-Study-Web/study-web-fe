import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationState {
  isOpen: boolean;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationState>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const showNotification = useCallback((message: string, type: NotificationType) => {
    setNotification({ isOpen: true, message, type });
  }, []);

  const showSuccess = useCallback((message: string) => {
    showNotification(message, 'success');
  }, [showNotification]);

  const showError = useCallback((message: string) => {
    showNotification(message, 'error');
  }, [showNotification]);

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, isOpen: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.isOpen, notification.message, notification.type]);

  return (
    <NotificationContext.Provider value={{ showSuccess, showError }}>
      {children}
      {notification.isOpen && (
        <div
          className="fixed bottom-6 left-6 z-50 min-w-[320px] max-w-[400px] bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden"
          style={{
            animation: 'slideInBottomLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div className="relative p-4 pb-5 flex items-start">
            <div
              onClick={() => setNotification(prev => ({ ...prev, isOpen: false }))}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div className="mr-3 mt-0.5 flex-shrink-0">
              {notification.type === 'success' ? (
                <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#f87171] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex-1 pr-4">
              <div className={`font-bold text-[15px] mb-1 ${notification.type === 'success' ? 'text-[#10b981]' : 'text-[#f87171]'}`}>
                {notification.type === 'success' ? 'Thành công' : 'Đã xảy ra lỗi'}
              </div>
              <div className="text-[14px] text-gray-600 leading-snug font-medium">
                {notification.message}
              </div>
            </div>
          </div>

          <div className="h-[3px] w-full bg-gray-100 absolute bottom-0 left-0">
            <div
              className={`h-full ${notification.type === 'success' ? 'bg-[#10b981]' : 'bg-[#f87171]'}`}
              style={{
                animation: 'progressShrink 3s linear forwards'
              }}
            />
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes slideInBottomLeft {
            from {
              opacity: 0;
              transform: translateY(20px) translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0) translateX(0);
            }
          }
          @keyframes progressShrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </NotificationContext.Provider>
  );
};
