import './index.css'
import { SignInForm } from './RenderComponents/SignInForm';

function App() {


  return (
    <div className='h-screen w-full mx-auto grid grid-cols-2'>
      <section className="bg-custom-gradient h-full border" >

      </section>
      <section className="grid-cols-6 h-full rounded-xl" >
        <SignInForm />
      </section>
    </div>
  )
}

export default App
