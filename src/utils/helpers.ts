import { AxiosError } from 'axios';
import api from '../services/api';

export const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const serviceErrorHandler = (err: AxiosError): string => {
    if (typeof err === 'string') return err;

    if (err.response?.data) {
        if ('errors' in err.response.data) {
            return err.response.data.errors[0].message;
        }

        if ('message' in err.response.data) {
            return err.response.data.message;
        }
    }

    if (typeof err === 'object') {
        if (err.message) return err.message;

        if ('message' in err.response.data) return err.response.data.message;
    }

    return JSON.stringify(err);
};


export const setApiAuth = (token: string): void => {
    api.defaults.headers.authorization = `Bearer ${token}`;
};


export const getApiUrl = (): string => {
    if (process.env.REACT_APP_POINT_TO === 'production')
        return process.env.REACT_APP_API_PROD;
    if (process.env.REACT_APP_POINT_TO === 'development')
        return process.env.REACT_APP_API_DEV;

    return process.env.REACT_APP_API_TEST;
};

export const getSiteUrl = (): string => {
    if (process.env.REACT_APP_POINT_TO === 'production')
        return process.env.REACT_APP_SITE_URL_PROD;

    return process.env.REACT_APP_SITE_URL_DEV;
};
