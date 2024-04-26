import React from "react";

// Button for applying to jobs. Will be rendered on job cards.
// Depending on applied status, button may be disabled.
const ApplyButton = ({ applyToJob, hasApplied }) => {
  const handleSubmit = () => {
    applyToJob();
  };

  return (
    <>
      <button
        type="button"
        className={`btn ${hasApplied ? 'btn-secondary' : 'btn-primary'}`}
        onClick={handleSubmit}
        disabled={hasApplied}
      >
        {hasApplied ? "Applied" : "Apply Now"}
      </button>
    </>
  );
};

export default ApplyButton;
