"use client";

import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu"; // Đảm bảo đường dẫn này đúng với nơi bạn lưu file

const PersonDropdown = () => {
  const [selected, setSelected] = useState("1 Person");

  const options = [
    "1 Person",
    "2 People",
    "3 People",
    "4 People",
    "5 People",
    "6 People",
    "7 People",
    "8 People",
    "9 People",
    "10 People",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" border border-[#c9ab81] px-4 py-2 flex items-center w-40 text-white inline-flex justify-between w-full px-4 py-2 bg-[#1e1e1e] text-white text-sm font-medium rounded-md border border-gray-700">
        {selected}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#1e1e1e] rounded-md border border-gray-700 mt-2">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setSelected(option)}
            className="text-white px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PersonDropdown;
