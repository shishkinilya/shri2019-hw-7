import React from 'react';

import './username.scss';

interface UsernameProps {
  children: React.ReactNode;
}

export default function Username({ children }: UsernameProps) {
  return (
    <span className="Username">{children}</span>
  );
}
