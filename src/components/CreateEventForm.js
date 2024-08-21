"use client";

export default function CreateEventForm() {
    return (
        <div class="container mx-auto p-6">
            <div class="card shadow-xl p-6 bg-base-100">
                <h2 class="text-2xl font-bold mb-4">Create an Event</h2>
                <form>
                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Event Name</span>
                        </label>
                        <input type="text" placeholder="Enter event name" class="input input-bordered" required />
                    </div>

                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
                        <textarea placeholder="Enter event description" class="textarea textarea-bordered" required></textarea>
                    </div>

                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Place</span>
                        </label>
                        <input type="text" placeholder="Enter event place" class="input input-bordered" required />
                    </div>

                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Date</span>
                        </label>
                        <input type="date" class="input input-bordered" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Select Hour</span>
                        </label>
                        <select name="event-hour" className="input input-bordered" required>
                            <option value="">--Select Hour--</option>
                            {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={i}>
                                    {i < 10 ? `0${i}` : i}:00
                                </option>
                            ))}
                        </select>
                    </div>

                    <div class="form-control mb-4">
                        <label class="label">
                            <span class="label-text">Max Capacity</span>
                        </label>
                        <input type="number" placeholder="Enter max capacity" class="input input-bordered" required />
                    </div>

                    <div class="form-control mt-6">
                        <button class="btn btn-primary">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
