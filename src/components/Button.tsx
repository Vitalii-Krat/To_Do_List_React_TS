import React from "react";

type ButtonPropsType = {
  onClick: () => void;
  text: string;
};

export function Button(props: ButtonPropsType) {
  return (
    <button
      className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 hover:scale-105 duration-700
                     focus:ring-red-600 focus:ring-opacity-50 
                     shadow-md rounded-md py-5 px-8 text-white ml-3 "
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
