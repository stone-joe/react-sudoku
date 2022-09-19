import React from 'react';
import '../confetti.scss';

export interface ConfettiProps {
  show: boolean;
}

export function Confetti({ show = false }) {
  return show ? (
    <>
      {new Array(149).fill(0).map((n, i) => (
        <div key={i} className={`confetti-${i}`} />
      ))}
    </>
  ) : null;
}
