import { useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { useContext, useState, useEffect } from "react";
import JoblyApi from "../api/api";
import JobCard from "../jobs/JobCard";

import ProfileUpdateForm from "../profiles/ProfileUpdateForm";

// User's profile page.
const Profile = () => {
  const { username } = useParams();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [initialFormData, setInitialFormData] = useState({ ...currentUser });

  // Set initial form data based on user
  useEffect(() => {
    setInitialFormData(() => currentUser);
    setIsLoading(false);
  }, [currentUser]);

  const updateProfile = async (formData) => {
    try {
      let res = await JoblyApi.updateProfile(username, formData);
      setIsLoading(true);
      setCurrentUser(() => res);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <>
      {!isLoading && currentUser && (
        <div>
          <h1>Hello {currentUser.firstName}</h1>
          
          <ProfileUpdateForm
            INITIAL_FORM_DATA={initialFormData}
            updateProfile={updateProfile}
          />

          <h3>Here are the jobs you have applied to:</h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentUser.jobs &&
              currentUser.jobs.map((job) => (
                <div key={job.id} className="col">
                  <JobCard id={job.id} title={job.title} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
