import axios from "axios";

// const baseURL = 'https://b9bf2244ef22.ngrok.io/api/'
const baseURL = "http://production.i-host.com.bd/api/";
const authToken = localStorage.getItem("token");

export default axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `${authToken ? "Token " + authToken : ""}`
    }
    // You can add your headers here
});