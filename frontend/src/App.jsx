import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/hello')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('Error connecting to backend'));
  }, []);

  return (
    <div className="App">
      <h1>My React + Node App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;