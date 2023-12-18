import Button from "./RenderComponents/Button";

const Home = () => {
    return (
        <div className=" mx-4 h-screen bg-background flex flex-col">
    
                <div className="m-8 bg-gradient-to-r from-indigo-700 to-amber-500 text-white rounded-lg shadow-xl p-10">
                    Welcome username

                </div>
                <div className="mx-8 columns-3 flex gap-6 b ">

                    <div className=" w-1/3 p-4 bg-[#ffffff] rounded-lg border border-gray-300">

                        02

                    </div>

                    <div className="w-1/3 p-4 bg-[#ffffff] rounded-lg">

                        03

                    </div>
                    <div className="w-1/3 p-20 bg-[#ffffff] rounded-lg">

                        03ccc 

                    </div>
                </div>


                <div className=" m-8 p-20 bg-[#ffffff] rounded-lg p-4">

                    Active Task
                </div>
        </div>




    )
}

export default Home;