import axios from "axios";

const baseURL = "http://ihost.techrapples.com/api/";
const authToken = localStorage.getItem("token");

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken ? "Token " + authToken : ""}`
    }
    // You can add your headers here
});