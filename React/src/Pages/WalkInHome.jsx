import React from "react";
import Header from "../Components/Header";
import ListingDisplay from "../Components/WalkInPortal/ListingDisplay";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { getAllWalkinListing } from "/src/Graphql/Queries.graphql";
import Cookies from "js-cookie";
import { checkLoggedIn } from "../Components/Utils";

const WalkInHome = () => {
  checkLoggedIn();

  const [ListingsData, setListingsData] = React.useState([]);
  const { loading, error, data } = useQuery(getAllWalkinListing);
  if (loading) console.log("loading", loading);
  if (error) console.log("error", error.message);
  console.log("from graphql", data);
  React.useEffect(() => {
    if (data) setListingsData(data.getAllWalkinListing);
  }, [data]);
  console.log("ListingsData array", ListingsData);
  const AllListing = ListingsData.map((x) => (
    <ListingDisplay apply={false} key={x.listing_id} data={x} />
  ));
  return (
    <section className="head_body_footer">
      <Header user={true} />
      <div className="listing_tab">{AllListing}</div>
      <div></div>
    </section>
  );
};

export default WalkInHome;
