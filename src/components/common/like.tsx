import React from "react";

interface Props {
  liked?: boolean ,
  onLike: () => void
}

const Like: React.FC<Props> = ({ liked, onLike }) => {
  let classes = liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i style={{ cursor: "pointer" }} onClick={onLike} className={classes}></i>
  );
};

export default Like;
