// how we can create flexible interfaces and types in TypeScript using mapped types (means we can add as many keys as needed)
// I found the two possible way to do that
// one way is by using Record<key Type, value Type>
// another way is by [key:key Type]: value Type in the interface or in Type
// type FlexibleDogInfo = {
//   name: string;
//   [key: string]: string;
// };
type FlexibleDogInfo = {
  name: string;
} & Record<string, string>;

const dog: FlexibleDogInfo = {
  name: 'dog',
  breed: 'dachshund',
  age: '6',
};

type DogInfo = {
  name: string;
  age: number;
};

// below code is convert the value of every key of provided Object-Type into a boolean type
type OptionsFlags<Type> = {
  [property in keyof Type]: boolean; // this will iterate over every key of the provided Object-Type and convert the value of every key into a boolean type
};

type DogInfoOptions = OptionsFlags<DogInfo>;

// let's do a practical example

type Listeners<Type> = {
  [property in keyof Type as `on${Capitalize<string & property>}Change`]: (newValue: Type[property]) => void;
  //   Question: why we need to add string & property string with property with & operator ?
  //   Answer: because property is a generic type and we need to convert it into string type
  //   Question: don't we already convert it by template literals ?
  //   Answer: no, template literals convert the value of property into string type but not the type of property
  //   Question: mean if we add string with & operator will it convert it's type into string ?
  //   Answer: yes, it will convert it's type into string
} & { [property in keyof Type as `on${Capitalize<string & property>}Delete`]?: () => void };
const listenToObject = <T>(obj: T, listeners: Listeners<T>): void => {
  throw 'need to be implemented';
};

const lg: DogInfo = {
  name: 'Dog',
  age: 13,
};

type ListenerDogInfo = Listeners<DogInfo>;

listenToObject(lg, { onNameChange: (v: string) => {}, onAgeChange: (v: number) => {}, onAgeDelete: () => {}, onNameDelete: () => {} });
