import JobApplicationInput from "./components/JobApplicationInput";
import JobApplicationList from "./components/JobApplicationList";
import { useState, useEffect } from "react";

function App() {
  const [applications, setApplications] = useState([]);
  const [applicationData, setApplicationData] = useState({
    company: "",
    position: "",
    status: "applying"
  });

  function persistData(newList) {
    localStorage.setItem("jobApplications", JSON.stringify({ applications: newList }));
  }

  function handleAddApplication(newApplication) {
    const newApplicationsList = [...applications, newApplication];
    persistData(newApplicationsList);
    setApplications(newApplicationsList);
  }

  function handleUpdateApplication(id, updatedApplication) {
    const newApplicationsList = applications.map(app => 
      app.id === id ? updatedApplication : app
    );
    persistData(newApplicationsList);
    setApplications(newApplicationsList);
  }

  function handleDeleteApplication(id) {
    const newApplicationsList = applications.filter(app => app.id !== id);
    persistData(newApplicationsList);
    setApplications(newApplicationsList);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localApplications = localStorage.getItem("jobApplications");
    if (!localApplications) {
      return;
    }

    localApplications = JSON.parse(localApplications).applications;
    setApplications(localApplications);
  }, []);

  return (
    <>
      <JobApplicationInput 
        applicationData={applicationData} 
        setApplicationData={setApplicationData} 
        handleAddApplication={handleAddApplication} 
      />
      <JobApplicationList 
        applications={applications}
        handleUpdateApplication={handleUpdateApplication}
        handleDeleteApplication={handleDeleteApplication}
      /> 
    </>
  );
}

export default App;