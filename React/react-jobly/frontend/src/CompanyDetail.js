import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";

const CompanyDetail = () => {
    const { handle } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});
    
    useEffect(() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company);
            setIsLoading(false);
        }
        getCompany();
    }, [handle]) 

    if(isLoading) {
        return <p>Loading</p>
    }

    return (
        <div className="pt-5">
            <div className="CompanyDetial col-md-8 offset-md-2">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
                <JobCardList jobs={company.jobs}/>
            </div>
        </div>
    )
}

export default CompanyDetail;