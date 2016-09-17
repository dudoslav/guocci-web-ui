import {MemoryPipe} from './memory.pipe';

describe('MemoryPipe', () => {

  let pipe = new MemoryPipe();

  it('should transform 100 to 100 MB', () => {
    expect(pipe.transform(100)).toBe('100 MB');
  });

  it('should transform 1000 to 1 GB', () => {
    expect(pipe.transform(1000)).toBe('1 GB');
  });

  it('should transform 1000000 to 1 TB', () => {
    expect(pipe.transform(1000000)).toBe('1 TB');
  });

  it('should transform 1000000000 to 1000 TB', () => {
    expect(pipe.transform(1000000000)).toBe('1000 TB');
  });

  it('should transform -100 to -100 MB', () => {
    expect(pipe.transform(-100)).toBe('-100 MB');
  });

  it('should transform 0 to 0 MB', () => {
    expect(pipe.transform(0)).toBe('0 MB');
  });

});
