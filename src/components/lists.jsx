import React, { useState, useEffect } from "react";

const Lists = ({ currInfo, datas }) => {
  const [currId, setCurrId] = useState(1);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  const getLists = (activeId) => {
    const lists = datas.map((data) => {
      const classStr = `btn btn-secondary list-group-item list-group-item-action ${
        data.id === activeId ? "active" : ""
      }`;

      return (
        <button
          className={classStr}
          key={data.id}
          onClick={() => onClick(data.id)}
        >
          {data[currInfo.dispField]}
        </button>
      );
    });

    return lists;
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${currId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setAlbums(json);
        setLoading(true);
      });

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${currId}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setPosts(json);
        setPostsLoading(true);
      });
  }, [currId]);

  const getAlbums = () => {
    if (!loading) return "loading...";

    return albums.map((album) => (
      <li className="list-group-item" key={album.id}>
        {album.title}
      </li>
    ));
  };

  const getPosts = () => {
    if (!postsLoading) return "loading...";

    return posts.map((post) => (
      <li className="list-group-item" key={post.id}>
        {post.title}
      </li>
    ));
  };

  const getInfo = (activeId) => {
    const user = datas.find((user) => user.id === activeId);

    if (user) {
      console.log(user);

      // getAlbums(activeId);

      return (
        <div>
          <div>Username : {user.username}</div>
          <div>Email : {user.email}</div>
          <div>Phone : {user.phone}</div>
          <div>Company : {user.company.name}</div>
          <div>City : {user.address.city}</div>
          <br />
          {/* <button onClick={() => getAlbums(user.id)}>Albums</button> */}
          <h4>Albums</h4>
          <div>
            <ul class="list-group list-group-flush">{getAlbums()}</ul>
          </div>
          <h4>Posts</h4>
          <div>
            <ul class="list-group list-group-flush">{getPosts()}</ul>
          </div>
          <h4>Todos</h4>
          <h4>Comments</h4>
          <h4>Photos</h4>
        </div>
      );
    }

    return "User Info";
  };

  const onClick = (id) => {
    console.log("id : ", id);
    setCurrId(id);
    setLoading(false);
    setPostsLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="list-group col-sm-4">{getLists(currId)}</div>
        <div className="col-sm-8">{getInfo(currId)}</div>
      </div>
    </div>
  );
};

export default Lists;
