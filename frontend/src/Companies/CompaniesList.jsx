import { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import CompanyCard from '../companies/CompanyCard';

// Displays a list of companies and their information
// Protect this route with auth. If not logged in, redirect somewhere else

const CompaniesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);
  const [searchBox, setSearchBox] = useState("");

  // Get the list of companies
  useEffect(() => {
    let nameFilter = searchBox && `?name=${searchBox}`;

    async function getCompanies() {
      try {
        let res = await JoblyApi.getAllCompanies(nameFilter);
        setCompanyList(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCompanies();
  }, [searchBox]);

  const handleChange = (e) => {
    setSearchBox(e.target.value);
  };

  return (
    <>
      <div className="m-4">
        <h1 className="display-4">Companies</h1>
        <form>
          <input
            className="form-control"
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Search for a company"
            onChange={handleChange}
          />
        </form>
      </div>

      <div className="container my-4">
        {isLoading ? (
          <div className="alert alert-info">Loading...</div>
        ) : (
          <div className="row">
            {companyList.map(company => (
              <div key={company.handle} className="col-12 col-md-6 col-lg-4 mb-3">
                <CompanyCard
                  handle={company.handle}
                  numEmployees={company.numEmployees}
                  name={company.name}
                  description={company.description}
                  logoUrl={company.logoUrl}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CompaniesList;
