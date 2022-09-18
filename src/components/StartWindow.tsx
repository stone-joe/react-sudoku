import React from 'react';

export interface StartWindowProps {
    levels: string[];
    onSelect(level: string): void;
    show: boolean;
}

export function StartWindow({ levels, onSelect, show }: StartWindowProps) {
    return (
        <div className="start-window" hidden={!show}>
            {levels.map(level => (
                <button key={level} onClick={() => onSelect(level)}>{level}</button>
            ))}
        </div>
    );
}