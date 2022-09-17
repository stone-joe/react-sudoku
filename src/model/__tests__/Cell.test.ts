import { Cell } from '../Cell';

describe('Cell', () => {
  it('should validate the cell', () => {
    // setup
    const cell1 = new Cell({ row: 0, col: 0, value: 5, validators: [] });
    const cell2 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell3 = new Cell({ row: 0, col: 0, value: 1, validators: [cell1, cell2] });
    // test & verify
    expect(cell3).toHaveProperty('valid', false);
    // test updating
    cell2.value = 3;
    expect(cell3).toHaveProperty('valid', true);
  });
  it('should not validate the cell if atleast one value matches even after changing', () => {
    // setup
    const cell1 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell2 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell3 = new Cell({ row: 0, col: 0, value: 1, validators: [cell1, cell2] });
    // test
    cell2.value = 3;
    // verify
    expect(cell3).toHaveProperty('valid', false);
  });
  it('should allow setting of validators', () => {
    // setup
    const cell1 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell2 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell3 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    // test
    cell3.setValidators([cell1, cell2]);
    // verify
    expect(cell3).toHaveProperty('valid', false);
  });
  it('should clear the validators', () => {
    // setup
    const cell1 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell2 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    const cell3 = new Cell({ row: 0, col: 0, value: 1, validators: [] });
    // test
    cell3.setValidators([cell1, cell2]);
    cell3.clear();
    // verify
    expect(cell3).toHaveProperty('valid', true);
  });
});