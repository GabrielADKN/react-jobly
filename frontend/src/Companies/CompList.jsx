import React, { useState, useEffect } from "react";
import CompanyCard from "./CompCard";
import JoblyApi from "../api";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        searchCompanies();
    }, []);

    async function searchCompanies() {
        try {
            const res = await JoblyApi.getCompanies({ search });
            setCompanies(res.companies);
        } catch (err) {
            console.error("Search failed", err);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        searchCompanies();
    }

    return (
        <div className="company-list">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter company name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {companies.map(company => (
                <CompanyCard key={company.handle} company={company} />
            ))}
        </div>
    );
}

export default CompanyList;