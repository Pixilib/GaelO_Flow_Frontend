import { useState } from 'react'
import { SignInForm } from './auth/SignInForm'

interface WelcomeProps{
    onLegalMention : ()=> void
}
function Welcome({onLegalMention} :WelcomeProps) {

  const [displayComponent, setDisplayComponent] = useState<'login'|'lostPassword'|'legalMention'>('login')

  return (
    <div className='h-screen w-screen columns-2 gap-0 bg-gradient-to-r from-indigo-700 to-amber-500'>
      <div className="h-full w-full" >
        <img src="/gaelo-flow-white.png" className='absolute top-0 left-0 w-1/6'></img>
        <div className="flex h-screen w-full justify-center items-center">
          <img src="/gaelo-flow.png" className='absolute w-1/4'></img>
        </div>
      </div>
      <div className="h-full w-full flex justify-center items-center bg-white rounded-tl-3xl" style={{ filter: 'drop-shadow(-20px 0 20px rgba(50, 50, 50, 0.5))' }}>
        <div>
          {
            displayComponent === 'login' ? <SignInForm /> : null
          }
          {
            displayComponent === 'lostPassword' ? "Lost Password Component" : null
            
          }
          {
            displayComponent === 'legalMention' ? "Legal Mention Component" : null
          }
          <div className="flex justify-between">
            <p className="text-gray-600 inline-block mr-16" onClick={() => {setDisplayComponent('lostPassword')}}>Lost password ?</p>
            <p className="text-gray-600 inline-block" onClick={() => {onLegalMention()}}>Legal Mention</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Welcome
