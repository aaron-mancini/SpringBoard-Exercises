import React from "react";
import JobCard from "./JobCard";

const JobCardList = ({ jobs }) => {

    return (
        <div>
            { jobs.map(j => <JobCard key={j.id} title={j.title} salary={j.salary} equity={j.equity} id={j.id}/>) }
        </div>
    )
}

export default JobCardList;