import Categories from "./Categories";
import FeaturedSeller from "./FeaturedSeller";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Newsletter from "../../components/NewsLetterComponent";
import Title from "./Title";
import TopSellers from "./TopSellers";

function Landing(props) {
  return (
    <>
      <Header />
      <Title />
      <Categories />
      <TopSellers />
      <FeaturedSeller />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Landing;
