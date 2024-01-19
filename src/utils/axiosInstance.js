import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob"; // <- polyfill here
import dayjs from 'dayjs'

const baseURL = 'https://bookswapplatform.site/bookswap/api/v1/'

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.interceptors.request.use(
    async config => {
        if (!config.headers.Authorization) {
            const authTokens = await localStorage.getItem('authTokens')
            const refeshToken = await localStorage.getItem('refeshToken')
            config.headers.Authorization = `Bearer ${authTokens}`;
            // console.log("Set up header axios:" + config.headers.Authorization); // check token when after refreshing
            // console.log("Set up header axios:" + refeshToken); // check token when after refreshing
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.request.use(
    async (req) => {
        try {
            //?? check cc eo' hieu?
            // if (!authTokens) {
            //     authTokens = localStorage.getItem('authTokens') && null
            //     req.headers.Authorization = `Bearer ${authTokens}`;
            // }

            const authTokens = await localStorage.getItem('authTokens')
            const checkExpiredToken = jwtDecode(JSON.stringify(authTokens));
            // const isExpired = dayjs.unix(1700627987).diff(dayjs()) < 1; // token da het han
            const isExpired = dayjs.unix(checkExpiredToken.exp).diff(dayjs()) < 1; // token con dung duoc

            if (!isExpired) {
                // console.log("token con dung duoc khong can goi ham gi ca")
                return req;
            } else {
                console.log("token het han, refresh token")
                setTimeout(() => {
                    functionRefreshToken()
                }, 1000)

                return req;
            }
        } catch (error) {
            console.error('Error in request interceptor:', error);
            return Promise.reject(error);
        }
    });

const functionRefreshToken = async () => {
    const apiKey = 'AIzaSyBnXZKe_yeTZlRMP0RWnCqbaUQHSAB-nPs';
    const url = 'https://securetoken.googleapis.com/v1/token';
    const refreshToken = await localStorage.getItem('refeshToken')
    const data = `grant_type=refresh_token&refresh_token=${refreshToken}`;
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios.post(`${url}?key=${apiKey}`, data, { headers })
        .then(response => {
            console.log("Refresh token thanh cong ")
            localStorage.setItem('authTokens', response.data.id_token)
            localStorage.setItem('refeshToken', response.data.refresh_token)

        })
        .catch(error => {
            console.error("Refresh token that bai" + error.response);
        });
};

export default axiosInstance;