import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResponseDisplay from './components/ResponseDisplay';
import axios from 'axios';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('job_description', jobDescription);
    formData.append('resume', resumeFile);

    try {
      const res = await axios.post('http://localhost:5000/process', formData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <div className="App">
      <h1>SkillSync</h1>
      <JobDescriptionInput setJobDescription={setJobDescription} />
      <ResumeUploader setResumeFile={setResumeFile} />
      <button onClick={handleSubmit}>Submit</button>
      {response && <ResponseDisplay response={response} />}
    </div>
  );
}

export default App;
