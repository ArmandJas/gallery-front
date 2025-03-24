export class NumberValidator {
  public static isPositiveNumber(input: number) {
    return (input && input > 0);
  }
}
