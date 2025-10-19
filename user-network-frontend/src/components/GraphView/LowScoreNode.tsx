// LowScoreNode.tsx
import React, { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Link2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface LowScoreNodeProps {
  data: {
    label: string;
    age: number;
    score: number;
    user: any;
  };
}

export function LowScoreNode({ data }: LowScoreNodeProps) {
  const { addHobby } = useApp();
  const [showPulse, setShowPulse] = useState(false);
  const hasFriends = data.user?.friends?.length > 0;

  useEffect(() => {
    if (!hasFriends) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasFriends]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const hobby = e.dataTransfer.getData('application/hobby');
    if (hobby) addHobby(data.user.id, hobby);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Pulse animation for nodes without friends */}
      {!hasFriends && showPulse && (
        <>
          <div
            style={{
              position: 'absolute',
              top: -8,
              left: -8,
              right: -8,
              bottom: -8,
              border: '3px dashed #60a5fa',
              borderRadius: 12,
              animation: 'nodePulse 2s ease-in-out infinite',
              pointerEvents: 'none',
              zIndex: -1
            }}
          />
          <style>{`
            @keyframes nodePulse {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.05); }
            }
          `}</style>
        </>
      )}

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="card"
        style={{
          color: '#fff',
          background: 'linear-gradient(135deg,#60a5fa,#22d3ee)',
          border: '2px solid #bfdbfe',
          minWidth: 150,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(96, 165, 250, 0.3)',
          cursor: 'grab'
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: '#60a5fa' }} />
        <div className="card-title" style={{ color: '#fff', marginBottom: 4 }}>{data.label}</div>
        <div className="text-xs" style={{ opacity: 0.9 }}>Age: {data.age}</div>
        <div className="text-xs" style={{ fontWeight: 600, marginTop: 4 }}>
          Score: {(data.score || 0).toFixed(1)}
        </div>

        {/* No friends indicator */}
        {!hasFriends && (
          <div 
            className="row items-center gap-1"
            style={{ 
             marginTop: 8, 
              fontSize: 10, 
              opacity: 0.9,
              background: 'rgba(255,255,255,0.2)',
              padding: '4px 8px',
              borderRadius: 4
            }}
          >
            <Link2 style={{ width: 12, height: 12 }} />
            <span>No connections</span>
          </div>
        )}
        
        <Handle type="source" position={Position.Bottom} style={{ background: '#60a5fa' }} />
      </div>
    </div>
  );
}