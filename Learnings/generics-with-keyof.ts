const pluck = <DataType, KeyType extends keyof DataType>(items: DataType[], key: KeyType): DataType[KeyType][] => {
  return items.map((item) => item[key]);
};

const dogs: { name: string; age: number }[] = [
  { name: 'Mimi', age: 12 },
  { name: 'Lulu', age: 13 },
];

// console.log(pluck(dogs, 'age'));
// console.log(pluck(dogs, 'name'));

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

const sendEvent = <Name extends keyof EventMap>(name: Name, data: EventMap[Name]): void => {
  console.log([name, data]);
};

sendEvent('addToCart', { productID: 'foo', user: 'bar', quantity: 1, time: 10 });
sendEvent('checkout', { time: 20, user: 'foo' });
