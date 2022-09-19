import React from 'react';

export interface ControlsProps {
  show: boolean;
}

export function Controls({ show }: ControlsProps) {
  return (
    <div className="controls" hidden={!show}>
      <section>
        <p>
          Select a box using the mouse or keyboard. Enter a number using the
          keypad. Invalid numbers will be highlighted red.
        </p>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <span className="key fa-solid fa-arrow-up"></span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">W</span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">,</span>
              </td>
              <td>Select box above</td>
            </tr>
            <tr>
              <td>
                <span className="key fa-solid fa-arrow-left"></span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">A</span>
              </td>
              <td>Select box to the left</td>
            </tr>
            <tr>
              <td>
                <span className="key fa-solid fa-arrow-down"></span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">S</span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">O</span>
              </td>
              <td>Select box below</td>
            </tr>
            <tr>
              <td>
                <span className="key fa-solid fa-arrow-right"></span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">D</span>
                <span>&nbsp;|&nbsp;</span>
                <span className="key">E</span>
              </td>
              <td>Select box to the right</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
