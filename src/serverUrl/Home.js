import React, {Fragment} from "react";
import {Badge, Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import {Link} from "react-router-dom";
import ScannedList from "./scannedList"

function Home() {

    function reload() {
        window.location.reload();
    }

    return (
        <Fragment>
            <Badge bg="secondary"
                   style={{margin: "40px 5px 5px 10px", padding: "10px 40px 10px 40px"}}>
                <h1>Mock Sorting Machine</h1>
            </Badge>

            <Link style={{margin: "2rem 5rem 2rem 5rem"}}

                  className={"d-grid gap-2"} to={'/create'}>
                <Button size={"lg"} style={{fontSize: "60px", fontWeight: "Bold"}}>Scan</Button>
            </Link>

            <ScannedList name={"mayank"}/>
            <Button
                variant="light"
                onClick={reload}
                style={{padding: "0px", margin: "0px"}}
                className="rounded-circle">
                <img
                    src='/refresh-icon-10827.png'
                    alt="Reload"
                    width="250" height="200"
                    style={{padding: "0px", margin: "0px"}}
                />
            </Button>

        </Fragment>
    )
}

export default Home;
