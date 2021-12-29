import React, { useContext, useState, useEffect } from "react";
import { Button, CardBody, CardTitle } from "reactstrap";
import UserContext from "./UserContext";

const JobCard = ({ title, salary, equity, id }) => {
    const { apply, currUser, hasApplied } = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateApplied() {
        setApplied(hasApplied(id));
    }, [id, hasApplied])

    const handleClick = () => {
        if (hasApplied(id)) return;
        apply(currUser.username, id);
    }
    return (
        <CardBody>
            <CardTitle>{title}</CardTitle>
                <div>
                    <small>
                        Salary: {salary}
                    </small>
                </div>
                <div>
                    <small>
                        Equity: {equity}
                    </small>
                </div>
                <Button onClick={handleClick}>{applied ? `Applied` : `Apply`}</Button>
        </CardBody>
)
}

export default JobCard;