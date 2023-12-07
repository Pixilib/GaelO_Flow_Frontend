import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import Welcome from './Welcome'
import './index.css'
import Button from './RenderComponents/Button'

const queryClient = new QueryClient()

function App() {

  const [displayLegalMention, setDisplayLegalMention] = useState<boolean>(false)

  return (
    <QueryClientProvider client={queryClient}>
      
      {
        displayLegalMention ? <><Button onClick={()=>setDisplayLegalMention(false)} color='purple'>Return to Main</Button> "Legual Mention"</> : <Welcome onLegalMention={()=> setDisplayLegalMention(true)} />
      }
    </QueryClientProvider>
  )
}

export default App
