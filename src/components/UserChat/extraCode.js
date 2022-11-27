//!Note Realm watch for checking user online status before creating watch function
// (async () => {
//   console.log("Calleed");
//   const mongo = currentUser.mongoClient("mongodb-atlas");
//   const collection = mongo.db("test").collection("users");
//   console.log(collection);
//   for await (const change of collection.watch({
//     filter: {
//       operationType: "update",
//       "fullDocument._id": mongoose.Types.ObjectId(chatroom.participantId),
//     },
//   })) {
//     console.log(breakAsyncIterator);
//     if (breakAsyncIterator) {
//       console.log("Exiting async iterator");
//       return;
//     } // Exit async iterator
//     const { documentKey, fullDocument } = change;
//     console.log(
//       `new document: ${documentKey}`,
//       fullDocument,
//       fullDocument?._id.toString()
//     );
//     const isOnline = new Date(fullDocument?.isOnline).getTime();
//     console.log(
//       new Date(fullDocument.isOnline).getTime() >=
//         new Date().getTime() - 30000 &&
//         new Date(fullDocument.isOnline).getTime() < new Date().getTime()
//     );

//     setIsOnline(isOnline);
//     setStatus(true);
//     setActiveChatroomStatus((prev) => {
//       if (prev.id === chatroom.id) {
//         return { ...prev, isOnline, status: true };
//       } else {
//         return prev;
//       }
//     });
//     changeChatroomsData(index, chatroom.id, isOnline );
//   }
// })();
