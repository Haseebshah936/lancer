import mongoose from "mongoose";

export const watchCollection = async (
  currentUser,
  collectionName,
  filter,
  breakAsyncIterator,
  callBack
) => {
  const mongo = currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("test").collection(collectionName);
  console.log(collection);
  for await (const change of collection.watch(filter)) {
    console.log(breakAsyncIterator);
    if (breakAsyncIterator) {
      console.log("Exiting async iterator");
      return;
    } // Exit async iterator
    callBack(change);
  }
};
