import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// import { useMedia } from './component/useMedia'
import { useMediaQuery } from 'react-responsive'
import { useMedia ,MediaQuery} from 'custom-responsive'
import { createPortal } from 'react-dom'
import Cat from './Cat'
import { css } from '@emotion/react'
function App() {
  // const [count, setCount] = useState(0)
  // const media  = useMedia('(min-width: 800px) and (max-width: 1000px)')
  // const media  = useMedia([800,1000])
  // const media = useMedia({ minWidth: 800, maxWidth: 1000 })
  // const media  = useMedia([{min:'(min-width: 800px) and (max-width: 1000px)'}])
  // const media  = useMedia([{min:'(min-width: 800px) and (max-width: 1000px)',max:'(min-width: 1200px) and (max-width: 1400px)'}])

  // const media  = useMediaQuery({query:'(min-width: 800px) and (max-width: 1000px)'})
  // console.log(media, 'meida')
  return (
    <div className="App" >
<div css={css({
  color:'red',
  '.aa':{
    color:'green'
  }
})}><span className='aa'>home</span></div>
    </div>
  )
}

export default App
