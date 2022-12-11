import { useSyncExternalStore } from "react";
import { useRealmContext } from "../../db/RealmContext";

const RealmConnect = () => {
  let chatroom = {};
  const subscribe = async (
    currentUser,
    dbName = "test",
    collectionName,
    filter,
    callBack
  ) => {
    let breakAsyncIterator = false;
    const mongo = currentUser.mongoClient("mongodb-atlas");
    const collection = mongo.db(dbName).collection(collectionName);
    // console.log(collection);
    for await (const change of collection.watch(filter)) {
      // console.log(breakAsyncIterator);
      if (breakAsyncIterator) {
        // console.log("Exiting async iterator");
        return;
      } // Exit async iterator
      const { documentKey, fullDocument } = change;
      console.log(`new document: ${documentKey}`, fullDocument);
      callBack(fullDocument);
    }
    return () => {
      breakAsyncIterator = true;
    };
  };
};

const useWatchChange = (dbName, collectionName, filter, callBack) => {
  const { currentUser } = useRealmContext();
  const chatroom = useSyncExternalStore(subscribe, callBack);
  const subscribe = async () => {
    let breakAsyncIterator = false;

    try {
      const mongo = currentUser.mongoClient("mongodb-atlas");
      const collection = mongo.db(dbName).collection(collectionName);
      // console.log(collection);
      if (filter)
        for await (const change of collection.watch(filter)) {
          // console.log(breakAsyncIterator);
          if (breakAsyncIterator) {
            // console.log("Exiting async iterator");
            return;
          } // Exit async iterator
          const { documentKey, fullDocument } = change;
          console.log(`new document: ${documentKey}`, fullDocument);
          callBack(change);
        }
      else {
        callBack({});
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      breakAsyncIterator = true;
    };
  };
  return chatroom;
};

export default useWatchChange;
