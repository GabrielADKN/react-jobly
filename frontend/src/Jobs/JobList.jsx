import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from './JobCard';

function JobList() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs() {
            try {
                const res = await JoblyApi.getJobs();
                setJobs(res);
            } catch (err) {
                console.error("Failed to load jobs", err);
            }
        }

        getJobs();
    }, []);

    return (
        <div className="job-list">
            <h1>Jobs</h1>
            {jobs.length > 0 ? (
                jobs.map(job => <JobCard key={job.id} job={job} />)
            ) : (
                <p>No jobs available.</p>
            )}
        </div>
    );
}

export default JobList;
