

import { useState } from 'react';

const useLocalStorage = function (key: string, initialValue: any) {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return (item ? JSON.parse(item) : initialValue);
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = function (value: any) {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;