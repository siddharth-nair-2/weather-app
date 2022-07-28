import React from "react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      title: "London",
    },
    {
      id: 2,
      title: "Paris",
    },
    {
      id: 3,
      title: "Mumbai",
    },
    {
      id: 4,
      title: "Toronto",
    },
    {
      id: 5,
      title: "Tokyo",
    },
  ];

  return (
    <div className="sm:flex items-center sm:justify-around justify-evenly flex-wrap sm:flex-nowrap my-6 hidden sm:visible">
      {cities?.map((item) => {
        return (
          <button
            className="text-white text-lg font-medium mx-2  py-3 transition ease-out hover:scale-125"
            key={item.id}
            onClick={() => setQuery({ q: item.title })}
          >
            {item.title}
          </button>
        );
      })}
    </div>
  );
};

export default TopButtons;
