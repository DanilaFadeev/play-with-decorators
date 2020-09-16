import { logClass } from './class';
import { logProperty } from './property';
import { logMethod, logParameter } from './parameter';

function log(...args: any[]) {
  // The issue https://github.com/microsoft/TypeScript/issues/40577
  const validArgs = args.filter(arg => Boolean(arg));

  switch (validArgs.length) {
    case 1:
      return logClass.apply(this, validArgs);
    case 2:
      return logProperty.apply(this, validArgs);
    case 3:
      if (typeof validArgs[2] === 'number') {
        return logParameter.apply(this, validArgs);
      }
      return logMethod.apply(this, validArgs);
    default:
      throw new Error('Decorator is not valid here!');
  }
}

@log
class Person { 

  @log
  public name: string;

  public surname: string;

  constructor(name: string, surname: string) { 
    this.name = name;
    this.surname = surname;
  }

  @log
  public saySomething(@log something: string): string { 
    return `${this.name} ${this.surname} says: ${something}`; 
  }
}

console.log('\n\nDecorator factory:');
const person = new Person('Danila', 'Dzemidovich');
person.saySomething('Hey');
