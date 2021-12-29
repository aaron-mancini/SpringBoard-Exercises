import React from "react";
import { CardBody, CardTitle, CardText } from "reactstrap";

const CompanyCard = ({ description, handle, logoUrl, name }) => {
    let logo = logoUrl ? <img src={logoUrl} alt={name}/> : null
    return (
            <CardBody>
                <CardTitle>{name}{logo}</CardTitle>
                <CardText>{description}</CardText>
            </CardBody>
    )
}

export default CompanyCard;