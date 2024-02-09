import React from "react";
import ListingDisplay from "./ListingDisplay";
import Prerequisites from "./Prerequisites";
import ApplicationForm from "./ApplicationForm";
import Header from "../Header";
import { data } from "./ListingData";
import { Link, useParams } from "react-router-dom";

const IndividualListing = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  console.log(id);
  // Find the listing with the matching id
  const listingData = data.find((item) => item.id === parseInt(id));
  const roles = {
    instructionalDesigner: listingData.instructionalDesigner,
    softwareEngineer: listingData.softwareEngineer,
    softwareQualityEngineer: listingData.softwareQualityEngineer,
  };
  const [preRequisite, setPreRequisite] = React.useState(true);
  console.log(preRequisite);
  function togglePrerequisite(e) {
    e.preventDefault();
    setPreRequisite((prev) => {
      return !prev;
    });
  }
  const [applicationData, setApplicationData] = React.useState({
    id: id,
    timeSlot: 1,
    prefferedIstructionalDesigner: true,
    prefferedSoftwareEngineer: true,
    prefferedSoftwareQualityEngineer: true,
    updatedResume: null,
  });
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    // console.log("name", name, value);

    setApplicationData((prevData) => {
      if (type === "file") {
        // console.log(event.target.files[0]);
        return {
          ...prevData,
          [name]: event.target.files[0],
        };
      }
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function handleForm(event) {
    event.preventDefault();
    console.log(applicationData);
  }
  return (
    <div className="head_body_footer">
      <Header />
      <form class="listing_tab">
        <ListingDisplay
          apply={true}
          handleForm={handleForm}
          data={listingData}
        />
        <div class="Pre-requisites-head-tab">
          <h3>Pre-requisites & Application Process</h3>
          <button
            className={`transparent_button  ${preRequisite ? "rotated" : ""}`}
            onClick={togglePrerequisite}
          >
            <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
          </button>
        </div>
        {preRequisite && (
          <div className="listing transition">
            <Prerequisites data={listingData.PreRequisitesApplicationProcess} />
          </div>
        )}
        <ApplicationForm
          applicationData={applicationData}
          handleChange={handleChange}
          // id={id}
          timeSlots={listingData.timeSlots}
          roles={roles}
        />
      </form>
      <div></div>
    </div>
  );
};

export default IndividualListing;
