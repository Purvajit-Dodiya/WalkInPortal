const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("../userCredentials"); // Import your database connection module
const verifyToken = require("./verifyToken");
// Example route to fetch data from MySQL
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  connection.query(
    `SELECT * FROM usercredentials where email="${email}" and password=SHA2("${password}", 256);`,
    (error, results) => {
      if (error) {
        console.error("Error executing MySQL query: ", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      } else if (results.length == 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const user = results[0];
      console.log(user.Email);
      const payload = { emailId: user.Email };
      const token = jwt.sign(payload, "a", { expiresIn: "1h" });
      res.json({ token: token });
    }
  );
});

router.get("/listing", (req, res) => {
  connection.query(
    `SELECT
    wl.listing_id as listingId,
    wl.listing_name as listingTitle,
    CONCAT(DATE_FORMAT(wl.StartDate, '%d-%b-%Y') ," to ",DATE_FORMAT(wl.EndDate, '%d-%b-%Y')) as "Date",
    wl.City,
    GROUP_CONCAT(jr.role_name SEPARATOR ', ') AS offeredRoles
    FROM
    walkinlisting wl
    JOIN
    walkinroles wr ON wl.listing_id = wr.listing_id
    JOIN
    jobroles jr ON wr.role_id = jr.role_id
    GROUP BY
    wl.listing_id;`,
    (err, results) => {
      if (err) {
        console.error("Error executing MySQL query: ", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      } else if (results.length == 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      console.log(results);
      res.json(results);
    }
  );
});

// router.get("/listing/:id", verifyToken, (req, res) => {
//   const listingId = req.params.id;

//   // Execute the first query to fetch listing details
//   connection.query(
//     `SELECT
//         wl.listing_id as listingId,
//         wl.listing_name as listingTitle,
//         CONCAT(DATE_FORMAT(wl.StartDate, '%d-%b-%Y') ," to ", DATE_FORMAT(wl.EndDate, '%d-%b-%Y')) as "Date",
//         wl.City,
//         GROUP_CONCAT(jr.role_name SEPARATOR ', ') AS offeredRoles
//     FROM
//         walkinlisting wl
//     JOIN
//         walkinroles wr ON wl.listing_id = wr.listing_id
//     JOIN
//         jobroles jr ON wr.role_id = jr.role_id
//     WHERE wl.listing_id = ?
//     GROUP BY
//         wl.listing_id`,
//     [listingId],
//     (err, listingDetails) => {
//       if (err) {
//         console.log("Error executing listing details query: ", err);
//         res.status(500).json({ error: "Internal Server Error" });
//         return;
//       }

//       // Execute the second query to fetch time slots
//       connection.query(
//         `SELECT
//             ts.id,
//             CONCAT(TIME_FORMAT(ts.start_time, '%h:%i %p'), " to ", TIME_FORMAT(ts.end_time, '%h:%i %p')) AS slotTime
//         FROM
//             walkinlisting wl
//         JOIN
//             walkintimeslots ts ON wl.listing_id = ts.listing_id
//         WHERE wl.listing_id = ?`,
//         [listingId],
//         (err, timeSlots) => {
//           if (err) {
//             console.log("Error executing time slots query: ", err);
//             res.status(500).json({ error: "Internal Server Error" });
//             return;
//           }

//           // Combine the results and send the response
//           const responseData = {
//             listing_display: listingDetails[0],
//             timeSlots: timeSlots,
//           };
//           console.log(timeSlots);
//           res.json(responseData);
//         }
//       );
//     }
//   );
// });

router.get("/listing/:id", verifyToken, (req, res) => {
  connection.query(
    `SELECT
      wl.listing_id as listingId,
      wl.listing_name as listingTitle,
      CONCAT(DATE_FORMAT(wl.StartDate, '%d-%b-%Y') ," to ", DATE_FORMAT(wl.EndDate, '%d-%b-%Y')) as "Date",
      wl.City,
      GROUP_CONCAT(jr.role_name SEPARATOR ', ') AS offeredRoles
    FROM
      walkinlisting wl
    JOIN
      walkinroles wr ON wl.listing_id = wr.listing_id
    JOIN
      jobroles jr ON wr.role_id = jr.role_id
    WHERE wl.listing_id = ${req.params.id}
    GROUP BY
      wl.listing_id;
    SELECT ts.id,
      CONCAT(TIME_FORMAT(ts.start_time, '%h:%i %p') ," to ", TIME_FORMAT(ts.end_time, '%h:%i %p')) AS slotTime
    FROM
      walkinlisting wl
    JOIN
      walkintimeslots ts ON wl.listing_id = ts.listing_id
    WHERE wl.listing_id = ${req.params.id};

    select information_heading as infoTile, 
    information as info  
    from additionalinformation ad 
    JOIN walkinlisting as wl 
    on ad.listing_id=wl.listing_id 
    WHERE wl.listing_id=${req.params.id};
    SELECT
        wr.id,
        jr.role_name,
        jr.gross_compensation,
        jr.role_description,
        jr.role_requirements
    FROM
        walkinlisting wl
    JOIN
        walkinroles wr ON wl.listing_id = wr.listing_id
    JOIN
        jobroles jr ON wr.role_id = jr.role_id
    where wl.listing_id=${req.params.id};
    `,
    (err, results) => {
      if (err) {
        console.log("Error executing MySQL query: ", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      } else if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Parse the results
      const [
        listingDetails,
        timeSlots,
        preRequisitesApplicationProcess,
        roles,
      ] = results;

      // Extract necessary data from the results
      const listingData = listingDetails[0];
      console.log(timeSlots);
      console.log(preRequisitesApplicationProcess);
      console.log(roles);
      // Combine and send the data in the response
      const responseData = {
        listing_display: listingData,
        timeSlots: timeSlots,
        preRequisitesApplicationProcess: preRequisitesApplicationProcess,
        roles: roles,
      };

      // console.log(responseData);
      res.json(responseData);
    }
  );
});

module.exports = router;
