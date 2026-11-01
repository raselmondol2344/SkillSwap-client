import Banner from "./component/Banner";
import HighPayingTask from "./component/HighPayingTask";
import HowItWorks from "./component/HowItWorks";
import PopularCategories from "./component/PopularCategories";
import TopFreelancer from "./component/TopFreelancer";

export const instant = false;
export default function Home() {

  return (
    <div>
    <Banner></Banner>

    <HighPayingTask></HighPayingTask>

    <TopFreelancer></TopFreelancer>
    <HowItWorks></HowItWorks>
    <PopularCategories></PopularCategories>
    </div>
  );
}
