import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange } = props;
  //[1, 2, 3]
  const page = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, page + 1);
  console.log(pages);
  return <h1>Pagination</h1>;
};

export default Pagination;
