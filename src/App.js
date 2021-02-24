import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Lists from "./components/lists";

const tableInfo = [
  { name: "users", dispField: "name" },
  { name: "albums", dispField: "title" },
  { name: "posts", dispField: "title" },
  { name: "todos", dispField: "title" },
  { name: "comments", dispField: "name" },
  { name: "photos", dispField: "title" }
];

function App() {
  const [currInfo, setCurrInfo] = useState(null);
  const [datas, setDatas] = useState([]);

  const handleMenu = (info) => {
    // table = table.toLowerCase();
    // console.log(table);

    fetch(`https://jsonplaceholder.typicode.com/${info.name}`)
      .then((response) => response.json())
      .then((json) => {
        setCurrInfo(info);
        setDatas([...json]);
      });
  };

  useEffect(() => {
    // console.log(JSON.stringify(datas));
  }, [datas]);

  return (
    <div>
      <NavBar tableInfo={tableInfo} onClick={handleMenu} />
      <Lists currInfo={currInfo} datas={datas} />
    </div>
  );
}

export default App;
