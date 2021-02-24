import React from "react";

const NavBar = ({ tableInfo, onClick }) => {
  // console.log(tableNames);

  const btns = tableInfo.map((info) => (
    <button
      key={info.name}
      className="btn btn-secondary mr-2"
      onClick={() => onClick(info)}
    >
      {info.name}
    </button>
  ));

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-brand">{btns}</div>
    </nav>
  );
};

export default NavBar;
