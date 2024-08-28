"use client"
import { useState } from "react";
import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        // Cleanup the timer if the component unmounts before the timer completes
        return () => clearTimeout(timer);
    }, [onClose]);

    if (type === "error") {
        return (
            <div className="toast toast-top toast-end">
                <div className="alert alert-error">
                    <span>{message}</span>
                </div>
            </div>
        );
    }

    else if (type === "success") {
        return (
            <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>{message}</span>
                </div>
            </div>
        );
    }

    else if (type === "warning") {
        return (
            <div className="toast toast-top toast-end">
                <div className="alert alert-warning">
                    <span>{message}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="toast toast-top toast-end">
            <div className={"alert alert-info"}>
                <span>{message}</span>
            </div>
        </div>

    );
}
