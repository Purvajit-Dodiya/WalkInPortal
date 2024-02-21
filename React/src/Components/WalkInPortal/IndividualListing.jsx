import React from "react";
import ListingDisplay from "./ListingDisplay";
import Prerequisites from "./Prerequisites";
import ApplicationForm from "./ApplicationForm";
import JobRolesDetails from "./JobRolesDetails";
import Header from "../Header";
import { data } from "./ListingData";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery, useMutation, gql } from "@apollo/client";
import { getWalkinListing } from "/src/Graphql/Queries.graphql";
import { apllyMutation } from "/src/Graphql/Mutation.graphql";
import { checkLoggedIn } from "../Utils";

const IndividualListing = () => {
  const { id } = useParams();
  console.log(id);

  const [applicationData, setApplicationData] = React.useState({
    id: id,
    timeSlot: 1,
    updatedResume: null,
    prefferedIstructionalDesigner: false,
    prefferedSoftwareEngineer: false,
    prefferedSoftwareQualityEngineer: false,
  });

  const [listingDetails, setListingDetails] = React.useState(null);
  console.log("listingDetails:", listingDetails);
  const { loading, error, data } = useQuery(getWalkinListing, {
    variables: { listingId: parseInt(id) },
  });
  const [apllyMutationFn] = useMutation(apllyMutation, {
    onCompleted: (returnedData) => {
      console.log("mutaion retun", returnedData.apply.message);
      if (returnedData.apply.message === "Application successful") {
        window.location.href = `/success/${id}`;
      } else {
        alert("Something went wrong try again later");
      }
    },
  });

  React.useEffect(() => {
    const fetchListingDetails = async () => {
      if (data) {
        setListingDetails(data.getWalkinListing);
        setApplicationData((prevData) => {
          return {
            ...prevData,
            timeSlot: data.getWalkinListing.timeslots[0].id,
          };
        });
      }
    };
    fetchListingDetails();
  }, [data]);

  console.log("default", applicationData.timeSlot);
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    console.log("change:", name, value, type, checked);
    setApplicationData((prevData) => {
      if (type === "file") {
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
    if (
      !(
        applicationData.prefferedIstructionalDesigner ||
        applicationData.prefferedSoftwareEngineer ||
        applicationData.prefferedSoftwareQualityEngineer
      )
    ) {
      alert("Choose at least one Job role");
    } else {
      if (!applicationData.resume) {
        alert("Please upload your resume");
      } else {
        const preferredRoles = [];
        if (applicationData.prefferedSoftwareEngineer) {
          preferredRoles.push("1");
        }
        if (applicationData.prefferedIstructionalDesigner) {
          preferredRoles.push("2");
        }
        if (applicationData.prefferedSoftwareQualityEngineer) {
          preferredRoles.push("3");
        }
        apllyMutationFn({
          variables: {
            input: {
              email: Cookies.get("walkInEmail"),
              listingId: id,
              timeSlotId: applicationData.timeSlot,
              userResume: "testing.gmail.com",
              preferredRoles: preferredRoles,
            },
          },
        });
      }
    }
  }

  if (loading) return "loading";
  if (error) return "error";

  return (
    <div className="head_body_footer">
      <Header user={true} />
      <form className="listing_tab">
        {listingDetails && (
          <ListingDisplay
            key={listingDetails.listing_id}
            apply={true}
            handleForm={handleForm}
            data={listingDetails}
          />
        )}
        {listingDetails && (
          <details className="">
            <summary className="details_header">
              <h3>Pre-requisites & Application Process</h3>
              <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
            </summary>
            <Prerequisites data={listingDetails.additionalInformation} />
          </details>
        )}
        {listingDetails && (
          <ApplicationForm
            applicationData={applicationData}
            handleChange={handleChange}
            // id={id}
            timeSlots={listingDetails.timeslots}
            roles={listingDetails.roles}
          />
        )}
        {listingDetails && <JobRolesDetails roles={listingDetails.roles} />}
      </form>
      <div></div>
    </div>
  );
};

export default IndividualListing;
