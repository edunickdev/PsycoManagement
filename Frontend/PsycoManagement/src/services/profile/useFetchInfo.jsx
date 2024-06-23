import { useEffect, useState } from "react";
import { useInfoProfile } from "../../context/stores";


const useFetchInfo = () => {
    const setCurrentInfo = useInfoProfile((state) => state.setInfoProfile);
    const myInfo = useInfoProfile((state) => state.infoProfile);
    const [loading, setLoading] = useState(true);

    const getInfo = async () => {
        const response = await fetch("http://localhost:8000/profile/65970878e735e51b693588a9");
        const data = await response.json();
        setCurrentInfo(data);
        setLoading(false);
    }
    
    useEffect(() => {
        getInfo();
    }, []);
    
    return { myInfo, loading };
};

export default useFetchInfo;