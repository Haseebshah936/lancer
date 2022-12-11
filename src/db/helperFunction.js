import mongoose from "mongoose";

export const watchCollection = async (
  currentUser,
  collectionName,
  filter = {},
  breakAsyncIterator,
  callBack
) => {
  const mongo = currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("test").collection(collectionName);
  // console.log(collection);
  for await (const change of collection.watch(filter)) {
    // console.log(breakAsyncIterator);
    if (breakAsyncIterator) {
      // console.log("Exiting async iterator");
      return;
    } // Exit async iterator
    callBack(change);
  }
};
export const watchCollectionForAll = async (
  currentUser,
  collectionName,
  filter = {},
  breakAsyncIterator,
  callBack1,
  callBack2
) => {
  console.log("🚀 ~ file: helperFunction.js:32 ~ Attached ");
  const mongo = currentUser.mongoClient("mongodb-atlas");
  const collection = mongo.db("test").collection(collectionName);
  // console.log(collection);
  for await (const change of collection.watch(filter)) {
    // console.log(breakAsyncIterator);
    if (breakAsyncIterator) {
      // console.log("Exiting async iterator");
      return;
    } // Exit async iterator
    switch (change.operationType) {
      case "insert": {
        const { documentKey, fullDocument } = change;
        console.log(`new document: ${documentKey}`, fullDocument);
        callBack1(change);

        break;
      }
      case "update": {
        const { documentKey, fullDocument } = change;
        console.log(`updated document: ${documentKey}`, fullDocument);
        breakAsyncIterator = true;
        callBack2(change);
        break;
      }
      case "replace": {
        const { documentKey, fullDocument } = change;
        console.log(`replaced document: ${documentKey}`, fullDocument);
        break;
      }
      case "delete": {
        const { documentKey } = change;
        console.log(`deleted document: ${documentKey}`);
        break;
      }
    }
  }
};
