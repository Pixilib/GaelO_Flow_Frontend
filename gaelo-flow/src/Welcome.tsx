import { useState } from 'react'
import { SignInForm } from './auth/SignInForm'

interface WelcomeProps {
  onLegalMention: () => void
}
function Welcome({ onLegalMention }: WelcomeProps) {

  const [displayComponent, setDisplayComponent] = useState<'login' | 'lostPassword' | 'legalMention'>('login')

  const colorClasses = {
    'login': 'bg-green-500 hover:bg-green-700',
    'lostPassword': 'bg-violet-700 hover:bg-indigo-900',
    'legalMention': 'bg-violet-700 hover:bg-indigo-900',
  }

  return (
    <div className='h-screen w-screen columns-2 gap-0 bg-gradient-to-r from-indigo-700 to-amber-500'>

      <div className="h-full w-full" >
        <img src="/gaelo-flow-white.png" className='absolute top-7 left-7 w-1/12'></img>

        <div className="flex h-screen justify-center items-center w-12/12">
          <img src="/cloud.svg" style={{ left: '400px', top: '300px', transform: 'rotate(5deg)', width: '8%' }} className="absolute w-1/8 bottom-10" />
          <img src="/VisualHome.svg" alt="VisualHome Image" />
          <img src="/cloud.svg" style={{ left: '600px', transform: 'rotate(5deg)' }} className="absolute w-1/8 bottom-80" />

        </div>

      </div>
      <div className="h-full w-full flex justify-center items-center bg-white rounded-tl-3xl" style={{ filter: 'drop-shadow(-20px 0 20px rgba(50, 50, 50, 0.5))' }}>
        <div className="w-1/2">
          {
            displayComponent === 'login' ? <SignInForm /> : null
          }
          {
            displayComponent === 'lostPassword' ? "Lost Password Component" : null

          }
          {
            displayComponent === 'legalMention' ? "Legal Mention Component" : null
          }
          <hr className="my-10 border-orange-300" />
          <div className="flex justify-between">
            <span className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer" onClick={() => { setDisplayComponent('lostPassword') }} >Lost password ?</span>
            <span className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer" onClick={() => { onLegalMention('') }} >Legal Mention</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Welcome