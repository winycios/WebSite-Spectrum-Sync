import React, { useState, useEffect } from 'react';
import Api from '../../../api';
import { Person } from 'react-bootstrap-icons';
import { getId } from '../../../service/auth';

export const FindImage = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`usuarios/${getId()}`);
                setImg(response.data.img);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {img ? (
                <img src={img} alt="Foto do usuário" />
            ) : (
                <Person color="white" size={30} />
            )}
        </>
    );
};

export default FindImage;
