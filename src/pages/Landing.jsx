import Categories from "../components/Categories";
import FeaturedSeller from "../components/FeaturedSeller";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Newsletter from "../components/Newsletter";
import Title from "../components/Title";
import TopSellers from "../components/TopSellers";

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
