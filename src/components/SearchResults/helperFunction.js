import axios from "axios";

export default function helperFunction(
  Badge,
  price,
  SubCategoryID,
  terms,
  setSearchData,
  setSearchDataLoader
) {
  if (Badge.length !== 0 && price.max.length === 0) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}/${Badge}`
      )
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  } else if (Badge.length === 0 && price.max.length !== 0) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  } else if (Badge.length !== 0 && price.max.length !== 0) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}/${Badge}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  } else {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}`
      )
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }
  return;
}
