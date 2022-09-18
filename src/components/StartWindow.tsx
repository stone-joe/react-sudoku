import React from 'react';
import { Confetti } from './Confetti';

export interface StartWindowProps {
    levels: string[];
    onSelect(level: string): void;
    show: boolean;
    complete: boolean;
}

export function StartWindow({ levels, onSelect, show, complete = false }: StartWindowProps) {
    return (
        <>
            <Confetti show={complete} />
            <div className="start-window" role={'alert'} hidden={!show}>
                <h3>
                    <pre>
                        {
                            !complete ?
                                'Select a level to begin:'
                                :
                                'Great job! You did it!\nSelect a level to start a new game:'
                        }
                    </pre>
                </h3>
                {levels.map(level => (
                    <button key={level} onClick={() => onSelect(level)}>{level[0].toUpperCase()}{level.slice(1)}</button>
                ))}
            </div>
        </>
    );
}