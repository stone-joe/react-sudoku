import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Controls } from './Controls';

export interface StartWindowProps {
  levels: string[];
  onSelect(level: string): void;
  show: boolean;
  children: any;
}

export function StartWindow({
  levels,
  onSelect,
  show,
  children
}: StartWindowProps) {
  const [showControls, setShowControls] = useState(false);
  return (
    <div className="start-window" role={'dialog'} hidden={!show}>
      <main>
        {children}
        <h3>Select a level to begin:</h3>
        <menu className="flex-column">
          {levels.map((level) => (
            <li key={level}>
              <Button variant="light" onClick={() => onSelect(level)}>
                {level[0].toUpperCase()}
                {level.slice(1)}
              </Button>
            </li>
          ))}
        </menu>
        <Controls show={showControls} />
        <Button
          className="close"
          hidden={!showControls}
          variant="light"
          onClick={() => setShowControls(false)}
        >
          <span className="fa-solid fa-times"></span>
        </Button>
      </main>
      <footer>
        <a
          href="https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/"
          target={'_blank'}
          rel="noreferrer"
        >
          <span>How to Play Sudoku</span>
          <span className="fa-solid fa-arrow-up-right-from-square"></span>
        </a>
        <a href="#controls" onClick={() => setShowControls(true)}>
          Controls
        </a>
      </footer>
    </div>
  );
}
