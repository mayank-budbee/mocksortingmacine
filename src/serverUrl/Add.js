import React, {useState} from "react";
import {Badge, Button, Form, Modal, Spinner} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import serverUrl from "./serverUrl"
import {v4 as uuid} from 'uuid'
import {useNavigate} from 'react-router'
import { MDBRange } from 'mdb-react-ui-kit';

function Add(){
    const [title, setTitle] = useState('');
    const [spinner, setSpinner] = useState(false);

    const [show, setShow] = useState(false);
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        e.target.disabled = true

        setSpinner(true)
        const id = uuid()
        let uniqueId = id.slice(0,8)
        const l = document.getElementById("forLength").value
        const w =  document.getElementById("forWidth").value
        const h =  document.getElementById("forHeight").value

        async function fetchData() {
            const response =  await fetch(
                // 'http://localhost:9001/scan?barcode=12342&L=10&W=20&H=30'
                serverUrl+'/scan?barcode='+title+'&L='+l+'&W='+w+'&H='+h+'&uuid='+uniqueId
            );

            const responseDate = await response.json()
            return responseDate
        }
        fetchData().then(response => {
            setSpinner(false)
            e.target.disabled = false
            // console.log("Scan response: " + JSON.stringify(response))
            if(response.errno){
                // alert(JSON.stringify())
                setHost(response.address)
                setPort(response.port)
                handleShow()
            }
            else {
                history("/")
            }
        });
    }
    return(
        <div>
            <Badge bg="secondary"
                   style={{margin: "40px 5px 5px 10px", padding: "10px 40px 10px 40px"}}>
                <h1>Mock Sorting Machine</h1>
            </Badge>

            <Form className={"d-grid gap-2"} style={{margin: "5rem"}}>
                <Form.Group className={"mb-3"} controlId={"forTitle"}>
                    <Form.Control type={"text"} placeholder={"Scan the barcode"} required
                                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                  onChange={(e) => setTitle(e.target.value)}
                                  autoFocus
                            />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"forLength"}>
                    <MDBRange defaultValue={0.2} min='0' max='1' step='0.01' id='forLength' label='Length (meters)' />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"forWidth"}>
                    <MDBRange defaultValue={0.4} min='0' max='1' step='0.01' id='forWidth' label='Width (meters)'/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"forHeight"}>
                    <MDBRange defaultValue={0.1} min='0' max='1' step='0.01' id='forHeight' label='Height (meters)'/>
                </Form.Group>
                <Button size={"lg"} style={{fontSize: "60px", fontWeight: "Bold"}}
                        onClick={(e) => handleSubmit(e)}
                        type={"submit"}>Submit {' '}
                    {spinner ? <Spinner/> : ''}

                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color: 'red'}}>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Could not connect to terminal server {host}@{port}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </div>
    )
}

export default Add;
