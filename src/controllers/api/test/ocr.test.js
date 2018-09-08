import { expect } from 'chai';
import someFunc from '../someFunc';

describe('[someFunc.js] Test cases', () => {
  it('Should return \'from the other side!\'', () => {
    expect(someFunc()).to.equal('from the other side!');
  });
});
