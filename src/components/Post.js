import React from "react";
import formatDistanceStrict from "date-fns/formatDistanceStrict";
import isEmpty from "lodash/isEmpty";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";

import * as globalConstants from "../utils/contants";

const { THEME_COLOR } = globalConstants;
const useStyles = makeStyles({
  img: {
    maxHeight: 300,
    maxWidth: 300,
    minHeight: 200,
    minWidth: 200,
    borderRadius: 16,
  },
  icon: {
    color: THEME_COLOR.WHITESMOKE,
  },
});

function Post({ post, index, onLikeButtonClick = () => {} }) {
  const styles = useStyles();
  const {
    profileName,
    avatarUrl,
    createdOn,
    likes,
    postDescription,
    postImage,
    userName,
    isLiked = false,
  } = post || {};
  const timePosted = formatDistanceStrict(new Date(), new Date(createdOn));

  return (
    <Box p={2} m={2} display="flex">
      <Avatar src={avatarUrl} sx={{ bgcolor: THEME_COLOR.BLACK }} />
      <Box mx={1}>
        <Box display="flex" alignContent="start">
          <Typography
            color={THEME_COLOR.WHITESMOKE}
            fontWeight={500}
            variant="subtitle2"
            mr={1}
          >
            {profileName} &#8226;
          </Typography>

          <Typography variant="subtitle2" mr={1}>
            {userName} &#8226;
          </Typography>
          <Typography variant="subtitle2" color={THEME_COLOR.LIGHT_GREY} mr={1}>
            {timePosted}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">{postDescription}</Typography>
          {!isEmpty(postImage) && (
            <Box mt={2}>
              <img className={styles.img} src={postImage} alt={post.name} />
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => onLikeButtonClick(index)}>
            {!isLiked ? (
              <FavoriteBorderIcon className={styles.icon} />
            ) : (
              <FavoriteIcon className={styles.icon} />
            )}
          </IconButton>
          <Typography color={THEME_COLOR.LIGHT_GREY} variant="caption">
            {likes}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Post;
