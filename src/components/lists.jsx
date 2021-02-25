import React, { useState, useEffect } from "react";

const Lists = ({ currInfo, datas }) => {
  const [userId, setUserId] = useState(0);
  const [albumId, setAlbumId] = useState(0);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);
  const [postsLoading, setPostsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todosLoading, setTodosLoading] = useState(false);

  const getLists = () => {
    if (!currInfo) return;

    console.log("getLists()");

    const lists = datas.map((data) => {
      const classStr = `btn btn-secondary list-group-item list-group-item-action ${data.id === userId ? "active" : ""}`;

      return (
        <button className={classStr} key={data.id} onClick={() => onClick(data.id)}>
          {data[currInfo.dispField]}
        </button>
      );
    });

    return lists;
  };

  useEffect(() => {
    if (!userId) return;

    console.log("useEffect() : userId");

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      // fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setAlbums(json);
        setLoading(true);
      });

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      // fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setPostsLoading(true);
      });

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then((response) => response.json())
      .then((json) => {
        setTodos(json);
        setTodosLoading(true);
      });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    console.log("useEffect() : albums : ", albums.length);
  }, [albums]);

  const getPhotos = (id) => {
    if (!albumId) return;
    if (albumId !== id) return;

    const photos = albums.find((album) => album.id === albumId).photos;
    const list = photos.map((photo) => <img src={photo.thumbnailUrl} key={photo.id} alt={photo.title} />);

    return <div className="row">{list}</div>;
  };

  const getAlbums = () => {
    if (!loading) return "loading...";

    console.log("getAlbums()");

    return albums.map((album) => (
      <li className="list-group-item" key={album.id} onClick={() => onClickAlbum(album.id)}>
        {album.title}
        {getPhotos(album.id)}
      </li>
    ));
  };

  const getComments = (id) => {
    if (!postId) return;
    if (postId !== id) return;

    const comments = posts.find((post) => post.id === postId).comments;
    const list = comments.map((comment) => <li key={comment.id}>{comment.body}</li>);

    return <ul className="row">{list}</ul>;
  };

  const getPosts = () => {
    if (!postsLoading) return "loading...";

    console.log("getPosts()");

    return posts.map((post) => (
      <li className="list-group-item" key={post.id} onClick={() => onClickPost(post.id)}>
        {post.title}
        {getComments(post.id)}
      </li>
    ));
  };

  const getTodos = () => {
    if (!todosLoading) return "loading...";

    console.log("getTodos() : ", todos[0]);

    return todos.map((todo) => (
      <li className="list-group-item" key={todo.id}>
        {todo.title + " : " + (todo.completed ? "완료" : "아직")}
      </li>
    ));
  };

  const getInfo = () => {
    if (!userId) return;

    console.log("getInfo()");

    const user = datas.find((user) => user.id === userId);

    return (
      <div>
        <h4>User Info</h4>
        <div>
          <div>Username : {user.username}</div>
          <div>Email : {user.email}</div>
          <div>Phone : {user.phone}</div>
          <div>Company : {user.company.name}</div>
          <div>City : {user.address.city}</div>
        </div>
        <br />
        {/* <button onClick={() => getAlbums(user.id)}>Albums</button> */}
        <h4>Albums</h4>
        <div>
          <ul className="list-group list-group-flush">{getAlbums()}</ul>
        </div>
        <h4>Posts</h4>
        <div>
          <ul className="list-group list-group-flush">{getPosts()}</ul>
        </div>
        <h4>Todos</h4>
        <div>
          <ul className="list-group list-group-flush">{getTodos()}</ul>
        </div>
      </div>
    );
  };

  const onClickAlbum = (id) => {
    console.log("onClickAlbum() : ", id);

    if (id === albumId) {
      setAlbumId(0);
      return;
    }

    const album = albums.find((album) => id === album.id);
    if (album.photos) {
      setAlbumId(id);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((json) => {
        let newAlbums = [...albums];
        let newAlbum = newAlbums.find((album) => album.id === id);
        newAlbum.photos = json;
        setAlbumId(id);
        setAlbums(newAlbums);
        // console.log("fetch() : albums : ", json);
      });
  };

  const onClickPost = (id) => {
    console.log("onClickPost() : ", id);

    if (id === postId) {
      setPostId(0);
      return;
    }

    const post = posts.find((post) => id === post.id);
    if (post.comments) {
      setPostId(id);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((json) => {
        let newPosts = [...posts];
        let newPost = newPosts.find((post) => post.id === id);
        newPost.comments = json;
        setPostId(id);
        setPosts(newPosts);
      });
  };

  const onClick = (id) => {
    if (id !== userId) {
      console.log("id : ", id);
      setUserId(id);
      setLoading(false);
      setPostsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="list-group col-sm-4">{getLists()}</div>
        <div className="col-sm-8">{getInfo()}</div>
      </div>
    </div>
  );
};

export default Lists;
