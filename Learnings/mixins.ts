const myLogFunction = () => (str: string) => console.log(str);

const logger = myLogFunction();

// logger('log function');

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = '';
    log(str: string) {
      console.log(str);
      this.completeLog += str + '\n';
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();

const logger2 = new MyLogger();

// logger2.log('hello world!');

function CreateSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};
    get(id: string) {
      return this.db[id];
    }
    set(id: string, value: T) {
      this.db[id] = value;
    }
    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = CreateSimpleMemoryDatabase<string>();

const sbd1 = new StringDatabase();

sbd1.set('foo', 'bar');
type Constructor<T> = new (...args: any[]) => T;
const DumpAble = <T extends Constructor<{ getObject(): object }>>(Base: T) => {
  return class DumpAble extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
};

const DumpAbleStringDatabase = DumpAble(StringDatabase);
const sbd2 = new DumpAbleStringDatabase();
sbd2.set('a', 'hello');

class Engine {
  start() {
    console.log('Engine is running');
  }
  stopped() {
    console.log('Engine is stopped');
  }
}

class Lorry {
  carry(weight: number) {
    console.log(`This Vehicle can carry ${weight} key`);
  }
}
// if we use interface we can extends multiple classes at a time but with class we can't extends multiple classes at once and if we create a class with the same name then we can achieved the same functionality like mixins (right now i'm new so i think that we can do that. but I might be wrong) we can do that and the full implementation is on official typescript mixins page
interface Truck extends Engine, Lorry {}
class Truck {
  //   constructor(){
  //       this. // uncomment and hit ctrl+space you will see all the methods of Engine and Lorry class
  //   }
}

const truck = new Truck();
// truck.carry(100); will not work
// truck.start(); will not work
// truck.stopped(); will not work

