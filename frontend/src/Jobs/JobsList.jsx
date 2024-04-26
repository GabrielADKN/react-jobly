import { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import { useContext } from "react";
import UserContext from "../auth/UserContext";
import JobCard from "../jobs/JobCard"; // Assuming JobCard is also using Bootstrap if needed

const JobsList = () => {
  const { currentUser } = useContext(UserContext);

  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await JoblyApi.getAllJobs();
        setJobsList(res);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }
    getJobs();
  }, [currentUser.applications]);

  return (
    <div className="container mt-5">
      <div className="m-3">
        <h1 className="text-5xl">Jobs</h1>
      </div>

      {error && <div className="alert alert-danger">Something went wrong: {error}</div>}
      {isLoading && <div className="alert alert-info">Loading...</div>}
      {!isLoading && !error && (
        <div className="row justify-content-center">
          {jobsList.map(({ id, title, salary, equity, companyName }) => (
            <div key={id} className="col-md-4 mb-3">
              <JobCard
                id={id}
                title={title}
                salary={salary}
                equity={equity}
                companyName={companyName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;
