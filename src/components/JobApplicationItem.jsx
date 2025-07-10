import React from "react";

export default function JobApplicationItem({ application, handleUpdateApplication, handleDeleteApplication }) {
    const getStatusColor = (status) => {
        const colors = {
            'applying': '#fbbf24',
            'applied': '#3b82f6',
            'awaiting-interview': '#8b5cf6',
            'interviewed': '#06b6d4',
            'awaiting-response': '#f59e0b',
            'offer': '#10b981',
            'rejected': '#ef4444'
        };
        return colors[status] || '#6b7280';
    };

    const handleStatusChange = (newStatus) => {
        handleUpdateApplication(application.id, { ...application, status: newStatus });
    };

    const handleHeardBackChange = (checked) => {
        handleUpdateApplication(application.id, { ...application, heardBack: checked });
    };

    return (
        <div className="applicationItem">
            <div className="applicationInfo">
                <h3>{application.company}</h3>
                <p>{application.position}</p>
            </div>
            
            <div className="statusContainer">
                <select
                    value={application.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    style={{ backgroundColor: getStatusColor(application.status) }}
                >
                    <option value="applying">Applying</option>
                    <option value="applied">Applied</option>
                    <option value="awaiting-interview">Awaiting Interview</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="awaiting-response">Awaiting Response</option>
                    <option value="offer">Offer Received</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div className="heardBackContainer">
                <label>
                    <input
                        type="checkbox"
                        checked={application.heardBack}
                        onChange={(e) => handleHeardBackChange(e.target.checked)}
                    />
                    Heard back
                </label>
            </div>

            <div className="actionsContainer">
                <button onClick={() => handleDeleteApplication(application.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}