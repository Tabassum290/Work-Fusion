import Worksheetform from "./Worksheetform";
import WorksheetTable from "./WorksheetTable";

const Worksheet = () => {
    return (
        <div className="max-w-[1100px] mx-auto p-4 sm:p-8">
          <Worksheetform/>
          <WorksheetTable/>
        </div>
    );
};

export default Worksheet;