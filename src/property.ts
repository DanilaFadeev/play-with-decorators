import assert from 'assert';

// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

export function logProperty(target: Object, propertyKey: string | symbol) {
  // propertry value
  let _value = target[propertyKey];

  if (delete target[propertyKey]) {
    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      // property getter
      get() {
        console.log(`Get: ${propertyKey.toString()} => ${_value}`);
        return _value;
      },
      // property setter
      set(value: unknown) {
        console.log(`Set: ${propertyKey.toString()} => ${value}`);
        _value = value;
      }
    });
  }
};

class Person {
  @logProperty
  public name: string;

  public surname: string;

  constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
}

const person = new Person('Danila', 'Dzemidovich');

assert.strictEqual(person.name, 'Danila');
assert.strictEqual(person.surname, 'Dzemidovich');
