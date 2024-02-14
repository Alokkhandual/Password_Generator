import { useCallback, useEffect, useRef, useState } from "react"



function App() {
const [length,setLength]=useState(8);
const [numberAllowed,setNumberAllowed]=useState(false);
const [characterAllowed,setCharacterAllowed]=useState(false);
const [password,setPassword]=useState("");

//useRef hook
const passwordRef=useRef(null);

//useCallback hook
const passwoedGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRASUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(numberAllowed) str+="0123456789"
  if(characterAllowed) str+="!@#$*&%[]~{}`"

  for (let i = 1; i< length; i++) {
    let char=Math.floor(Math.random() *str.length +1)
    pass+=str.charAt(char);
  }
   setPassword(pass);
},[length,numberAllowed,characterAllowed,setPassword]);

const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,100);
  window.navigator.clipboard.writeText(password);
},[password]);

//useEffect hook
  useEffect(()=>{
    passwoedGenerator()
  },[length,numberAllowed,characterAllowed,setPassword])
  
  return (
     <>
       <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800"> 
       <h1 className="text-white text-center my-3">Password Generator</h1>
         <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
           type="text"
           value={password}
           className="outline-none w-full py-1 px-3"
           placeholder="password"
           readOnly
           ref={passwordRef}
           />
           <button onClick={copyPasswordToClipboard}
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
           >Copy</button>
         </div>
            <div className="flex text-sm gap-x-2">
              <div className="flex items-center gap-x-1">
                <input 
                type="range"
                 min={6}
                 max={100}
                 value={length}
                 className="cursor-pointer"
                 onChange={(e)=>{setLength(e.target.value)}}
                 />
                 <label>Length:{length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                   <input
                      type="checkbox"
                      defaultChecked={numberAllowed}
                      id="numberInput"
                      onChange={()=>{
                        setNumberAllowed((prev)=>!prev)
                      }}
                   />
                   <label htmlFor="numberInputs">Numbers</label>
              </div>
              <div className="flex items-center gap-x-1">
                   <input
                      type="checkbox"
                      defaultChecked={characterAllowed}
                      id="characterInput"
                      onChange={()=>{
                        setCharacterAllowed((prev)=>!prev)
                      }}
                   />
                   <label htmlFor="characterInputs">Character</label>
              </div>
            </div>
       </div>
     </>
  );
}

export default App
