interface Database<T, K> {
  get(id: K): T;
  set(id: K, value: T): void;
}

interface Persistable {
  saveToString(): string;
  reStoreFromString(storedValue: string): void;
}

type DBKeyType = string | number | symbol;

class InMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> {
  protected db: Record<K, T> = {} as Record<K, T>;
  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

class PersistentMemoryDB<T, K extends DBKeyType> extends InMemoryDatabase<T, K> implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db);
  }

  reStoreFromString(storedValue: string): void {
    this.db = JSON.parse(storedValue);
  }
}

const myDB = new PersistentMemoryDB<number, string>();

myDB.set('foo', 42);
console.log(myDB.get('foo'));
const saved = myDB.saveToString();
// myDB.reStoreFromString('{"foo":"bar"}');

const myDB2 = new PersistentMemoryDB<number, string>();

myDB2.reStoreFromString(saved);
console.log(myDB2.get('foo'));
