import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./CompCard.css";

function CompanyCard({ company }) {
    return (
        <div className="company-card">
            <Link to={`/companies/${company.handle}`}>
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </Link>
        </div>
    );
}