import React from 'react';

const TotalMacroTable = async () => {
    const randomNumber = () => Math.floor(Math.random() * 9000) + 1000;
    await new Promise((resolve) => setTimeout(resolve, randomNumber()));
    return (
        <div>
            <div className="flex w-full">
                <div className=" gap-2 basis-full flex items-center justify-center border">
                    <p>Protein</p>
                </div>
                <div className="mt-0 basis-full flex items-center justify-center border border-l-0 rounded-none shadow-none">
                    100
                </div>
            </div>
            <div className="flex w-full">
                <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                    <p>Calories</p>
                </div>
                <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                    100
                </div>
            </div>
            <div className="flex w-full">
                <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                    <p>Carbs</p>
                </div>
                <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                    100
                </div>
            </div>
            <div className="flex w-full">
                <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                    <p>Sugar</p>
                </div>
                <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                    100
                </div>
            </div>
            <div className="flex w-full">
                <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                    <p>Fat</p>
                </div>
                <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                    100
                </div>
            </div>
            <div className="flex w-full">
                <div className=" gap-2 basis-full border-t-0 flex items-center justify-center border">
                    <p>Saturated Fat</p>
                </div>
                <div className="mt-0 basis-full flex items-center justify-center border border-l-0 border-t-0 rounded-none shadow-none">
                    100
                </div>
            </div>
        </div>
    );
};

export default TotalMacroTable;
