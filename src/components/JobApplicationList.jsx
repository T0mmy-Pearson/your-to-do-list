import React from "react";
import JobApplicationItem from "./JobApplicationItem";

export default function JobApplicationList({ applications, handleUpdateApplication, handleDeleteApplication }) {
    // Group applications by date
    const groupedApplications = applications.reduce((groups, application) => {
        const date = application.dateApplied;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(application);
        return groups;
    }, {});

    // Sort dates in descending order (newest first)
    const sortedDates = Object.keys(groupedApplications).sort((a, b) => new Date(b) - new Date(a));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="main">
            {sortedDates.map(date => (
                <div key={date} className="dateGroup">
                    <h2 className="dateHeader">{formatDate(date)}</h2>
                    <div className="applicationsGroup">
                        {groupedApplications[date].map(application => (
                            <JobApplicationItem
                                key={application.id}
                                application={application}
                                handleUpdateApplication={handleUpdateApplication}
                                handleDeleteApplication={handleDeleteApplication}
                            />
                        ))}
                    </div>
                </div>
            ))}
            {applications.length === 0 && (
                <p className="emptyState">No job applications yet. Add your first application above!</p>
            )}
        </div>
    );
}