import axios from "axios";
// development mode
// const baseURL = "http://ihost.techrapples.com/api/";

// production mode
const baseURL = "http://production.i-host.com.bd/api/";

// auth token
const authToken = localStorage.getItem("token");

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken ? "Token " + authToken : ""}`
    }
    // You can add your headers here
});