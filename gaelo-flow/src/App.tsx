import { SignInForm } from './RenderComponents/SignInForm'
import './index.css'

function App() {

  return (
    <div className='h-screen w-screen columns-2 gap-0 bg-gradient-to-r from-indigo-700 to-amber-500'>
      <div className="h-full w-full" >
        <img src="/gaelo-flow-white.png" className='absolute top-0 left-0 w-1/6'></img>
        <div className="flex h-screen w-full justify-center items-center">
          <img src="/gaelo-flow.png" className='absolute w-1/4'></img>
        </div>
      </div>
      <div className="h-full w-full flex justify-center items-center bg-white rounded-tl-3xl" style={{ filter: 'drop-shadow(-20px 0 20px rgba(50, 50, 50, 0.5))' }}>
        <SignInForm />
      </div>
    </div>
  )
}

export default App
