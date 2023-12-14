import Button from "./RenderComponents/Button";

const Home = () => {
    return (
        <div className="h-screen w-screen bg-[#ebdfd7]">
            <h1 className="text-4xl font-bold text-center mb-8">Welcome username !</h1>
            <p className="text-lg text-gray-700 text-center mb-8">You are connected.</p>

            <Button color="purple">Logout</Button>

            <div className="flex flex-wrap">


                <div className="w-1/3 p-4 bg-[#4746B8]rounded-lg">

                    Welcome username

                </div>

                <div className="w-1/3 p-4 bg-[#ffffff]">

                    02

                </div>

                <div className="w-1/3 p-4 bg-[#ffffff]">

                    03

                </div>

                <div className="w-1/3  bg-[#ffffff]">

                    Active Task
                    </div>
            </div>


        </div>
    )
}

export default Home;