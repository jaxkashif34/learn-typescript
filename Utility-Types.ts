(function () {
  type MyUser = {
    name: string;
    id: string;
    email?: string;
    phone?: string;
  };
  type MyUserOptional = {
    name?: string;
    id?: string;
    email?: string;
  };
  const merge = (user: MyUser, override: MyUserOptional): MyUser => {
    return {
      ...user,
      ...override,
    };
  };
  //   console.log(merge({ name: 'Jack', id: '123', email: 'kashif@gmail.com' }, { email: 'zee@gmail.com' }));
  //   the problem with this approach is that we have to write the same code again and again for different types so to fix this we have utility types called "Partial<Type>"
  //   Partial<Type> - this will make all the properties of the type optional
  // Question: why we need Partial<Type> ?
  // Answer: to make all the properties of the type optional

  type User = {
    name: string;
    id: number;
    email: string;
    phone?: number;
  };

  type UserOptional = Partial<User>;

  const merge2 = (user: User, override: UserOptional) => {
    return { ...user, ...override };
  };

  console.log(merge2({ name: 'Jack', id: 123, email: 'dontemail@gmail.com' }, { email: 'emailme@gmail.com' }));

  //   Required<Type> - this will make all the properties of the type required
  type RequiredUser = Required<User>;
  //   Pick<Type, Properties> - this will pick the properties from the type
  type JustEmailAndPhone = Pick<User, 'email' | 'phone'>;
  //   Record<Keys, Type> - this will create a new type with the given keys and type
  //   Omit<Type, Keys> - this will omit the given keys from the type
  type UserWithoutID = Omit<User, 'id'>;
  type UserKeys = User['id'];
  const mapById = (users: User[]): Record<UserKeys, UserWithoutID> => {
    return users.reduce((a, v) => {
      const { id, ...other } = v;
      return { ...a, [id]: other };
    }, {});
  };

  const users = [
    { name: 'Jack', id: 123, email: '12' },
    { name: 'John', id: 456, email: 'dsf' },
  ];

  console.log(mapById(users));
})();
