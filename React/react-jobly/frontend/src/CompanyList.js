import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getCompanies() {
            let companies = await JoblyApi.getCompanies();
            setCompanies(companies);
            setIsLoading(false)
        }
        getCompanies();
    }, [])

    async function search(term) {
        setIsLoading(true);
        let companies = await JoblyApi.searchCompanies(term);
        setCompanies(companies);
        setIsLoading(false);
    }

    if(isLoading) {
        return <p>Loading</p>
    }

    return (
        <div className="pt-5">   
            <div className="col-md-8 offset-md-2">
                <SearchForm search={search}/>
                {companies.map(c => (
                    <Link key={c.handle} to={`/companies/${c.handle}`} className="card">
                        <CompanyCard description={c.description} handle={c.handle} name={c.name} logoUrl={c.logoUrl}/>
                    </Link>
                    ))}
            </div>
        </div>
    );
}

export default CompanyList;