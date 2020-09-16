// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

export function logParameter(target: Object, propertyKey: string | symbol, parameterIndex: number): void {
  const metadataKey = `log_${propertyKey.toString()}_parameters`;
  target[metadataKey] = [...(target[metadataKey] || []), parameterIndex];
}

export function logMethod(target: Object, propertyKey: string | symbol, propertyDescription: PropertyDescriptor) {
  const originalValue = propertyDescription.value;

  propertyDescription.value = function(...args) {
    const metadataKey = `log_${propertyKey.toString()}_parameters`;
    const loggedParameters = target[metadataKey];

    if (Array.isArray(loggedParameters)) {
      loggedParameters.forEach(index => {
        const arg = JSON.stringify(args[index]) || args[index].toString();
        console.log(`${propertyKey.toString()} arg[${index}]: ${arg}`);
      });
    }

    return originalValue.apply(this, args);
  }

  return propertyDescription;
}

class Person {
  constructor(public name: string, public surname: string) {}

  @logMethod
  public saySomething(@logParameter phrase: string) {
    return `${this.name} ${this.surname[0].toUpperCase()}.: ${phrase}`;
  }
}

const person = new Person('Daniil', 'Dzemidovich');
person.saySomething('How are you?');
