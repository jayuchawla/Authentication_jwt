import axios from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/* reuasable custom hook to invoke any backend api */
export default function useFetch(query) {
    const [data, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        if (!query) {
            return;
        }
        const fetchData = async () => {
            try {
                setData((prev) => {
                    return { ...prev, isLoading: true };
                });

                const { data, status } = await axios.get(`/api/${query}`);

                if (status === 201) {
                    setData((prev) => {
                        return { ...prev, isLoading: false };
                    });
                    setData((prev) => {
                        return { ...prev, apiData: data, status: status };
                    });
                }
                setData((prev) => {
                    return { ...prev, isLoading: false };
                });
            } catch (error) {
                setData((prev) => {
                    return { ...prev, isLoading: false, serverError: error };
                });
            }
        }
        fetchData();
    }, [query]);

    return [data, setData];
}