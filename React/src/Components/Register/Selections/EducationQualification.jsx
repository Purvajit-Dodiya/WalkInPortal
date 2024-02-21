import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Field, ErrorMessage } from "formik";
import MenuItem from "@mui/material/MenuItem";

import { Select } from "formik-mui";
import {
  getColleges,
  getEducationQualifications,
} from "/src/Graphql/Queries.graphql";

export default function EducationQualification(props) {
  const { loading, error, data } = useQuery(getEducationQualifications);
  if (loading) return "loading";
  if (error) console.log("error", error.message);
  // console.log("from graphql", data.getEducationQualifications);
  return (
    <div className="input_container col13">
      <Field
        className="select"
        variant="standard"
        name="qualification"
        component={Select}
        label="Qualification*"
      >
        {data &&
          data.getEducationQualifications.map((item) => {
            return (
              <MenuItem value={item.id}>
                {item.education_qualification}
              </MenuItem>
            );
          })}
      </Field>
    </div>
  );
}
