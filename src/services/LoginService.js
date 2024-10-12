import axios from 'axios';

const API_URL = 'http://localhost:8010'; 

const loginS = async (username, password) => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/login`,  {params :{
            username,
            password

    }});
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const signupS = async (username, password, phone_no, email) => {
    try {
        const response = await axios.get(`${API_URL}/api/auth/register` , 
            {
            params: {
                username,
                password,
                phone_no,
                email
            },
        });
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};


const busListS = async (sourceCode, destinationCode, passengers) => {

    try {
        const response = await axios.get(`${API_URL}/buses`, {params: {
            sourceCode, destinationCode

    }});
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const ticketG = async (sourceCode, destinationCode, passengers) => {

    try {
        const response = await axios.get(`${API_URL}/generateQRCode`, {params: {
            sourceCode, destinationCode

    }});
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const fleetS = async () => {

    try {
        const response = await axios.get(`${API_URL}/vehicles`);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

const fleetLin = async (licensePlate) => {

    try {
        const response = await axios.get(`${API_URL}/vbl`,{params: {
            licensePlate}});
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};



const authService = {loginS, signupS, busListS,ticketG,fleetS,fleetLin};

export default  authService;
