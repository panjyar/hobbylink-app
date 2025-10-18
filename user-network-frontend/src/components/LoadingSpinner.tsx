import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizePx: Record<typeof size, number> = {
    sm: 16,
    md: 32,
    lg: 48
  } as const;

  return (
    <div className="col items-center p-4" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div
        className="spinner"
        style={{ width: sizePx[size], height: sizePx[size] }}
      />
      {text && <p className="text-sm text-muted" style={{ marginTop: 8 }}>{text}</p>}
    </div>
  );
}