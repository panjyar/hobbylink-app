import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { UserPanel } from './components/UserPanel/UserPanel';
import { GraphView } from './components/GraphView/GraphView';
import { Sidebar } from './components/Sidebar/Sidebar';
import './index.css';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="app-full">
          <Header />
          <div className="flex-1 row overflow-hidden" style={{ position: 'relative' }}>
            <UserPanel />
            
            <div className="flex-1" style={{ position: 'relative' }}>
              <GraphView />
              
              {/* Floating Sidebar Toggle Button */}
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="btn btn-primary"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
                    animation: 'slideIn 0.3s ease'
                  }}
                  title="Show Hobbies Sidebar"
                >
                  <Menu style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span style={{ fontWeight: 600 }}>Hobbies</span>
                </button>
              )}
            </div>
            
            {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
          </div>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}