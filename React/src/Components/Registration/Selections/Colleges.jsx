import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  getColleges,
  getEducationQualifications,
} from "/src/Graphql/Queries.graphql";

export default function Colleges(props) {
  console.log("college", props.college);
  const { loading, error, data } = useQuery(getColleges, { pollInterval: 500 });
  if (loading) return "loading";
  if (error) console.log("error", error.message);
  console.log("from graphql", data.getColleges);
  const collegeData = [];
  //   React.useEffect(() => {
  //     if (data) collegeData.push(...data.getColleges);
  //   }, []);
  return (
    <select
      name="college"
      value={props.college}
      id="college"
      className="input_field"
      onChange={props.handleChange}
      required
    >
      <option value="">--choose college--</option>
      {data.getColleges.map((x) => {
        return <option value={x.college_id}>{x.college_name}</option>;
      })}
    </select>
  );
}
