 
@Reflect.metadata('custom:example', 'my sample')
class Person {

}

@Reflect.metadata('custom:priority', 1)
class Plumber extends Person {

}

console.log(Reflect.getMetadata('custom:example', Person));
console.log(Reflect.getMetadataKeys(Person));

console.log(`Reflect.getMetadataKeys    => ${Reflect.getMetadataKeys(Plumber)}`);
console.log(`Reflect.getOwnMetadataKeys => ${Reflect.getOwnMetadataKeys(Plumber)}`);

const forest = {
  trees: 10,
  beers: 2
};

Reflect.defineMetadata('forest:location', 'Minsk', forest);
Reflect.defineMetadata('forest:beers', 'So dangerous!', forest, 'beers');

console.log(`Object metadata: ${Reflect.getMetadataKeys(forest)}`);
console.log(`Object property metadata: ${Reflect.getMetadataKeys(forest, 'beers')}`);

function Model(target: object): void {
  Reflect.defineMetadata('model:class', true, target);
}

function ModelPropery(target: any, propertyKey: string): void {
  console.log(Reflect.getMetadata('design:type', target, propertyKey));
}

function ModelMethod(target: any, propertyKey: string, propertyDescription: PropertyDescriptor): void {
  Reflect.defineMetadata('model:class:methods', propertyKey, target, propertyKey);
}

@Model
class CustomModel {
  @ModelPropery
  person: Person;

  @ModelMethod
  doSomething() {
    // Do nothing actually
    return Math.random();
  }
}

console.log(Reflect.getMetadataKeys(CustomModel));
console.log(Reflect.getMetadataKeys(new CustomModel(), 'doSomething'));
