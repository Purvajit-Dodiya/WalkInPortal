import React from "react";
import ListingDisplay from "./ListingDisplay";
import Prerequisites from "./Prerequisites";
import ApplicationForm from "./ApplicationForm";
import JobRolesDetails from "./JobRolesDetails";
import Header from "../Header";
import { data } from "./ListingData";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const IndividualListing = () => {
  const isLoggedIn = () => {
    const token = Cookies.get("walkInToken");

    if (!token) {
      window.location.href = "/login";
      return false;
    }

    return true;
  };
  if (isLoggedIn()) {
  }
  const { id } = useParams();
  console.log(id);
  const [listingDetails, setListingDetails] = React.useState(null);
  React.useEffect(() => {
    const fetchListingDetails = async () => {
      console.log("Fetching listing details...");
      try {
        const response = await fetch(
          `http://localhost:3000/api/listing/${id}`,
          {
            headers: {
              Authorization: Cookies.get("walkInToken"),
            },
          }
        );

        if (!response.ok) {
          const errorMessage = `Failed to fetch listing details: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Listing details:", data);
        setListingDetails(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchListingDetails();
  }, [id]);
  const listingData = data.find((item) => item.id === parseInt(id));
  const roles = {
    instructionalDesigner: listingData.instructionalDesigner,
    softwareEngineer: listingData.softwareEngineer,
    softwareQualityEngineer: listingData.softwareQualityEngineer,
  };

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
      <form className="listing_tab">
        {listingDetails && (
          <ListingDisplay
            apply={true}
            handleForm={handleForm}
            data={listingDetails.listing_display}
          />
        )}
        {listingDetails && (
          <details className="">
            <summary className="details_header">
              <h3>Pre-requisites & Application Process</h3>
              <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
            </summary>
            <Prerequisites
              data={listingDetails.preRequisitesApplicationProcess}
            />
          </details>
        )}
        {listingDetails && (
          <ApplicationForm
            applicationData={applicationData}
            handleChange={handleChange}
            // id={id}
            timeSlots={listingDetails.timeSlots}
            roles={roles}
          />
        )}
        {listingDetails && <JobRolesDetails roles={listingDetails.roles} />}
      </form>
      <div></div>
    </div>
  );
};

export default IndividualListing;
