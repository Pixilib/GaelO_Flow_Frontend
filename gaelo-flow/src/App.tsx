import { SignInForm } from './RenderComponents/SignInForm'
import './index.css'

function App() {

  return (
    <div className='h-screen w-screen columns-2 gap-0 bg-gradient-to-r from-indigo-700 to-yellow-500'>
      <div className="h-full w-full " >

      </div>
      <div className="h-full w-full flex items-center bg-white rounded-tl-3xl rounded-bl-3xl">
        <SignInForm />
      </div>
    </div>
  )
}

export default App

// TODO : Fix top cotnrt left of right section muste be rounded (70-75%)
