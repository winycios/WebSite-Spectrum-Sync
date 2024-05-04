import React, { useState, useEffect, useCallback } from 'react';
import { Person } from 'react-bootstrap-icons';
import Api from '../../../api';
import { getId } from '../../../service/auth';

const FindImage = () => {
    const [userData, setUserData] = useState({
        img: null,
        loading: true,
        error: null
    });

    const fetchData = useCallback(async () => {
        try {
            const response = await Api.get(`usuarios/${getId()}`);
            setUserData({ img: response.data.img, loading: false, error: null });
        } catch (error) {
            setUserData({ img: null, loading: false, error: error.message });
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const { img, loading, error } = userData;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                Error: {error}
                <button onClick={fetchData}>Reload</button>
            </div>
        );
    }

    return (
        <>
            {img ? (
                <img src={img} alt="User" />
            ) : (
                <Person color="white" size={30} />
            )}
        </>
    );
};

export default FindImage;
