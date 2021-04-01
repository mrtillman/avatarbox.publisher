function partition(collection){
  const batchSize = 10;
  let start = 0;
  let end = batchSize;
  const result = [];
  while(start < collection.length){
    result.push(collection.slice(start, end));
    start += batchSize;
    end += batchSize;
  }
  return result;
}

module.exports = { partition };
