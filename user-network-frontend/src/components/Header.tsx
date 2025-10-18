import React from 'react';
import { UserPlus } from 'lucide-react';

export function Header() {
  return (
    <header className="header">
      <h1 className="header-title">
        <UserPlus className="icon-7" />
        Interactive User Network
      </h1>
    </header>
  );
}