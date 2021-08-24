import React from "react";

const Like = ({ liked, onLike }) => {
  let classes = liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i style={{ cursor: "pointer" }} onClick={onLike} className={classes}></i>
  );
};

export default Like;
