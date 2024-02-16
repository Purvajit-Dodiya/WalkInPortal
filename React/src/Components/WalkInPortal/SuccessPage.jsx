import React from "react";
import Header from "../Header.jsx";
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { getHallTicket } from "/src/Graphql/Queries.graphql";
import Cookies from "js-cookie";

function SuccessPage() {
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
  const { loading, error, data } = useQuery(getHallTicket, {
    variables: {
      email: Cookies.get("walkInEmail"),
      listingId: parseInt(id),
    },
  });
  if (loading) console.log("loading", loading);
  if (error) console.log("error", error.message);
  if (data) console.log("from graphql", data.getHallTicket);
  return (
    <div className="head_body_footer">
      <Header />
      {data && (
        <div className="success_container">
          <div className="success_tick_container">
            <img
              src="/src/icons/check_black_24dp.svg"
              className="tick_img"
              alt=""
            />
          </div>
          <div className="success_title_container">
            <h3 className="success_title">
              Congratulations ! You have successfully applied for the walk-in
              opportunity
            </h3>
          </div>
          <hr className="success_separator" />
          <div className="linear_container">
            <label className="static_input_label">
              Date & Time of Walk-In :
            </label>
            <p className="">03rd July 2021</p>
            <p className="">
              {data.getHallTicket.timeslot.start_time} to{" "}
              {data.getHallTicket.timeslot.end_time}
            </p>
          </div>
          <hr className="success_separator" />
          <div className="linear_container venue">
            <label className="static_input_label">Venue of Walk-In :</label>
            <p>{data.getHallTicket.listing.Venue}</p>
            {/* <p className="">Zeus Systems Pvt. Ltd.</p>
            <p className="">
              1402, 14th Floor, Tower B, Peninsula Business Park. Ganpatrao
              Kadam Marg
            </p>
            <p className="">Lower Parel (W) </p>
            <p className="">Mumbai - 400 013</p>
            <p className="">Phone: +91-22-66600000</p> */}
          </div>
          <hr className="success_separator" />
          <div className="linear_container">
            <label className="static_input_label">THINGS TO REMEMBER :</label>
            <p>{data.getHallTicket.listing.things_to_remember}</p>
            {/* <p className="">
              - Please report 30 MINUTES prior to your reporting time.{" "}
            </p>
            <p className="">
              - Download your Hall Ticket from below and carry it with you
              during your Walk-In.
            </p> */}
          </div>
          <hr className="success-separator" />
          <div className="button_container">
            <button className="button">DOWNLOAD HALL TICKET</button>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default SuccessPage;
