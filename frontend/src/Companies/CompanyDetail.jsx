import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';

function CompanyDetail() {
    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        async function getCompanyAndJobs() {
            try {
                const companyRes = await JoblyApi.getCompany(handle);
                const jobsRes = await JoblyApi.getCompanyJobs(handle);
                setCompany(companyRes);
                setJobs(jobsRes);
            } catch (err) {
                console.error("Failed to load company or jobs", err);
            }
        }

        getCompanyAndJobs();
    }, [handle]);

    if (!company) return <div>Loading...</div>;

    return (
        <div className="company-detail">
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <div>
                <h3>Jobs at {company.name}</h3>
                {jobs.length > 0 ? (
                    <ul>
                        {jobs.map(job => (
                            <li key={job.id}>
                                {job.title} - {job.salary && `$${job.salary}`} - {job.equity && `Equity: ${job.equity}`}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No jobs listed for this company.</p>
                )}
            </div>
        </div>
    );
}

export default CompanyDetail;
