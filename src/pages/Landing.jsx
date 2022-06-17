import Categories from "../compontents/Categories";
import FeaturedSeller from "../compontents/FeaturedSeller";
import Footer from "../compontents/Footer";
import Header from "../compontents/Header";
import Newsletter from "../compontents/Newsletter";
import Title from "../compontents/Title";
import TopSellers from "../compontents/TopSellers";

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
