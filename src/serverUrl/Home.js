import React, {Fragment} from "react";
import {Badge, Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom";
import ScannedList from "./scannedList"


function Home() {

    return (
        <Fragment>
            <Badge bg="secondary" style={{margin: "40px 10px 10px 10px", padding: "10px 40px 10px 40px"}}><h1>Mock Sorting Machine</h1></Badge>

            <Link style={{margin: "2rem 5rem 2rem 5rem"}} className={"d-grid gap-2"} to={'/create'}>
                <Button size={"lg"}>Scan</Button>
            </Link>

                <ScannedList name={"mayank"}/>
        </Fragment>
    )
}
export default Home;
