import { useState } from 'react'
import './App.css'

function App() {

  const [data, setData] = useState("");
  const [input, setInput] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }) 
      });

      const result = await response.json(); 
      setData(result.response); 

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">

        <div>{data}</div> 

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />

        <button type="submit">Submit</button>

      </form>
    </>
    )
}

export default App
