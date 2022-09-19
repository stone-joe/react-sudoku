import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { StartWindow } from '../StartWindow';

describe('StartWindow', () => {
  it('should present the user with each option', () => {
    // setup
    const selectHandler = jest.fn();
    // test
    const { getByText, getByRole } = render(<StartWindow children={[]} levels={['easy', 'medium', 'hard']} show={true} onSelect={selectHandler} />);
    fireEvent.click(getByText('Easy'));
    fireEvent.click(getByText('Medium'));
    fireEvent.click(getByText('Hard'));
    // verify
    expect(getByRole('dialog')).toHaveStyle('display: block');
    expect(selectHandler).toHaveBeenCalledWith('easy');
    expect(selectHandler).toHaveBeenCalledWith('medium');
    expect(selectHandler).toHaveBeenCalledWith('hard');
  });
  it('should hide the window', () => {
    // test
    const { getByRole } = render(<StartWindow children={[]} levels={['easy', 'medium', 'hard']} show={false} onSelect={jest.fn()} />);
    // verify
    expect(getByRole('dialog', { hidden: true })).toHaveStyle('display: none');
  });
});