type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinates(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

add3DCoordinates([0, 0, 0], [10, 20, 30]);

function simpleStringState(initial: string): [() => string, (v: string) => void] {
  let state: string = initial;
  return [
    () => state,
    (val: string) => {
      state = val;
    },
  ];
}

const [str1Getter, str1Setter] = simpleStringState('hello');
const [str2Getter, str2Setter] = simpleStringState('jack');
console.log(str2Getter());
console.log(str1Getter());
str1Setter('goodbye');
console.log(str1Getter());
console.log(str2Getter());
