type Connection = {};
declare function createConnection(host: string, port: string, reconnect: boolean, poolSize: number): Connection;
(function () {
  type Config = {
    host: string;
    port: number | string;
    tryReconnect: boolean | (() => boolean);
    poolSize?: number;
  };

  const config = {
    host: 'localhost',
    port: 8080,
    tryReconnect: () => true,
    poolSize: 10,
  } as const satisfies Config;

  // Question: why we need satisfied operator in typescript ?
  // Answer: to make sure that the type of the variable is the same as the type of the object.
  // Question: this can also be done by using the type and interface, right ?
  // Answer: yes, but the satisfied operator is more concise and readable.

  function start() {
    let { host, port, tryReconnect } = config;
    createConnection(host, `${port}`, tryReconnect(), 10);
  }

  // Lets Learn satisfies operator in typescript from here
  // https://blog.logrocket.com/getting-started-typescript-satisfies-operator/#:~:text=The%20satisfies%20operator%20is%20a,a%20definition%20of%20a%20type.

  type StateName = 'Washington' | 'Detroit' | 'New Jersey';
  type StateCoordinate = {
    x: number;
    y: number;
  };

  type MyState = StateName | StateCoordinate;

  type User = {
    birthState: MyState;
    currentState: MyState;
  };

  const user: User = {
    birthState: 'Washington',
    currentState: {
      x: 10,
      y: 20,
    },
  };

  //   now if we try of convert birthState into uppercase then ts will throw an error

  // user.birthState.toUpperCase(); // Property 'toUpperCase' does not exist on type 'MyState'.
  //   This is because TypeScript is not sure of the value of MyState or whether it is a string or an object because we defined MyState as a union of a string and an object.
  //    if we want to remove this error we need to check if the birthState property is string
  if (typeof user.birthState === 'string') {
    user.birthState.toUpperCase();
  }
  //   Having to always validate whether it is a string can be frustrating and cumbersome. This is where the satisfies operator comes in.

  const values = {
    birthState: 'Washington',
  };

  const coordinates = { currentState: { x: 10, y: 20 } };

  const newUser = {
    birthState: 'Washington',
    currentState: coordinates.currentState,
  } satisfies User;

  newUser.birthState.toUpperCase(); // no error

  //   Thanks to the satisfies operator; TypeScript knows that our birthState is a string and not an object because it has pre-validated/checked the values of all properties of the User.

  //   Property name constraining with satisfies operator

  type Keys = 'FirstName' | 'LastName' | 'Email' | 'Password' | 0;

  type User1 = { [key in Keys]: string | number }; // iterates over all the union types of Keys and set the type of each key to string
  type RecordUser = Partial<Record<Keys, string | number>>; // same as above but make all the properties optional

  const user1 = {
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'john@gmail.com',
    Password: '123456',
    0: 'zero',
    // age: 23, // we can't add age because age is not present in Keys
  } satisfies RecordUser;
})();
