import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';

interface UndoRedoControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function UndoRedoControls({ onUndo, onRedo, canUndo, canRedo }: UndoRedoControlsProps) {
  return (
    <div className="flex gap-2 p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`p-2 rounded-lg transition-colors ${
          canUndo 
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }`}
        title="Undo last action"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`p-2 rounded-lg transition-colors ${
          canRedo 
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
        }`}
        title="Redo last undone action"
      >
        <Redo2 className="w-4 h-4" />
      </button>
    </div>
  );
}
