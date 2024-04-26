import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import { useState, useEffect } from "react";
import JobCard from "../jobs/JobCard";

// Page for a single company
// Should have the company description and a list of jobs for this company
const Company = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany(handle) {
      try {
        let res = await JoblyApi.getCompany(handle);
        setCompany(res);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch company", error);
      }
    }

    setIsLoading(true);
    getCompany(handle);
  }, [handle]);

  if (isLoading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!company) {
    return <div className="container mt-5">Company not found.</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-3">{company.name}</h1>
      <p className="mb-3">{company.description}</p>
      <h3 className="mt-4 mb-3">Jobs at {company.name}:</h3>
      <div className="row">
        {company.jobs && company.jobs.length > 0 ? (
          company.jobs.map(({ id, title, salary, equity }) => (
            <div key={id} className="col-md-4 mb-3">
              <JobCard
                key={id}
                title={title}
                salary={salary}
                equity={equity}
              />
            </div>
          ))
        ) : (
          <p className="col">No jobs listed.</p>
        )}
      </div>
    </div>
  );
};

export default Company;
