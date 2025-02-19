import UseAdmin from "../../Hooks/UseAdmin";
import UseHr from "../../Hooks/UseHr";
import OverviewAdmin from "./OverviewAdmin";
import OverviewEmployee from "./OverviewEmployee";
import OverviewHr from "./OverviewHr";

const Overview = () => {
  const [isAdmin] = UseAdmin();
  const [isHr] = UseHr();
  
  if (isAdmin) {
    return <OverviewAdmin />;
  } else if (isHr) {
    return <OverviewHr />;
  } else {
    return <OverviewEmployee />;
  }
};
export default Overview