import React from 'react';
import { Handle, Position } from 'reactflow';
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

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const hobby = e.dataTransfer.getData('application/hobby');
    if (hobby) addHobby(data.user.id, hobby);
  };

  return (
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
        boxShadow: '0 4px 6px rgba(96, 165, 250, 0.3)'
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="card-title" style={{ color: '#fff', marginBottom: 4 }}>{data.label}</div>
      <div className="text-xs" style={{ opacity: 0.9 }}>Age: {data.age}</div>
      <div className="text-xs" style={{ fontWeight: 600, marginTop: 4 }}>
        Score: {(data.score || 0).toFixed(1)}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}