import React,{useEffect,useState} from 'react';
import Canvas from './Canvas'
import io from "socket.io-client"
export const Game = () => {
  const socket = io('http://localhost:3000', {
    transports: ['websocket'], // Use WebSocket transport
  });
const [message, setMessage] = useState('');
const [receivedMessages, setReceivedMessages] = useState([]);
const three=["a","b",'c'];
const [word, setword] = useState("word test")
const [chooseword, setchooseword] = useState(true);
  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (data) => {
      console.log("msg")
      setReceivedMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('keys', (data) => {
      console.log(data)
      
    });

    socket.emit('joinRoom', 'myRoom');
socket.emit("keys",{room:"myRoom",keys:three});
  },[])
  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
<div className='bg-amber-400 text-center w-full text-3xl'>{word}</div>
{chooseword && <div className='w-full flex flex-row justify-evenly relative z-0'>
  <span className=' border border-white pr-5 pl-5 pt-3 pb-3 text-black bg-zinc-50 hover:bg-blue-400' onClick={()=>setchooseword(false)}>Abhishek</span>
  <span className=' border border-white pr-5 pl-5 pt-3 pb-3 text-black bg-zinc-50 hover:bg-blue-400' onClick={()=>setchooseword(false)}>Aki</span>
  <span className=' border border-white pr-5 pl-5 pt-3 pb-3 text-black bg-zinc-50 hover:bg-blue-400' onClick={()=>setchooseword(false)}>Anush</span>
</div>}
<div className='absolute z-10'>
<div >
<Canvas socket={socket}/>
</div>
<div >

      <div className='h-32 pl-6 w-[40rem] overflow-y-scroll'>
        <h2>Received Messages:</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input className='md:w-[40rem]'
        type="text"
        placeholder='Enter Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div></div>
    </div>
  )
}
