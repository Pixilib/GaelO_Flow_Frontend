import './index.css'
import { SignInForm } from './RenderComponents/SignInForm';

function App() {


  return (
    <div className='h-screen w-full mx-auto grid grid-cols-2'>
      <section className="bg-custom-gradient h-full" >

      </section>
      <section className="flex flex-col justify-center items-center h-full  rounded-tl-xl bg-white">
        <SignInForm />
      </section>
    </div>
  )
}

export default App

// TODO : Fix top cotnrt left of right section muste be rounded (70-75%)
