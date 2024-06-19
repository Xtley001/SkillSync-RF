import React from 'react';

const ResumeUploader = ({ setResumeFile }) => {
  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setResumeFile(e.target.files[0])}
      />
    </div>
  );
};

export default ResumeUploader;
