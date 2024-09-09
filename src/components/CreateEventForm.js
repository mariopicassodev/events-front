"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createEvent } from "@/services/create-event";
import Toast from "./Toast";

export default function CreateEventForm( {dictionary} ) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [toast, setToast] = useState({ message: "", type: "", visible: false });

    const onSubmit = data => {

        createEvent(data.eventName, data.description, data.place, `${data.date}T${data.hour}:00Z`, data.fee, data.maxCapacity)
            .then(response => {
                if (response.status === 200) {
                    //alert("Event created successfully");
                    setToast({ message: "Event created successfully", type: "success", visible: true });
                }
                else {
                    //alert("Error creating event");
                    setToast({ message: `Error creating event\n ${response.status}: ${response.statusText}`, type: "error", visible: true });
                }
            });
    };

    const handleCloseToast = () => {
        setToast({ ...toast, visible: false });
    };


    return (
        <div className="container mx-auto p-6">
            <div className="card shadow-xl p-6 bg-base-100">
                <h2 className="text-2xl font-bold mb-4">{dictionary.createEvent.title}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.name}</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter event name"
                            className="input input-bordered"
                            {...register("eventName", { required: "Event Name is required" })}
                        />
                        {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message}</p>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.description}</span>
                        </label>
                        <textarea
                            placeholder={dictionary.createEvent.descPlaceholder}
                            className="textarea textarea-bordered"
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.location}</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter location"
                            className="input input-bordered"
                            {...register("place", { required: "Location is required" })}
                        />
                        {errors.place && <p className="text-red-500 text-sm">{errors.place.message}</p>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.date}</span>
                        </label>
                        <input
                            type="date"
                            className="input input-bordered"
                            {...register("date", { required: "Date is required" })}
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.time}</span>
                        </label>
                        <input
                            type="time"
                            className="input input-bordered"
                            {...register("hour", { required: "Hour is required" })}
                        />
                        {errors.hour && <p className="text-red-500 text-sm">{errors.hour.message}</p>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.capacity}</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter max capacity"
                            className="input input-bordered"
                            {...register("maxCapacity", { required: "Max Capacity is required", min: { value: 1, message: "Max Capacity must be at least 1" } })}
                        />
                        {errors.maxCapacity && <p className="text-red-500 text-sm">{errors.maxCapacity.message}</p>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">{dictionary.createEvent.fee}</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter fee"
                            className="input input-bordered"
                            {...register("fee", { required: "Fee is required", min: { value: 0, message: "Fee must be at least 0" } })}
                        />
                        {errors.maxCapacity && <p className="text-red-500 text-sm">{errors.maxCapacity.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary">{dictionary.createEvent.submit}</button>
                </form>
            </div>
            {toast.visible && <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />}
        </div>
    );
}
