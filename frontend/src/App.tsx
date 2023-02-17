import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  const [count, setCount] = useState('Loading...');
  useEffect(() => {
    fetch('http://localhost:8000/test')
      .then((res) => res.json())
      .then(({ data }) => {
        setCount(data);
      });
  }, []);

  return <HomePage />;
}

export default App;
