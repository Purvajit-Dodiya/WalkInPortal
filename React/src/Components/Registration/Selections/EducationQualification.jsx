import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  getColleges,
  getEducationQualifications,
} from "/src/Graphql/Queries.graphql";

export default function EducationQualification(props) {
  const { loading, error, data } = useQuery(getEducationQualifications);
  if (loading) return "loading";
  if (error) console.log("error", error.message);
  //   console.log("from graphql", data.getEducationQualifications);
  const qualificationeData = data;
  return (
    <select
      name="qualification"
      value={props.qualification}
      id="qualification"
      className="input_field"
      onChange={props.handleChange}
      required
    >
      <option value="">--choose qualification--</option>
      {data &&
        qualificationeData.getEducationQualifications.map((item) => {
          return (
            <option value={item.id}>{item.education_qualification}</option>
          );
        })}
    </select>
  );
}
