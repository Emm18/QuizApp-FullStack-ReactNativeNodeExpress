import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance = axios.create({
    baseURL: 'NGROK LINK HERE'
});

//this will run before making the API request
instance.interceptors.request.use(
    async (config) => {
        //before request
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (err) => {
        //on error
        return Promise.reject(err);
    }
);

export default instance;