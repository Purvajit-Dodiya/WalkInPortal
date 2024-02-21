import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

export default function ResponsiveDatePickers(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="date"
        readOnly={props.values.onNoticePeriod == "Yes" ? false : true}
        component="DatePicker"
        label="If Yes, when will your notice period end?*"
        format="DD-MM-YYYY"
        name="endOfNoticePeriod"
        value={dayjs(props.values.endOfNoticePeriod)}
        onChange={(date) =>
          props.setdate("endOfNoticePeriod", date.format("YYYY-MM-DD"))
        }
        sx={{ width: "90%" }}
        slotProps={{
          textField: { variant: "standard" },
        }}
      />
    </LocalizationProvider>
  );
}
