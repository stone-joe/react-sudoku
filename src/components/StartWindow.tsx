import React from 'react';

export interface StartWindowProps {
    levels: string[];
    onSelect(level: string): void;
    show: boolean;
}

export function StartWindow({ levels, onSelect, show }: StartWindowProps) {
    return (
        <div className="start-window" role={'alert'} hidden={!show}>
            <h3>Select a level to begin the game:</h3>
            {levels.map(level => (
                <button key={level} onClick={() => onSelect(level)}>{level[0].toUpperCase()}{level.slice(1)}</button>
            ))}
        </div>
    );
}