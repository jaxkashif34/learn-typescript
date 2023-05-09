(function () {
  // Removes 'readonly' attributes from a type's properties
  type CreateMutable<Object_Type> = {
    -readonly [keys in keyof Object_Type]: Object_Type[keys];
  };
  type LockedAccount = {
    readonly id: string;
    readonly name: string;
  };

  type UnlockedAccount = CreateMutable<LockedAccount>; // now we can mutate the LockedAccount

  // Remove 'optional' from a type's properties

  type Concrete<Object_Type> = {
    [properties in keyof Object_Type]-?: Object_Type[properties];
  };

  type MaybeUser = {
    id: string;
    name?: string;
    age?: number;
  };

  type User = Concrete<MaybeUser>; // now there is no any optional fields in User Type

  //   Key Remapping via "as" with template literals
  // properties will convert into get[PropertyName] and if we want to change the type of properties also we need to change whatever property we want we can replace them like given below (replace with boolean each property in below) and then what Object we pass will convert into boolean value like in given below (but there a bug in this approach if a property have also a object property like location : { latitude: string, longitude: string }) then this code will replace the location property into boolean instead of converting there sub-property into boolean so we have to modify it
  //   type MapTypeWithNewProperties<Object_Type> = {
  //     [property in keyof Object_Type as `get${Capitalize<property & string>}`]: boolean;
  //   };
  type MapTypeWithNewProperties<Object_Type> = {
    [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property];
  };
  // this type will be used when creating properties for the sub-properties of the object properties of the original object type
  type MapTypeWithNewPropertiesAndSubProperties<Object_Type> = {
    [property in keyof Object_Type as `get${Capitalize<property & string>}`]: Object_Type[property] extends object
      ? {
          [subProperty in keyof Object_Type[property] as `get${Capitalize<subProperty & string>}`]: boolean;
        }
      : boolean;
  };

  type MapUser = {
    name: string;
    age: number;
    location: {
      latitude: number;
      longitude: number;
    };
  };

  type GetUser = MapTypeWithNewPropertiesAndSubProperties<MapUser>;
})();
