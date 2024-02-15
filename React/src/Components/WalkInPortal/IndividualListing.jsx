import React from "react";
import ListingDisplay from "./ListingDisplay";
import Prerequisites from "./Prerequisites";
import ApplicationForm from "./ApplicationForm";
import JobRolesDetails from "./JobRolesDetails";
import Header from "../Header";
import { data } from "./ListingData";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useQuery, gql } from "@apollo/client";
import { getWalkinListing } from "/src/Graphql/Queries.graphql";

// const IndividualListing = () => {
//   const isLoggedIn = () => {
//     const token = Cookies.get("walkInToken");

//     if (!token) {
//       window.location.href = "/login";
//       return false;
//     }

//     return true;
//   };
//   if (isLoggedIn()) {
//   }
//   const { id } = useParams();
//   console.log(id);
//   const [listingDetails, setListingDetails] = React.useState(null);
//   console.log("listingDetails:", listingDetails);
//   const { loading, error, data } = useQuery(getWalkinListing, {
//     variables: { listingId: 1 },
//   });
//   if (loading) return "loading", loading;
//   if (error) return "error", error.message;
//   console.log("from graphql", data.getWalkinListing);
//   React.useEffect(() => {
//     const fetchListingDetails = async () => {
//       if (data) setListingDetails(data.getWalkinListing);
//     };
//     fetchListingDetails();
//   }, [id]);

//   const [applicationData, setApplicationData] = React.useState({
//     id: id,
//     timeSlot: 1,
//     updatedResume: null,
//     prefferedRoles: [],
//     prefferedIstructionalDesigner: true,
//     prefferedSoftwareEngineer: true,
//     prefferedSoftwareQualityEngineer: true,
//   });
//   function handleChange(event) {
//     const { name, value, type, checked } = event.target;
//     // console.log("name", name, value);

//     setApplicationData((prevData) => {
//       if (type === "file") {
//         // console.log(event.target.files[0])
//         return {
//           ...prevData,
//           [name]: event.target.files[0],
//         };
//       }
//       return {
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value,
//       };
//     });
//   }
//   function handleForm(event) {
//     event.preventDefault();
//     console.log(applicationData);
//   }
//   return (
//     <div className="head_body_footer">
//       <Header />
//       <form className="listing_tab">
//         {listingDetails && (
//           <ListingDisplay
//             key={listingDetails.listing_id}
//             apply={true}
//             handleForm={handleForm}
//             data={listingDetails}
//           />
//         )}
//         {/* {listingDetails && (
//           <ApplicationForm
//             applicationData={applicationData}
//             handleChange={handleChange}
//             // id={id}
//             timeSlots={listingDetails.timeSlots}
//             roles={listingDetails.roles}
//           />
//         )} */}
//         {listingDetails && (
//           <details className="">
//             <summary className="details_header">
//               <h3>Pre-requisites & Application Process</h3>
//               <img src="/src/icons/expand_less_black_24dp.svg" alt="" />
//             </summary>
//             <Prerequisites data={listingDetails.additionalInformation} />
//           </details>
//         )}
//         {listingDetails && <JobRolesDetails roles={listingDetails.roles} />}
//       </form>
//       <div></div>
//     </div>
//   );
// };

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
  }

  if (loading) return "loading";
  if (error) return "error";

  return (
    <div className="head_body_footer">
      <Header />
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

// React.useEffect(() => {
//   const fetchListingDetails = async () => {
//     console.log("Fetching listing details...");
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/listing/${id}`,
//         {
//           headers: {
//             Authorization: Cookies.get("walkInToken"),
//           },
//         }
//       );

//       if (!response.ok) {
//         const errorMessage = `Failed to fetch listing details: ${response.status} ${response.statusText}`;
//         throw new Error(errorMessage);
//       }

//       const data = await response.json();
//       console.log("Listing details:", data);
//       setListingDetails(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   fetchListingDetails();
// }, [id]);
// const listingData = data.find((item) => item.id === parseInt(id));
// const roles = {
//   instructionalDesigner: listingData.instructionalDesigner,
//   softwareEngineer: listingData.softwareEngineer,
//   softwareQualityEngineer: listingData.softwareQualityEngineer,
// };
