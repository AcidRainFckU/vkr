import React from "react";

type Props = {};

const CoursePlate = (props: Props) => {
  return (
    <div className="w-full rounded-lg  drop-shadow-sm p-12 flex flex-col justify-center items-center bg-gray-100 cursor-pointer">
      <div className="mb-8">
        <div
          className="radial-progress bg-accent text-accent-content border-4 border-accent"
          style={{ "--size": "7rem", "--value": "70" } as any}
        >
          70%
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl text-gray-500 font-bold mb-2">JavaScript</p>
      </div>
    </div>
  );
};

export default CoursePlate;
