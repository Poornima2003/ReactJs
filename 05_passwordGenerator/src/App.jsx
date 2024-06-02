import { useState, useCallback,useEffect } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [chaar, setChaar] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '0123456789';
    if (chaar) str += '!@#$%^&*()`~';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, chaar]);

  useEffect(()=>{
    passwordGenerator()
  },[length, number, chaar,passwordGenerator])
  return (
    <>
       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
            <label >Length:{length}</label>
          </div>
          <input type="checkbox" defaultChecked={number} id='numberInput' onChange={()=>{setNumber((prev)=>!prev)}}/>
          <label htmlFor="numberInput">numbers</label>
          <input type="checkbox" defaultChecked={chaar} id='characterInput' onChange={()=>{setChaar((prev)=>!prev)}}/>
          <label htmlFor="characterInput">character</label>
        </div>
       </div>
    </>
  );
}

export default App;
