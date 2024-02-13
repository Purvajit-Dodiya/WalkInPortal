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
    `SELECT * FROM usercredentials where email=? and password=SHA2(?, 256);`,
    [email, password],
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
    wl.City as location,
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

router.get("/listing/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  connection.query(
    `SELECT
      wl.listing_id as listingId,
      wl.listing_name as listingTitle,
      CONCAT(DATE_FORMAT(wl.StartDate, '%d-%b-%Y') ," to ", DATE_FORMAT(wl.EndDate, '%d-%b-%Y')) as "Date",
      wl.City as location,
      GROUP_CONCAT(jr.role_name SEPARATOR ', ') AS offeredRoles
    FROM
      walkinlisting wl
    JOIN
      walkinroles wr ON wl.listing_id = wr.listing_id
    JOIN
      jobroles jr ON wr.role_id = jr.role_id
    WHERE wl.listing_id = ?
    GROUP BY
      wl.listing_id;
    SELECT ts.id,
      CONCAT(TIME_FORMAT(ts.start_time, '%h:%i %p') ," to ", TIME_FORMAT(ts.end_time, '%h:%i %p')) AS slotTime
    FROM
      walkinlisting wl
    JOIN
      walkintimeslots ts ON wl.listing_id = ts.listing_id
    WHERE wl.listing_id = ?;

    select information_heading as infoTile, 
    information as info  
    from additionalinformation ad 
    JOIN walkinlisting as wl 
    on ad.listing_id=wl.listing_id 
    WHERE wl.listing_id=?;
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
    where wl.listing_id=?;
    `,
    [id, id, id, id],
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

router.post("/register", (req, res) => {
  // Begin transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    const email = req.body.email;
    // Insert user credentials
    const insertUserCredentialsQuery = `
      INSERT INTO usercredentials(Email, Password, PhoneNumber)
      VALUES("${email}", SHA2('mypass', 256), '+919876543210');
    `;

    // Get the newly inserted user's ID
    const getUserIdQuery = `
      SET @NewUserID := (SELECT ID FROM usercredentials WHERE Email = "${email}");
      SELECT @NewUserID;
    `;

    // Insert user details
    const insertUserDetailsQuery = `
      INSERT INTO userdetails(UserId, FirstName, LastName, Resume, ProfilePhoto, PortfolioURL, PreferredJobRole, HaveReferral, ReferralEmployeeName, ReceiveUpdates)
      VALUES (@NewUserID, 'test', 'test', 'test.pdf', 'test.jpg', 'test.com', 'Software Engineer', FALSE, NULL, FALSE);
    `;

    // Insert qualifications
    const insertQualificationsQuery = `
      INSERT INTO Qualifications (UserId, AggregatePercentage, PassingYear, EducationQualification, Stream, college_id, CollegeLocation, ApplicationType, AppliedBefore, RoleApplied, TechnologiesFamiliar, OtherTechnologies)
      VALUES (@NewUserID, 80, 2020, 1, 'Computer Science', 1, 'Location A', 'Experienced', TRUE, 'Software Engineer', 'React,Node JS', NULL);
    `;

    // Insert user experience
    const insertUserExperienceQuery = `
      INSERT INTO userexperience (user_id, YearsOfExperience, CurrentCTC, ExpectedCTC, TechnologiesExpertise, OtherExpertiseTechnologies, OnNoticePeriod, EndDateOfNotice, DurationOfNoticePeriod)
      VALUES (@NewUserID, 3, 80000, 100000, 'React,Node JS', NULL, FALSE, NULL, NULL);
    `;

    // Retrieve user details after registration
    const getUserDetailsQuery = `
      SELECT *
      FROM usercredentials uc
      JOIN userdetails ud ON uc.ID = ud.UserId
      JOIN qualifications q ON q.UserId = ud.UserId
      JOIN userexperience ue ON ue.user_id = ud.UserId
      WHERE uc.ID = @NewUserID;
    `;

    // Execute the queries within the transaction
    connection.query(insertUserCredentialsQuery, [], (error, results) => {
      if (error) {
        // Rollback on error
        connection.rollback(() => {
          console.error("Error executing user credentials query: ", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
        return;
      }

      // Execute the getUserIdQuery
      connection.query(getUserIdQuery, [], (error, results) => {
        if (error) {
          // Rollback on error
          connection.rollback(() => {
            console.error("Error executing get user ID query: ", error);
            res.status(500).json({ error: "Internal Server Error" });
          });
          return;
        }

        // Execute the insertUserDetailsQuery
        connection.query(insertUserDetailsQuery, [], (error, results) => {
          if (error) {
            // Rollback on error
            connection.rollback(() => {
              console.error("Error executing user details query: ", error);
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }

          // Execute the insertQualificationsQuery
          connection.query(insertQualificationsQuery, [], (error, results) => {
            if (error) {
              // Rollback on error
              connection.rollback(() => {
                console.error("Error executing qualifications query: ", error);
                res.status(500).json({ error: "Internal Server Error" });
              });
              return;
            }

            // Execute the insertUserExperienceQuery
            connection.query(
              insertUserExperienceQuery,
              [],
              (error, results) => {
                if (error) {
                  // Rollback on error
                  connection.rollback(() => {
                    console.error(
                      "Error executing user experience query: ",
                      error
                    );
                    res.status(500).json({ error: "Internal Server Error" });
                  });
                  return;
                }

                // Commit the transaction
                connection.commit((err) => {
                  if (err) {
                    // Rollback on error during commit
                    connection.rollback(() => {
                      console.error("Error committing transaction: ", err);
                      res.status(500).json({ error: "Internal Server Error" });
                    });
                    return;
                  }

                  // Execute the getUserDetailsQuery
                  connection.query(
                    getUserDetailsQuery,
                    [],
                    (error, results) => {
                      if (error) {
                        console.error(
                          "Error executing get user details query: ",
                          error
                        );
                        res
                          .status(500)
                          .json({ error: "Internal Server Error" });
                        return;
                      }

                      // Extract the user details from the results
                      const userDetails = results[0];

                      // Send the user details in the response
                      res.json({ userDetails });
                    }
                  );
                });
              }
            );
          });
        });
      });
    });
  });
});

// router.post("/register", (req, res) => {
//   // Begin transaction
//   connection.beginTransaction((err) => {
//     if (err) {
//       console.error("Error starting transaction: ", err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }

//     // Extract data from the request body
//     const {
//       email,
//       password,
//       phoneNumber,
//       firstName,
//       lastName,
//       resume,
//       profilePhoto,
//       portfolioURL,
//       preferredJobRole,
//       haveReferral,
//       referralEmployeeName,
//       receiveUpdates,
//       aggregatePercentage,
//       passingYear,
//       educationQualification,
//       stream,
//       collegeId,
//       collegeLocation,
//       applicationType,
//       appliedBefore,
//       roleApplied,
//       technologiesFamiliar,
//       otherTechnologies,
//       yearsOfExperience,
//       currentCTC,
//       expectedCTC,
//       technologiesExpertise,
//       otherExpertiseTechnologies,
//       onNoticePeriod,
//       endDateOfNotice,
//       durationOfNoticePeriod,
//     } = req.body;

//     // Insert user credentials
//     const insertUserCredentialsQuery = `
//       INSERT INTO usercredentials(Email, Password, PhoneNumber)
//       VALUES (?, SHA2(?, 256), ?);
//     `;

//     // Get the newly inserted user's ID
//     const getUserIdQuery = `
//       SET @NewUserID := (SELECT ID FROM usercredentials WHERE Email = ?);
//       SELECT @NewUserID;
//     `;

//     // Insert user details
//     const insertUserDetailsQuery = `
//       INSERT INTO userdetails(UserId, FirstName, LastName, Resume, ProfilePhoto, PortfolioURL, PreferredJobRole, HaveReferral, ReferralEmployeeName, ReceiveUpdates)
//       VALUES (@NewUserID, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     // Insert qualifications
//     const insertQualificationsQuery = `
//       INSERT INTO Qualifications (UserId, AggregatePercentage, PassingYear, EducationQualification, Stream, college_id, CollegeLocation, ApplicationType, AppliedBefore, RoleApplied, TechnologiesFamiliar, OtherTechnologies)
//       VALUES (@NewUserID, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     // Insert user experience
//     const insertUserExperienceQuery = `
//       INSERT INTO userexperience (user_id, YearsOfExperience, CurrentCTC, ExpectedCTC, TechnologiesExpertise, OtherExpertiseTechnologies, OnNoticePeriod, EndDateOfNotice, DurationOfNoticePeriod)
//       VALUES (@NewUserID, ?, ?, ?, ?, ?, ?, ?, ?);
//     `;

//     // Retrieve user details after registration
//     const getUserDetailsQuery = `
//       SELECT *
//       FROM usercredentials uc
//       JOIN userdetails ud ON uc.ID = ud.UserId
//       JOIN qualifications q ON q.UserId = ud.UserId
//       JOIN userexperience ue ON ue.user_id = ud.UserId
//       WHERE uc.ID = @NewUserID;
//     `;

//     // Execute the queries within the transaction
//     connection.query(
//       insertUserCredentialsQuery,
//       [email, password, phoneNumber],
//       (error, results) => {
//         if (error) {
//           // Rollback on error
//           connection.rollback(() => {
//             console.error("Error executing user credentials query: ", error);
//             res.status(500).json({ error: "Internal Server Error" });
//           });
//           return;
//         }

//         // Execute the getUserIdQuery
//         connection.query(getUserIdQuery, [email], (error, results) => {
//           if (error) {
//             // Rollback on error
//             connection.rollback(() => {
//               console.error("Error executing get user ID query: ", error);
//               res.status(500).json({ error: "Internal Server Error" });
//             });
//             return;
//           }

//           // Extract the user ID from the results
//           const newUserId = results[1][0]["@NewUserID"];

//           // Execute the insertUserDetailsQuery
//           connection.query(
//             insertUserDetailsQuery,
//             [
//               firstName,
//               lastName,
//               resume,
//               profilePhoto,
//               portfolioURL,
//               preferredJobRole,
//               haveReferral,
//               referralEmployeeName,
//               receiveUpdates,
//             ],
//             (error, results) => {
//               if (error) {
//                 // Rollback on error
//                 connection.rollback(() => {
//                   console.error("Error executing user details query: ", error);
//                   res.status(500).json({ error: "Internal Server Error" });
//                 });
//                 return;
//               }

//               // Execute the insertQualificationsQuery
//               connection.query(
//                 insertQualificationsQuery,
//                 [
//                   aggregatePercentage,
//                   passingYear,
//                   educationQualification,
//                   stream,
//                   collegeId,
//                   collegeLocation,
//                   applicationType,
//                   appliedBefore,
//                   roleApplied,
//                   technologiesFamiliar,
//                   otherTechnologies,
//                 ],
//                 (error, results) => {
//                   if (error) {
//                     // Rollback on error
//                     connection.rollback(() => {
//                       console.error(
//                         "Error executing qualifications query: ",
//                         error
//                       );
//                       res.status(500).json({ error: "Internal Server Error" });
//                     });
//                     return;
//                   }

//                   // Execute the insertUserExperienceQuery
//                   connection.query(
//                     insertUserExperienceQuery,
//                     [
//                       yearsOfExperience,
//                       currentCTC,
//                       expectedCTC,
//                       technologiesExpertise,
//                       otherExpertiseTechnologies,
//                       onNoticePeriod,
//                       endDateOfNotice,
//                       durationOfNoticePeriod,
//                     ],
//                     (error, results) => {
//                       if (error) {
//                         // Rollback on error
//                         connection.rollback(() => {
//                           console.error(
//                             "Error executing user experience query: ",
//                             error
//                           );
//                           res
//                             .status(500)
//                             .json({ error: "Internal Server Error" });
//                         });
//                         return;
//                       }

//                       // Commit the transaction
//                       connection.commit((err) => {
//                         if (err) {
//                           // Rollback on error during commit
//                           connection.rollback(() => {
//                             console.error(
//                               "Error committing transaction: ",
//                               err
//                             );
//                             res
//                               .status(500)
//                               .json({ error: "Internal Server Error" });
//                           });
//                           return;
//                         }

//                         // Execute the getUserDetailsQuery
//                         connection.query(
//                           getUserDetailsQuery,
//                           [],
//                           (error, results) => {
//                             if (error) {
//                               console.error(
//                                 "Error executing get user details query: ",
//                                 error
//                               );
//                               res
//                                 .status(500)
//                                 .json({ error: "Internal Server Error" });
//                               return;
//                             }

//                             // Extract the user details from the results
//                             const userDetails = results[0];

//                             // Send the user details in the response
//                             res.json({ userDetails });
//                           }
//                         );
//                       });
//                     }
//                   );
//                 }
//               );
//             }
//           );
//         });
//       }
//     );
//   });
// });

router.post("/apply", verifyToken, (req, res) => {
  // Extract data from the request body
  const { email, listingId, timeSlotId, userResume } = req.body;

  // Begin transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error starting transaction: ", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Get the user ID based on the provided email
    const getUserIdQuery = `
      SET @NewUserID := (SELECT ID FROM usercredentials WHERE Email = ?);
      SELECT @NewUserID;
    `;

    // Apply to the listing
    const applyToListingQuery = `
      INSERT INTO userapplication (listing_id, user_id, time_slot_id, user_resume)
      VALUES (?, @NewUserID, ?, ?);
    `;

    // Execute the queries within the transaction
    connection.query(getUserIdQuery, [email], (error, results) => {
      if (error) {
        // Rollback on error
        connection.rollback(() => {
          console.error("Error executing get user ID query: ", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
        return;
      }

      // Extract the user ID from the results
      const newUserId = results[1][0]["@NewUserID"];

      // Apply to the listing
      connection.query(
        applyToListingQuery,
        [listingId, timeSlotId, userResume],
        (error, results) => {
          if (error) {
            // Rollback on error
            connection.rollback(() => {
              console.error("Error applying to the listing: ", error);
              res.status(500).json({ error: "Internal Server Error" });
            });
            return;
          }

          // Commit the transaction
          connection.commit((err) => {
            if (err) {
              // Rollback on error during commit
              connection.rollback(() => {
                console.error("Error committing transaction: ", err);
                res.status(500).json({ error: "Internal Server Error" });
              });
              return;
            }

            // Send success response
            res.json({ message: "Application successful" });
          });
        }
      );
    });
  });
});

router.get("/getHallTicket", verifyToken, (req, res) => {
  // Get the user ID based on the provided email
  const { email, listingId } = req.body;
  // console.log(email);
  const getUserIdQuery = `SELECT ID FROM usercredentials WHERE Email = ?`;
  connection.query(getUserIdQuery, [email], (error, userResults) => {
    if (error) {
      console.error("Error getting user ID: ", error);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // Extract the user ID from the results
    const newUserId = userResults[0]?.ID;

    if (!newUserId) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Get hall ticket details
    const getHallTicketQuery = `
      SELECT 
        CONCAT(DATE_FORMAT(wl.StartDate, '%d-%b-%Y') ," to ", DATE_FORMAT(wl.EndDate, '%d-%b-%Y')) as "Date",
        CONCAT(TIME_FORMAT(ts.start_time, '%h:%i %p') ," to ", TIME_FORMAT(ts.end_time, '%h:%i %p')) as "Time",
        wl.venue as "Venue",
        wl.things_to_remember as "ThingsToRemember",
        ua.user_id as "UserId"
      FROM walkinlisting wl
      JOIN userapplication ua ON ua.listing_id = wl.listing_id
      JOIN walkintimeslots ts ON ts.listing_id = wl.listing_id
      WHERE wl.listing_id = ? AND ua.user_id = ?;
    `;

    // Execute the query to get hall ticket details
    connection.query(
      getHallTicketQuery,
      [listingId, newUserId],
      (error, hallTicketResults) => {
        if (error) {
          console.error("Error getting hall ticket details: ", error);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        // Send the hall ticket details in the response
        const hallTicketDetails = hallTicketResults[0];
        res.json({ hallTicketDetails });
      }
    );
  });
});

module.exports = router;
