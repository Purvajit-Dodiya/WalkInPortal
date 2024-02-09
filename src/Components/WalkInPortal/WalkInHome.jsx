import React from "react";
import Header from "../Header";
import ListingDisplay from "./ListingDisplay";
import { data } from "./ListingData";
import { Link } from "react-router-dom";

const WalkInHome = () => {
  console.log(data);
  const test = data.map((x) => (
    <ListingDisplay apply={false} key={x.id} data={x} />
    // <div key={x.id}>
    //   {x.listingTitle}
    //   <br />
    //   {x.description}
    //   {/* <a href="listing/"></a> */}
    //   <Link to={`/listing/${x.id}`}>View Details</Link>
    // </div>
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
