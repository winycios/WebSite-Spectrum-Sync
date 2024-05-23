import { useState, useRef } from 'react';

const useStack = (initialValue = null) => {
    const [data, setData] = useState([]);
    const top = useRef(-1);

    const push = (value) => {
        if (data.includes(value)) {
            return;
        }

        top.current++;
        setData((prevData) => {
            const newData = [...prevData];
            newData[top.current] = value;
            return newData;
        });
    };


    const pop = () => {
        if (top.current < 0) {
            return false;
        } else {
            const itemToReturn = data[top.current];
            const newData = data.slice(0, top.current);
            top.current--;
            setData(newData);
            return itemToReturn;
        }
    };

    if (initialValue && top.current === -1) {
        push(initialValue);
    }

    return {
        push,
        pop,
        data,
    };
};

export default useStack;
