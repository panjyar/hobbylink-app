import React from 'react';
import { Handle, Position } from 'reactflow';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HighScoreNodeProps {
  data: {
    label: string;
    age: number;
    score: number;
    user: any;
  };
}

export function HighScoreNode({ data }: HighScoreNodeProps) {
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
        background: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
        border: '2px solid #c4b5fd',
        minWidth: 150,
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)'
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="row items-center gap-2 mb-4">
        <Sparkles className="icon-7" />
        <div className="card-title" style={{ color: '#fff' }}>{data.label}</div>
      </div>
      <div className="text-xs" style={{ opacity: 0.9 }}>Age: {data.age}</div>
      <div className="text-xs" style={{ fontWeight: 600, marginTop: 4 }}>
        Score: {(data.score || 0).toFixed(1)}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}