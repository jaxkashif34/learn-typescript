function f1(): { a: number; b: string };
function f1(): { a: boolean; b: string };
// Question: in function overloading is this necessary to pass parameters ?
// Answer: No, it is not necessary to pass parameters in function overloading
// Question: then why it gives me error when i remove optional ? in parameter ?

function f1(args?: string) {
  if (args) {
    return { a: true, b: args };
  }
  return { a: 123, b: '123' };
}
function maybe<T>(fnOrP: () => T): T | undefined;
function maybe<T>(fnOrP: Promise<T>): Promise<undefined | T>;
function maybe<T>(fnOrP: (() => T) | Promise<T>): T | undefined | Promise<undefined | T> {
  if (typeof fnOrP === 'function') {
    return fnOrP();
  }
  return fnOrP.then((res) => res);
}

const x = maybe(() => 'hello world'); // if we see the possible values of x  "string | Promise<string | undefined> | undefined" which is not very useful here function overloading comes into play and after defining function signature we will get the desired values types  "string | undefined"

(async () => {
  const result = await maybe(Promise.resolve('hello world'));
})();

type Widget = {
  name: string;
  env: 'Dev' | 'Prod';
  createdAt: Date;
};

const isString = (input: any): input is string => typeof input === 'string';
const isDate = (input: any): input is Date => Object.prototype.toString.call(input) === '[object Date]';
const isWidget = (w: any): w is Widget => isString(w.name) && ['Prod', 'Dev'].includes(w.env) && isDate(w.createdAt);

function updateWidget(updateOrKey: Partial<Widget>, widgetOrValue: Widget): Widget;
function updateWidget<K extends keyof Widget>(updateOrKey: K, widgetOrValue: Widget[K], widget: Widget): Widget;

function updateWidget<K extends keyof Widget>(updateOrKey: Partial<Widget> | K, widgetOrValue: Widget | Widget[K], widget?: Widget): Widget {
  if (isString(updateOrKey)) {
    if (!isWidget(widgetOrValue)) {
      if (isWidget(widget)) {
        return {
          ...widget,
          [updateOrKey]: widgetOrValue,
        };
      }
      throw new Error('Wrong args');
    }
    throw new Error('Wrong args');
  }
  if (isString(widgetOrValue) || isDate(widgetOrValue)) {
    throw new Error('Wrong args');
  }

  return {
    ...widgetOrValue,
    ...updateOrKey,
  };
}

// const w1 = updateWidget('name', { name: 'widget', env: 'Dev', createdAt: new Date() });
const w1 = updateWidget('createdAt', new Date(), { name: 'widget', env: 'Dev', createdAt: new Date() });
const w2 = updateWidget({ name: 'something', createdAt: new Date(), env: 'Dev' }, { name: 'widget', env: 'Dev', createdAt: new Date() });
console.log(w2);
