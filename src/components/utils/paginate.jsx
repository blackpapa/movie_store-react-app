import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  //startIndex, pageSize
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
