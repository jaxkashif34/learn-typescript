import { useReducer, useState, useEffect, FormEvent } from 'react';
import './App.css';
import { Box, Heading, List, Incrementor } from './utility/Simple-Components';
import { Button } from './components/HTML-Atteributes';

type PayloadType = {
  text: string;
};

type ActionType = { type: 'ADD'; payload: Todo } | { type: 'REMOVE'; id: number };

type Todo = {
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
  // useReducer with TS
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [...state, action.payload];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      default:
        return state;
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo = {
      id: todos.length,
      text: e.currentTarget.todo.value,
      done: false,
    };

    dispatch({ type: 'ADD', payload: newTodo });

    e.currentTarget.todo.value = '';
  };

  const handleDelete = (id: number) => {
    dispatch({ type: 'REMOVE', id });
  };

  // Advance Properties

  const [value, setValue] = useState(0);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>
        {/* <h2>Introduction</h2> */}
        <Heading title="Inside Heading" />
        <Box>
          <Heading title="Inside Heading" />
        </Box>
        <List items={['one', 'two', 'three']} onClick={(item) => alert(item)} />
      </Box>
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title="Todo Items" />
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="todo" />
        </form>
        {todos.map((todo) => {
          return (
            <li key={todo.id} onClick={handleDelete.bind(null, todo.id)}>
              {todo.text}
            </li>
          );
        })}
      </div>
      <Incrementor value={value} setValue={setValue} />
    </div>
  );
}

export default App;
