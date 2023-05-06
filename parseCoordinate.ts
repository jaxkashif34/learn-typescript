type Coordinate = {
  x: number;
  y: number;
};
// function overloading
function parseCoordinate(obj: Coordinate): Coordinate; // signature for parsing object
function parseCoordinate(string: string): Coordinate; // signature for parsing string
function parseCoordinate(x: number, y: number): Coordinate; // signature for parsing x and y
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  // implementation
  let coord: Coordinate = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === 'object') {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else if (typeof arg1 === 'string') {
    (arg1 as string).split(',').forEach((str) => {
      const [key, value] = str.split(':');

      coord[key as 'x' | 'y'] = parseInt(value, 10);
    });
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate(2, 4));
console.log(parseCoordinate({ x: 3, y: 6 }));
console.log(parseCoordinate('x:12,y:39'));
