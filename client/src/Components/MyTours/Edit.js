import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from "../Navbar/Header";

function Edit() {
    const id = useParams()
    const navigate = useNavigate()
    const [tours, setTours] = useState({});
    const [loading, setLoading] = useState(true);
    const [passengerDetails, setPassenger] = useState([]);
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 3);
    var month = todayDate.getMonth() + 1;
    var year = todayDate.getUTCFullYear() - 0;
    var tdate = todayDate.getDate();

    if (month < 10) {
        month = "0" + month;
    }
    if (tdate < 10) {
        tdate = "0" + tdate;
    }
    var maxDate = year + "-" + month + "-" + tdate;
    useEffect(() => {
        setTours({ ...tours, passengers: passengerDetails });
    }, [passengerDetails, setPassenger]);
    const update = (key, e) => {
        return passengerDetails.map((passenger, index) => {
            if (index === key) {
                return { ...passenger, [e.target.name]: e.target.value };
            } else {
                return passenger;
            }
        });
    }
    const SubmitHandle = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9000/payment/bookings/${id.id}`, { fromdate: tours.fromdate, passengers: passengerDetails, todate: tours.todate }).then((resp) => {
            navigate('/mytours')
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/payment/bookings/${id.id}`).then((resp) => {
            setPassenger(resp.data.passengers);
            setLoading(false);
            return setTours(resp.data);
        });
    }, [setTours, id.id]);
    const [user, setUser] = useState({});
    const navItems = [
        {
            title: "Home",
            path: "/index",
        },
        {
            title: "Gallery",
            path: "/index/#gallery",
        },
        {
            title: "Places",
            path: "/places/all",
        },
        {
            title: "Services",
            path: "/index/#services",
        },
    ];
    useEffect(() => {
        const userL = JSON.parse(localStorage.getItem("user"));
        axios
            .get(`http://localhost:9000/users/loguser/${userL.username}`)
            .then((resp) => {
                return setUser(resp.data.user);
            });
    }, []);
    return (
        <div>
            <Header user={user} navItems={navItems} />
            <div>
                <h2>From: {tours.from}</h2>
                <h2>To: {tours.to}</h2>
                <h2>Price: {tours.price}</h2>
                <form onSubmit={SubmitHandle}>
                    {passengerDetails.map((passenger, key) => {
                        return (
                            <div key={key}>
                                <label>Name: </label>
                                <input type="text" name='name' value={passenger.name} onChange={(e) => setPassenger(update(key, e))} />
                                <label name='gender' value={passenger.gender} >Gender:
                                    <select name="gender" onChange={(e) => setPassenger(update(key, e))}>
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                </label>
                                <label>Age: </label>
                                <input type="text" name='age' value={passenger.age} onChange={(e) => setPassenger(update(key, e))} />
                            </div>
                        )
                    })}
                    <input type="Date" name='fromdate' value={tours.fromdate} onChange={(e) => {
                        const fromdate1 = new Date()
                        var todate = new Date(e.target.value);
                        var days = 0;
                        if (tours.days === "Three") { days = 3 }
                        else if (tours.days === "Five") { days = 5 }
                        todate.setDate(todate.getDate() + days);
                        var todate_final = todate.getFullYear() + "-" + (todate.getMonth() + 1) + "-" + todate.getDate();
                        if (new Date(e.target.value).getTime() > new Date(maxDate).getTime()) {
                            setTours({ ...tours, fromdate: e.target.value, todate: todate_final })
                        }
                        else {
                            alert("You cannot select a date from within 3 days from today");
                        }
                    }
                    } />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit