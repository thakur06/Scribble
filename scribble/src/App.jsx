import React,{ useState } from 'react'

import Canvas from './Components/Canvas'
import { Home } from './Components/Home'
import Start from './Components/Start'
import { Game } from './Components/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
  <div className=''>
 {/* <Home/> */}
 <Start/>
 {/* <Game/> */}
  </div>
  )
}

export default App
