import assert from 'assert';

class Calculator {
  @logMethod
  sum(a: number, b: number) {
    return a + b;
  }
}

const calculator = new Calculator();
assert.strictEqual(calculator.sum(12, 23), 35);

export function logMethod(target: Object, propertyKey: string, propertyDescription: PropertyDescriptor): PropertyDescriptor {
  // target === Calculator.prototype
  // propertyKey === "sum"
  // propertyDescription === Object.getOwnPropertyDescriptor(Calculator.prototype, "sum")

  // Save a reference to the original method this way we keep the values currently in the 
  // descriptor and don't overwrite what another decorator might have done to the descriptor.
  const originalDescriptionValue = propertyDescription.value;

  // editing the descriptor/value parameter
  propertyDescription.value = function(...args: any[]) {
    // convert list of sum arguments to string
    var a = args.map(a => JSON.stringify(a)).join(', ');

    // invoke sum() and get its return value
    // note: usage of originalDescriptionValue here
    var result = originalDescriptionValue.apply(this, args);

    // convert result to string
    var r = JSON.stringify(result);

    // display in console the function call details
    console.log(`Call: ${propertyKey}(${a}) => ${r}`);

    // return the result of invoking foo
    return result;
  }

  // Return edited descriptor as opposed to overwriting the descriptor by returning a new descriptor
  return propertyDescription;
}
