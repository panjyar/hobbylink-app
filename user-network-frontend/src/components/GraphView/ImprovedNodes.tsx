// ImprovedNodes.tsx
import React, { useEffect, useState } from 'react';
import { Link2, ArrowRight } from 'lucide-react';

interface ConnectionInstructionsProps {
  show: boolean;
  onDismiss: () => void;
}

export function ConnectionInstructions({ show, onDismiss }: ConnectionInstructionsProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease-out'
        }}
        onClick={onDismiss}
      />

      {/* Instructions Modal */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, rgba(69, 138, 95, 0.95))',
          padding: '2rem',
          borderRadius: 16,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          maxWidth: 420,
          width: '90%',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease-out',
          color: '#fff'
        }}
      >
        <style>{`
          @keyframes slideIn {
            from { opacity: 0; transform: translate(-50%, -45%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Link2 style={{ width: 24, height: 24 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              Connect Users
            </h3>
          </div>
          
          <div style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.95 }}>
            <p style={{ margin: '0 0 1rem 0' }}>
              Create connections between users to build your network:
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: 8, marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  background: '#fff', 
                  color: '#3a855cff', 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  flexShrink: 0
                }}>1</div>
                <span>Click and drag from one user node</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ 
                  background: '#fff', 
                  color: '#3a6d53ff', 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  flexShrink: 0
                }}>2</div>
                <span>Drop on another user to connect them</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  background: '#fff', 
                  color: '#8b5cf6', 
                  width: 24, 
                  height: 24, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  flexShrink: 0
                }}>3</div>
                <span>Watch the connection appear!</span>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(255,255,255,0.1)', 
              padding: '0.75rem', 
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span>💡</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Pro Tips:</div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8rem', lineHeight: 1.6 }}>
                    <li>More connections = Higher popularity score</li>
                    <li>Drag hobbies from sidebar to users</li>
                    <li>Users with similar hobbies make great friends!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#fff',
            color: '#317241ff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Got it! Let's connect 
        </button>
      </div>
    </>
  );
}

export function EmptyStateOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        maxWidth: 400,
        padding: '2rem',
        zIndex: 10
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          margin: '0 auto 1.5rem',
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'bounce 2s ease-in-out infinite'
        }}
      >
        <Link2 style={{ width: 40, height: 40, color: '#fff' }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1f2937' }}>
        No Connections Yet
      </h3>
      
      <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Start building your network by connecting users together. Drag from one user to another to create friendships!
      </p>

      <div
        style={{
          background: '#f3f4f6',
          padding: '1rem',
          borderRadius: 8,
          fontSize: '0.875rem',
          color: '#4b5563',
          textAlign: 'left'
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowRight style={{ width: 16, height: 16 }} />
          Quick Tips:
        </div>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li>Drag from one node to another to connect</li>
          <li>Higher connections = Higher popularity score</li>
          <li>Drag hobbies from the sidebar to users</li>
        </ul>
      </div>
    </div>
  );
}