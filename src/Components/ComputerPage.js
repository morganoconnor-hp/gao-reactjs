import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ComputerPage = () => {
    const [computers, setComputers] = useState();
    const [attributions, setAttributions] = useState();
    const [customers, setCustomers] = useState();
    const [actionComputer, setActionComputer] = useState(false);
    const [actionAttribution, setActionAttribution] = useState(false);
    const [actionCustomer, setActionCustomer] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateFormated, setDateFormated] = useState(string);

    const schedulesTime = [
        1, 2, 3, 4, 5, 6, 7, 8
    ];

    useEffect(() => {
        setDateFormated('dd/mm/YYY');
    }, [date])

    useEffect(() => {
        axios.get('http://localhost:1030/api/computers')
            .then(res => {
                setComputers(res.data);
            })
        setActionComputer(false);
    }, [actionComputer])

    useEffect(() => {
        axios.get('http://localhost:1030/api/attributions')
            .then(res => {
                setAttributions(res.data);
                console.log(res.data['hydra:member']);
            })
        setActionAttribution(false);
    }, [actionAttribution])

    console.log(attributions);

    useEffect(() => {
        axios.get('http://localhost:1030/api/customers')
            .then(res => {
                setCustomers(res.data);
            })
        setActionCustomer(false);
    }, [actionCustomer])

    console.log(customers);

    function saveComputer(event) {
        event.preventDefault();

        let newFormData = new FormData();
        newFormData.append('name', document.getElementById("InputComputerName").value);

        axios.post('http://localhost:1030/api/computer', newFormData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setActionComputer(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function removeComputer(id) {
        let URL = 'http://localhost:1030/api/computer/' + id;

        axios.delete(URL)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setActionComputer(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function saveCustomer(event) {
        event.preventDefault();

        let newFormData = new FormData();
        newFormData.append('firstname', document.getElementById("InputCustomerFirstName").value);
        newFormData.append('lastname', document.getElementById("InputCustomerLastName").value);
        newFormData.append('email', document.getElementById("InputCustomerEmail").value);

        axios.post('http://localhost:1030/api/customer', newFormData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setActionCustomer(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    function createAssignment(schedule, idComputer) {

        const dateElement = new Date(date);

        let newFormData = new FormData();
        newFormData.append('schedule', schedule);
        newFormData.append('computer', idComputer);
        newFormData.append('customer', document.getElementById("customerSelect" + idComputer + schedule).value);
        newFormData.append('date', dateFormated);

        axios.post('http://localhost:1030/api/assignement', newFormData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setActionAttribution(true);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    let options =
        customers &&
                customers.map(customer =>
                    <option key={customer.id} value={customer.id}>
                        {customer.lastname + ' ' + customer.firstname}
                    </option>
                )

    return (
        <div className="text-gray no-padding-margin">
            <div className="row no-padding-margin">
                <div className="col-md-8 justify-content-start no-padding-margin">
                    <h1>COMPUTERS :</h1>
                </div>
                <div className="col-md-4 no-padding-margin d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-outline-primary mx-2" data-toggle="modal" data-target="#addComputerModal">
                        <p className="no-padding-margin">
                            <i className="fas fa-plus" /> Computer
                        </p>
                    </button>
                    <button type="button" className="btn btn-outline-success mx-2" data-toggle="modal" data-target="#addCustomerModal">
                        <p className="no-padding-margin">
                            <i className="fas fa-plus" /> Customer
                        </p>
                    </button>

                    <div className="modal fade" id="addComputerModal" tabIndex="-1" aria-labelledby="addComputerModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addComputerModalLabel">Add a computer</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <label htmlFor="InputComputerName" className="form-label">Computer name :</label>
                                        <input type="text"
                                               className="form-control"
                                               id="InputComputerName"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={saveComputer}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="addCustomerModal" tabIndex="-1" aria-labelledby="addCustomerModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <form>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addCustomerModalLabel">Add a customer</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <label htmlFor="InputCustomerFirstName" className="form-label">Customer firstname :</label>
                                        <input type="text"
                                               className="form-control"
                                               id="InputCustomerFirstName"
                                        />
                                        <label htmlFor="InputCustomerLastName" className="form-label">Customer lastname :</label>
                                        <input type="text"
                                               className="form-control"
                                               id="InputCustomerLastName"
                                        />
                                        <label htmlFor="InputCustomerEmail" className="form-label">Customer email :</label>
                                        <input type="email"
                                               className="form-control"
                                               id="InputCustomerEmail"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={saveCustomer}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="row no-padding-margin">
                <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </div>
            <div className="row d-flex justify-content-center">
                {computers &&
                    computers.map(computer =>
                        <div className="card width-200px m-1" key={computer.id}>
                            <div className="row no-padding-margin">
                                <div className="col-md-10 no-padding-margin">
                                    <h4 className="text-center">{computer.name}</h4>
                                </div>
                                <div className="col-md-2 no-padding-margin">
                                    <button type="button"
                                            className="btn btn-outline-danger"
                                            id={computer.id}
                                            onClick={() => removeComputer(computer.id)}
                                    >
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                {schedulesTime &&
                                    schedulesTime.map(schedule =>
                                        < li className="list-group-item fs-14px" key={schedule}>
                                            <div className="row">
                                                <div className="col-md-2 no-padding-margin text-center font-weight-bold">
                                                    {schedule + 7}h
                                                </div>
                                                <div className="col-md-6 no-padding-margin">
                                                    ----
                                                    {/*{ getAssignment(computer.id, schedule)}*/}
                                                </div>
                                                <div className="col-md-2 d-flex no-padding-margin">
                                                    <button type="button"
                                                            className="btn btn-outline-success"
                                                            data-toggle="modal" data-target={"#addAssignmentModal-" + computer.id + schedule}
                                                            data-idcomputer={computer.id}
                                                            data-schedule={schedule}
                                                    >
                                                        <i className="fas fa-plus" />
                                                    </button>
                                                    <Button type="button"  className="btn btn-warning">
                                                        <i className="fas fa-minus" />
                                                    </Button>
                                                </div>

                                                <div className="modal fade"
                                                     id={"addAssignmentModal-" + computer.id + schedule}
                                                     tabIndex="-1"
                                                     aria-labelledby="addAssignmentModalLabel"
                                                     aria-hidden="true"
                                                >
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <form>
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id="addAssignmentModalLabel">Add an assignment on : {computer.name} at {schedule + 7}h</h5>
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="form-group">
                                                                        <label htmlFor="customerSelectLabel">Example
                                                                            select</label>
                                                                        <select className="form-control"
                                                                                id={"customerSelect" + computer.id + schedule}
                                                                        >
                                                                            {options}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                    <button type="submit" className="btn btn-primary" data-dismiss="modal" onClick={() => createAssignment(schedule, computer.id)}>Save</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>
    );
}