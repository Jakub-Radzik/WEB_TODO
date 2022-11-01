import { useEffect, useState } from "react";

export enum Keys {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token",
    TOKEN = "token",
    CALENDAR = "calendar",
    USER = "user",
}

export const clearLocalStorage = () => {
    localStorage.clear();
};

function useLocalStorage<T>(key: Keys, initialValue: T | null){
    const [storedValue, setStoredValue] = useState(()=>{
        try{
            const item = window.localStorage.getItem(key);
            if(key === Keys.USER)
                return item ? JSON.parse(item) : initialValue;
            return item ? item : initialValue;
        }catch(error){
            console.log(error);
            return initialValue;
        }
    });

    useEffect(() => {
        if(key === Keys.USER)
            localStorage.setItem(key, JSON.stringify(storedValue));
        localStorage.setItem(key, storedValue); 
    }, [key, storedValue]);

    return [
        storedValue,
        setStoredValue
    ];
}

export default useLocalStorage;