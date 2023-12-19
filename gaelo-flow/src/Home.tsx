
import React from 'react';
import taskSvg from './assets/task.svg';
import Button from './RenderComponents/Button';

const Home = () => {
    const username = "M.Ohma";

    return (
        <div className="bg-background flex flex-col p-8 h-screen">
            <h1 className="text-3xl font-bold mx-8">Overview</h1>

            <div className="m-8 bg-gradient-to-r from-indigo-700 to-amber-500 text-white p-10 rounded-[10px] shadow-xl flex items-center h-10">
                <h2 className="text-xl">
                    Welcome <span className="font-bold">{username}</span>
                </h2>
                <img src="hello.svg"
                    style={{ width: '40px', height: '40px', marginLeft: '4px' }}
                    alt="Hello Image"></img>
            </div>

            <div className="mx-8 columns-3 flex gap-6 b ">

                <div className=" w-1/3 p-4 text-dark bg-[#ffffff] rounded-[10px] shadow-xl">
                    <p className="text-lg font-semibold">Anonymisation</p>
                    <h3 className="text-xl">Progress</h3>

                    <Button
                        className="w-full"
                        variant="contained"
                        color="orange"
                    >
                        Empty List
                    </Button>
                </div>
                <div className=" w-1/3 p-4 bg-[#ffffff] rounded-[10px] shadow-xl ">

                    <p className=

                        "text-lg font-semibold text-dark">Retrieve</p>
                    <h3 className="text-xl">Progress</h3>

                    <Button
                        className="w-full"
                        variant="contained"
                        color="orange"
                    >
                        Empty List
                    </Button>
                </div>

                <div className=" w-1/3 p-4 bg-[#ffffff] rounded-[10px] shadow-xl">
                    <p className=

                        "text-lg font-semibold text-dark">Retrieve</p>
                    <h3 className="text-xl">Status</h3>

                    <Button
                        className="w-full"
                        variant="contained"
                        color="orange"
                    >
                        lorem ipsum</Button>
                </div>
            </div>


            <div className="m-8 flex p-20 bg-[#ffffff] rounded-[10px] p-4 shadow-xl items-center">
                <img
                    src={taskSvg}
                    alt="Task Icon"
                    className="w-10 h-10 mr-2"

                />
                <p className="text-lg font-semibold text-dark">Active Task</p>
            </div>
        </div>




    )
}

export default Home;