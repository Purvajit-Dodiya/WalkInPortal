import React from "react";
import Header from "../Header";
import ListingDisplay from "./ListingDisplay";
// import { data } from "./ListingData";
import { Link } from "react-router-dom";

const WalkInHome = () => {
  const [ListingsData, setListingsData] = React.useState([]);
  React.useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/listing");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data = await response.json();
        setListingsData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchListings();
  }, []);

  console.log(ListingsData);
  const test = ListingsData.map((x) => (
    <ListingDisplay apply={false} key={x.listing_id} data={x} />
  ));
  return (
    <section className="head_body_footer">
      <Header />
      <div className="listing_tab">{test}</div>
    </section>
  );
};

export default WalkInHome;

// <section className="head_body_footer">

//   <Header />

//   <div className="listing_tab">
//     <ListingDisplay />
//     <ListingDisplay />
//     <ListingDisplay />
//   </div>
//   <div></div>
// </section>
