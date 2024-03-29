import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Field, ErrorMessage } from "formik";
import MenuItem from "@mui/material/MenuItem";

import { Select, TextField } from "formik-mui";
import {
  getColleges,
  getEducationQualifications,
} from "/src/Graphql/Queries.graphql";

export default function Colleges(props) {
  // console.log("college", props.college);
  const { loading, error, data } = useQuery(getColleges, { pollInterval: 500 });
  if (loading) return "loading";
  if (error) console.log("error", error.message);
  // console.log("from graphql", data.getColleges);
  //   React.useEffect(() => {
  //     if (data) collegeData.push(...data.getColleges);
  //   }, []);
  return (
    <div className=" col13">
      <Field
        readOnly={props.final}
        className="select"
        variant="standard"
        name="college"
        component={Select}
        label="College*"
        required
      >
        {data &&
          data.getColleges.map((x) => {
            return (
              <MenuItem key={x.college_id} value={x.college_id}>
                {x.college_name}
              </MenuItem>
            );
          })}
      </Field>
    </div>
  );
}
