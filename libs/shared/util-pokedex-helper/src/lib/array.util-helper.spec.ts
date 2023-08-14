import { dividersOf } from "./array.util-helper";

describe('Array util helper', () => {
  it('should return 10 elements that are divisors of 5', () => {
    const dividersOf5: Array<number> = dividersOf(5);
    
    expect(dividersOf5.length).toBe(10);
  });
  
  it('should return array of elements that are divisors of 5', () => {
    const expectedElements = [5,10,15,20,25,30,35,40,45,50];
    const dividersOf5: Array<number> = dividersOf(5);

    expect(dividersOf5).toEqual(expectedElements);
  });
  
  it('should return all divisors of 2 until 100', () => {
    const dividersOf2: Array<number> = dividersOf(2, 100);

    expect(dividersOf2.length).toBe(50);
  });
  
  it('should return all divisors of 1', () => {
    const dividersOf1: Array<number> = dividersOf(1);

    expect(dividersOf1.length).toBe(50);
  });
  
  it('should return divisors of 0', () => {
    const dividersOf0: Array<number> = dividersOf(0);

    expect(dividersOf0.length).toBe(0);
  });
  
  it('should return divisors of -2', () => {
    const dividersOfN2: Array<number> = dividersOf(-2);

    expect(dividersOfN2.length).toBe(25);
  });
});