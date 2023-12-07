import { useState } from 'react'
import Welcome from './Welcome'
import './index.css'
import Button from './RenderComponents/Button'

function App() {

  const [displayLegalMention, setDisplayLegalMention] = useState<boolean>(false)

  return (
    <>
      
      {
        displayLegalMention ? <><Button onClick={()=>setDisplayLegalMention(false)} color='purple'>Return to Main</Button> "Legual Mention"</> : <Welcome onLegalMention={()=> setDisplayLegalMention(true)} />
      }
    </>
  )
}

export default App
