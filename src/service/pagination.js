function pagination(page, count, list) {
  let pagedList = list.slice(page * count - count, page * count);
  let pageCount = list.length % count;
  return {
    list: pagedList,
    pageCount,
  };
}

module.exports = {pagination};