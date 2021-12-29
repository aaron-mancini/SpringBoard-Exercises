import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getJobs() {
            let jobs = await JoblyApi.getAllJobs();
            setJobs(jobs);
            setIsLoading(false);
        }
        getJobs();
    }, [])

    async function search(term) {
        setIsLoading(true);
        let jobs = await JoblyApi.searchJobs(term);
        setJobs(jobs);
        setIsLoading(false);
    }

    if(isLoading) {
        return <p>Loading</p>
    }

    return (
        <div className="pt-5">
            <div className="JobList col-md-8 offset-md-2">
                <SearchForm search={search}/>
                <JobCardList jobs={jobs}/>
            </div>
        </div>
    )
}

export default JobList;