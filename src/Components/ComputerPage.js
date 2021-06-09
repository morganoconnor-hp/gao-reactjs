import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";

export function ComputerPage() {

    const schedulesTime = [
        1, 2, 3, 4, 5, 6, 7, 8
    ]
    const [computers, setComputers] = useState();

    useEffect(() => {
        axios.get('http://localhost:1030/api/computers')
            .then(res => {
                setComputers(res.data);
            })
    }, [])

    return (
        <div className="d-flex text-gray">
            {( computers ) &&
                computers.map(computer =>
                    <div className="card width-200px m-1" key={computer.id}>
                        <h4>{computer.name}</h4>
                        <ul className="list-group list-group-flush">
                            {schedulesTime &&
                                schedulesTime.map(schedule =>
                                        < li className="list-group-item fs-16px" key={schedule}>
                                            <div className="row">
                                                <div className="col-md-2 no-padding-margin">
                                                    {schedule + 7}
                                                </div>
                                                <div className="col-md-6 no-padding-margin">
                                                    ---
                                                </div>
                                                <div className="col-md-2 d-flex no-padding-margin">
                                                    <button type="button"
                                                            className="btn btn-outline-success"
                                                            data-toggle="modal"
                                                            data-target="#assignCustomerModal">
                                                        <i className="fas fa-plus" />
                                                    </button>
                                                    <Button className="btn btn-outline-warning">
                                                        <i className="fas fa-minus" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                )
            }
            <div className="modal fade" id="assignCustomerModal" tabIndex="-1" role="dialog"
                 aria-labelledby="assignCustomerModalTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="assignCustomerModalLongTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}