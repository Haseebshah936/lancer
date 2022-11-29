import axios from "axios";

export default function helperFunction(
  Badge,
  price,
  SubCategoryID,
  terms,
  setSearchData,
  setSearchDataLoader
) {
  console.log("Terms", terms);

  //Search with cost

  if (terms && price.max && !Badge && !SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearch/${terms}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log("Search with cost");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Search with Badge
  else if (terms && !price.max && Badge && !SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearch/${terms}/${Badge}`
      )
      .then((response) => {
        console.log("Search with Badge");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Search with Badge and cost
  else if (terms && price.max && Badge && !SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearch/${terms}/${Badge}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log("Search with Badge and cost");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Subcategory
  else if (!terms && !price.max && !Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}`
      )
      .then((response) => {
        console.log("Subcategory");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Subcategory with cost
  else if (!terms && price.max && !Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log("Subcategory with cost");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Subcategory with Badge
  else if (!terms && !price.max && Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}/${Badge}`
      )
      .then((response) => {
        console.log("Subcategory with Badge");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Subcategory with Badge and cost
  else if (!terms && price.max && Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySubCategory/${SubCategoryID}/${Badge}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log("Subcategory with Badge and cost");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Search with Subcategory
  else if (terms && !price.max && !Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearchAndSubCategory/${terms}/${SubCategoryID}`
      )
      .then((response) => {
        console.log("Search with Subcategory");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Search with Subcategory and price
  else if (terms && price.max && !Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearchAndSubCategory/${terms}/${SubCategoryID}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log("Search with Subcategory and price");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Search with Subcategory and badge
  else if (terms && !price.max && Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearchAndSubCategory/${terms}/${SubCategoryID}/${Badge}`
      )
      .then((response) => {
        console.log("Search with Subcategory and badge");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  //Search with Subcategory, cost and badge
  else if (terms && price.max && Badge && SubCategoryID) {
    axios
      .get(
        `http://localhost:3003/api/product/getProductBySearchAndSubCategory/${terms}/${SubCategoryID}/${Badge}/${price.min}/${price.max}`
      )
      .then((response) => {
        console.log("Search with Subcategory, cost and badge");
        console.log(response.data);
        setSearchData(response.data);
        setSearchDataLoader(false);
      });
  }

  return;
}
