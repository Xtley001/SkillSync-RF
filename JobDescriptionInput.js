import React from 'react';

const JobDescriptionInput = ({ setJobDescription }) => {
  return (
    <div>
      <textarea
        placeholder="Paste the Job Description..."
        onChange={(e) => setJobDescription(e.target.value)}
      ></textarea>
    </div>
  );
};

export default JobDescriptionInput;
