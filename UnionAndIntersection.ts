(() => {
  type HasName = { name: string };
  type HasAge = { age: number };

  type HasNameOrAge = HasName | HasAge;

  const a: HasNameOrAge = { name: 'John' };
  const b: HasNameOrAge = { age: 23 };

  const c: HasNameOrAge = { name: 'John', age: 23 }; // why we get both (name and age) as we have used union type HasName | HasAge as far as i know we should only get one value either name or age
//   Question: can you explain why is this happening we should only get one value but why we are getting both ?
//   Answer: because we have used union type HasName | HasAge and we can use both name and age in this case
//   Question: can you give me more explanation on it? 
// Answer
})();
