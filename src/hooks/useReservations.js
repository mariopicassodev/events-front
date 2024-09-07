import { useState, useEffect, useCallback } from "react";
import { getMyReservations } from '@/services/get-my-reservations';

export const useReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const getReservations = useCallback(async () => {
        try {
            const response = await getMyReservations();
            setReservations(response.data.data.userReservations);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getReservations();
    }, [getReservations]);

    return { reservations, loading, refetch: getReservations };
};
