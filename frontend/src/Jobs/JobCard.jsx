import ApplyButton from "../common/ApplyButton";
import JoblyApi from "../api/api";
import UserContext from "../auth/UserContext";
import { useContext, useState } from "react";

const JobCard = ({ title, salary, equity, id, companyName }) => {
  const { currentUser } = useContext(UserContext);
  const { applications } = currentUser;

  // For each job, evaluate if the user has applied or not.
  const [hasApplied, setHasApplied] = useState(applications && applications.includes(id));

  // Function to apply to a job using Jobly API.
  const applyToJob = async () => {
    try {
      await JoblyApi.applyToJob(currentUser.username, id);
      console.log("You applied to job", id, title);
      setHasApplied(true);
    } catch (error) {
      console.error("Error applying:", error);
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{companyName}</h6>
        {salary && salary !== 0 ? (
            <p className="card-text">
              ${salary} salary & {(equity * 100).toFixed(2)}% equity
            </p>
          ) : (
            <p className="card-text">No information available</p>
          )}
        <ApplyButton applyToJob={applyToJob} hasApplied={hasApplied} />
      </div>
    </div>
  );
};

export default JobCard;
