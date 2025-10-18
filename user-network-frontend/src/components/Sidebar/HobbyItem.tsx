import React from 'react';

interface HobbyItemProps {
  hobby: string;
  onDragStart: (hobby: string) => void;
  onDrop: (userId: string) => void;
}

export function HobbyItem({ hobby, onDragStart, onDrop }: HobbyItemProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(hobby)}
      className="card"
    >
      <span className="text-sm text-indigo">{hobby}</span>
    </div>
  );
}
