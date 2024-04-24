import React from 'react';
import './JobCard.css';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
    return (
        <div className="job-card">
            <Link to={`/jobs/${job.id}`}>
                <h2>{job.title}</h2>
                <p><strong>Salary:</strong> {job.salary ? `$${job.salary}` : "Not disclosed"}</p>
                <p><strong>Equity:</strong> {job.equity ? job.equity : "None"}</p>
            </Link>
        </div>
    );
}