import { useRef, useState } from "react";
import {
  useGetPostsQuery,
  useAddPostsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./api/index";
import "./App.css";

function App() {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPostsQuery();
  const [addPost] = useAddPostsMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const content = useRef();
  if (isLoading) {
    content.current = <p>Loading...</p>;
  } else if (isSuccess) {
    content.current = posts.map((el, index) => {
      // console.log(el?.id);
      return (
        <tr key={index}>
          <td>{el?.title}</td>
          <td>{el?.author}</td>
          <td>
            <button
              onClick={() => {
                setWantToUpdate({ status: true, id: el?.id });
                setNewTitle(el?.title);
                setAddNewPost(false);
              }}
            >
              update
            </button>
          </td>
          <td>
            <button onClick={() => deletePost({ id: el?.id })}>delete</button>
          </td>
        </tr>
      );
    });
  } else if (isError) {
    // content.current = <p>{error}</p>;
    console.log(error);
  }

  const [addNewPost, setAddNewPost] = useState(false);
  const [wantToUpdate, setWantToUpdate] = useState({ status: false, title: null, id: null });
  const [title, setTitle] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const handleSubmit = () => {
    if (title != null && title.length >= 1) addPost({ title, author: "auth 1" });
  };
  return (
    <div>
      <h1>Post List</h1>
      <button
        onClick={() => {
          if (addNewPost === false) setAddNewPost(true);
          if (addNewPost === true) setAddNewPost(false);

          setWantToUpdate({ status: false, title: null, id: null });
          setNewTitle(null);
        }}
      >
        {addNewPost === false ? " New post" : "cancel"}
      </button>
      <br />
      {addNewPost === true && wantToUpdate?.status === false ? (
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input
            id="title"
            type="text"
            value={title != null ? title : ""}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={handleSubmit}>add</button>
        </div>
      ) : (
        <></>
      )}
      {wantToUpdate?.status === true ? (
        <div>
          <label htmlFor="title">Updating</label>
          <br />
          <input
            id="title"
            type="text"
            value={newTitle != null ? newTitle : ""}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <button
            onClick={() => {
              if (newTitle != null && newTitle.length > 1)
                updatePost({ id: wantToUpdate?.id, title: newTitle });
            }}
          >
            update
          </button>
        </div>
      ) : (
        <></>
      )}
      <br />

      {isSuccess ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>author</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{content.current}</tbody>
          </table>
        </div>
      ) : (
        content.current
      )}
    </div>
  );
}

export default App;
