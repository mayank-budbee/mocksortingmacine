// https://www.pluralsight.com/guides/fetch-data-from-a-json-file-in-a-react-app
import React,{useState,useEffect} from 'react';
import {Button, Table} from "react-bootstrap";
import serverUrl from "./serverUrl"
import {useNavigate} from "react-router";

function ScannedList() {
    let history = useNavigate();
    const [data,setData]=useState([]);

    const handleDelete = (parcel) => {
        async function fetchData() {
            const response = await fetch(
                serverUrl + '/delete?barcode='+parcel.title
            );
            return response;
        }
        fetchData().then(response => {
            history("/")
        });

    }

    const getData=()=>{
        fetch(serverUrl+'/getAll'
            ,{
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
            .then(function(response){
                console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                console.log(myJson);
                setData(myJson)
            });
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <div className="App">

            <div style={{margin: "1rem 5rem 1rem 5rem"}}>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>

                        <th>Bar Code</th>
                        <th>L W H (meters)</th>
                        <th>Lane</th>
                        {/*<th>Action</th>*/}
                    </tr>
                    </thead>
                    <tbody>

                    {
                        data && data.length > 0 ?
                            data.map((item => <tr key={item.uuid}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.lane}</td>
                                {/*<td>*/}
                                {/*    <Button variant="danger"*/}
                                {/*            onClick={() => handleDelete(item)}>Delete</Button>{' '}*/}
                                {/*</td>*/}
                            </tr>))
                            :
                            <tr><td colSpan={3}>{"No scanned parcels found"}</td></tr>

                    }
                    </tbody>
                </Table>
                <br/>
                {/*<ScannedList name={"mayank"}/>*/}
            </div>
        </div>
    );
}

export default ScannedList;
