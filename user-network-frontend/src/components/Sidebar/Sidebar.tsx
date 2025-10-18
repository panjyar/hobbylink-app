import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useDebounce } from '../../hooks/useDebounce';

interface SidebarProps { 
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { state } = useApp();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filteredHobbies = state.allHobbies.filter(h => 
    h.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleDragStart = (hobby: string, e: React.DragEvent) => {
    e.dataTransfer.setData('application/hobby', hobby);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="panel-right overflow-y-auto">
      <div className="row items-center justify-between mb-4">
        <h3 className="text-sm font-bold row items-center gap-2">
          <Sparkles className="icon-7" />
          Hobbies
        </h3>
        {onClose && (
          <button className="btn btn-muted" aria-label="Close sidebar" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      
      <div className="input-group">
        <Search className="icon-search" />
        <input
          type="text"
          placeholder="Search hobbies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-search"
        />
      </div>

      <div className="space-y-2">
        {filteredHobbies.length === 0 ? (
          <div className="text-xs text-muted p-3">
            {state.allHobbies.length === 0 ? 'No hobbies available' : 'No matching hobbies'}
          </div>
        ) : (
          filteredHobbies.map(hobby => (
            <div
              key={hobby}
              draggable
              onDragStart={(e) => handleDragStart(hobby, e)}
              className="card"
              style={{ cursor: 'grab' }}
            >
              <span className="text-sm text-indigo">{hobby}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}