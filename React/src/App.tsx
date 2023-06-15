import { useState, useEffect } from 'react';
import './App.css';
import { Box, Heading, List, Incrementor } from './utility/Simple-Components';
import { useTodo } from './components/custom-hooks';
import { UL } from './components/Generic-Components';
type PayloadType = {
  text: string;
};

export type ActionType = { type: 'ADD'; payload: Todo } | { type: 'REMOVE'; id: number };

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};
function App() {
  // useState with TS
  const [payload, setPayload] = useState<PayloadType | null>(null);
  useEffect(() => {
    fetch('/payload.json')
      .then((res) => res.json())
      .then((data) => setPayload(data))
      .catch((err) => console.log(err));
  }, []);

  // userReducer with TS
  const { addTodo, removeTodo, todoList } = useTodo([]);

  // Advance Properties

  const [value, setValue] = useState(0);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>
        <List items={['one', 'two', 'three']} onClick={(item) => alert(item)} />
      </Box>
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title="Todo Items" />
      <div>
        <form onSubmit={addTodo}>
          <input type="text" id="todo" />
        </form>
        <UL
          items={todoList}
          render={(todo) => (
            <li key={todo.id} onClick={removeTodo.bind(null, todo.id)}>
              {todo.text}
            </li>
          )}
        />
      </div>
      <Incrementor value={value} setValue={setValue} />
    </div>
  );
}

export default App;
