import assert from 'assert';

function addProperty(key: string, value: any) {
  return function <T extends { new(...args: any[]): {} }>(target: T) {
    return class extends target {
      // @ts-ignore
      [key] = value;
    }
  };
}

export function logClass<T extends { new(...args: any[]): {} }>(target: T) {
  const original = target;

  const newConstructorFunction: any = function (...args) {
    console.log(`Constructor called for ${original.name}`);
    const result = new original(...args);
    console.log(`Instance of ${original.name}: ${JSON.stringify(result)}`);
    return result;
  }

  newConstructorFunction.prototype = target.prototype;

  return newConstructorFunction;
}

@logClass
@addProperty('age', 12)
class Person {
  constructor (public name: string, public surname: string) {}
}

const person = new Person('Danila', 'Dzemidovich');

assert.strictEqual(person instanceof Person, true);
assert.strictEqual(person.name, 'Danila')
assert.strictEqual((person as any).age, 12);
