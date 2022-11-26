import React from "react";
import MPGigSlider from "../components/BuyerMain/MPGigSlider";
import Header from "../components/HeaderLoggedIn";
import TopSlider from "../components/BuyerMain/TopSlider";
import GigsYML from "../components/BuyerMain/GigsYML";
import GigsRPS from "../components/BuyerMain/GigsRPS";
import Footer from "../components/Footer";
import BottomSlider from "../components/BuyerMain/BottomSlider";
import SearchResults from "./SearchResults";
import { useRealmContext } from "../db/RealmContext";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const BuyerMain = () => {
  const { currentUser, user } = useRealmContext();
  const [collection, setCollection] = React.useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   let breakAsyncIterator = false; // Later used to exit async iterator
  //   (async () => {
  //     const mongo = currentUser.mongoClient("mongodb-atlas");
  //     const collection = mongo.db("test").collection("test");
  //     setCollection(collection);
  //     for await (const change of collection.watch()) {
  //       console.log(breakAsyncIterator);
  //       if (breakAsyncIterator) return; // Exit async iterator
  //       switch (change.operationType) {
  //         case "insert": {
  //           const { documentKey, fullDocument } = change;
  //           console.log(`new document: ${documentKey}`, fullDocument);
  //           break;
  //         }
  //         case "update": {
  //           const { documentKey, fullDocument } = change;
  //           console.log(`updated document: ${documentKey}`, fullDocument);
  //           breakAsyncIterator = true;
  //           break;
  //         }
  //         case "replace": {
  //           const { documentKey, fullDocument } = change;
  //           console.log(`replaced document: ${documentKey}`, fullDocument);
  //           break;
  //         }
  //         case "delete": {
  //           const { documentKey } = change;
  //           console.log(`deleted document: ${documentKey}`);
  //           break;
  //         }
  //       }
  //     }
  //   })();
  //   return () => {
  //     breakAsyncIterator = true; // Exit async iterator
  //   };
  // }, []);
  useEffect(() => {
    if (currentUser && user) {
      console.log("User", user);
      if (user.name === "test1" && user.profilePic === "")
        navigate("/cprofile");
    }
  }, [currentUser]);
  return (
    <>
      <Header />
      {/* <Button
        onClick={async () => {
          const result = await collection.insertOne({
            name: "lily of the valley",
            sunlight: "full",
            color: "white",
            type: "perennial",
            _partition: "Store 47",
          });
          // const result = await collection.find();
          console.log(result);
        }}
      >
        Hello
      </Button> */}
      <TopSlider />
      <MPGigSlider />
      <GigsYML />
      <GigsRPS />
      <BottomSlider />
      <Footer />
    </>
  );
};

export default BuyerMain;
