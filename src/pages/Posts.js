import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { getPosts } from "../api/Posts";
import Post from "../components/Post";

function PostsByList() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPostsList() {
      const query = { _page: page, _limit: 10 };
      try {
        const fetchedPosts = await getPosts(query);
        setPosts((state) => [...state, ...(fetchedPosts || [])]);
      } catch (err) {
        setError(get(err, "message", "Something went wrong"));
        console.log(err);
      } finally {
        toggeleIsfetching();
      }
    }
    toggeleIsfetching();
    setTimeout(() => {
      getPostsList();
    }, 1000);
  }, [page]);

  function handleCloseError() {
    setError(null);
  }
  function toggeleIsfetching() {
    setIsFetching((state) => !state);
  }
  function onLoadmore() {
    setPage(page + 1);
  }
  function onLikeButtonClick(index) {
    const postTobeUpdated = posts[index];
    const { isLiked, likes } = postTobeUpdated || {};
    postTobeUpdated.isLiked = !isLiked;
    postTobeUpdated.likes = postTobeUpdated.isLiked ? likes + 1 : likes - 1;
    const updatedPosts = [...posts];
    updatedPosts[index] = postTobeUpdated;
    setPosts(updatedPosts);
  }
  return (
    <Box color="white" bgcolor="#3A3B3C">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isFetching}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          Loading...
        </Alert>
      </Snackbar>
      <Snackbar
        onClose={handleCloseError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!isEmpty(error)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      {!isEmpty(posts) && (
        <Virtuoso
          style={{ width: "100%", height: 800 }}
          totalCount={get(posts, "length", 0)}
          itemContent={(index) => (
            <Post
              key={posts[index].id}
              post={posts[index]}
              index={index}
              onLikeButtonClick={onLikeButtonClick}
            />
          )}
          endReached={onLoadmore}
        />
      )}
    </Box>
  );
}
export default PostsByList;
