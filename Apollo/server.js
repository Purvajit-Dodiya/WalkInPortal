import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { connection as db } from "./databaseConnection.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import generator from "generate-password";
const contactmailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cinematicchaos70@gmail.com",
    pass: "rkooslvismsqjgxm",
  },
});
contactmailer.verify((error) => {
  if (error) {
    console.log("mail config error", error);
  } else {
    console.log("mail config ready");
  }
});

const getColleges = async () => {
  console.log("called colleges");
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM Colleges;
      `;

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getEducationQualifications = async () => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM education_qualifications;
      `;

    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getJobRole = async (parent, args, context, info) => {
  const { roleId } = args;
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM jobroles WHERE role_id = ?;`;

    db.query(query, [roleId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // Check if there is a result
        if (results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      }
    });
  });
};

const getWalkinListing = async (parent, args, context, info) => {
  console.log("token:", context.authorization);
  if (!verifyToken(context.authorization)) {
    throw new Error("Unauthorized");
  }
  const { listingId } = args;
  // console.log("called for individual  listing with id ", listingId);
  return new Promise((resolve, reject) => {
    const query = `
        SELECT listing_id,
        listing_name,
        DATE_FORMAT(StartDate, '%d-%b-%Y') AS StartDate,
        DATE_FORMAT(EndDate, '%d-%b-%Y') AS EndDate,
        City,
        Venue,
        things_to_remember,
        dt_created,
        dt_modified
        FROM walkinlisting
        WHERE listing_id = ?;
      `;
    db.query(query, [listingId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        // console.log(results);
        resolve(results[0]);
      }
    });
  });
};

const getAllWalkinListing = async (parent, args, context, info) => {
  console.log("token:", context.authorization);
  // console.log("getAllWalkinListing called");
  if (!verifyToken(context.authorization)) {
    throw new Error("Unauthorized");
  }
  return new Promise((resolve, reject) => {
    const getAllListingIdsQuery = `
      SELECT listing_id FROM walkinlisting;
    `;

    db.query(getAllListingIdsQuery, (error, idResults) => {
      if (error) {
        reject(error);
      } else {
        // console.log(idResults);
        const allListingPromises = idResults.map(({ listing_id }) => {
          // Call getWalkinListing for each listing ID
          const tmp = getWalkinListing(
            null,
            { listingId: listing_id },
            context,
            info
          );
          // console.log("recived:", tmp);
          return tmp;
        });

        // Resolve all promises once they are fulfilled
        Promise.all(allListingPromises)
          .then((allListings) => {
            // console.log("allListings length", allListings.length);
            // console.log("allListings", typeof allListings);
            // console.log("allListings ", allListings);
            resolve(allListings);
          })
          .catch((getAllError) => {
            // console.log("getAllError", getAllError);
            reject(getAllError);
          });
      }
    });
  });
};

const getWalkinTimeSlots = async (parent, args, context, info) => {
  const { listingId } = args;

  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM walkintimeslots
        WHERE listing_id = ?;
      `;
    db.query(query, [listingId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log(results);
        resolve(results);
      }
    });
  });
};
const getWalkinTimeSlot = async (parent, args, context, info) => {
  const { id } = args;

  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM walkintimeslots
        WHERE id = ?;
      `;
    db.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log(results[0]);
        resolve(results[0]);
      }
    });
  });
};

const getAdditionalInformation = async (parent, args, context, info) => {
  const { listingId } = args;

  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM additionalinformation
        WHERE listing_id = ?;
      `;
    db.query(query, [listingId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
const getWalkinroles = async (parent, args, context, info) => {
  const { listingId } = args;

  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM walkinroles
        WHERE listing_id = ?;
      `;
    db.query(query, [listingId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
const getWalkinrole = async (parent, args, context, info) => {
  const { id } = args;

  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM walkinroles
        WHERE id = ?;
      `;
    db.query(query, [id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getApplicationpreferredRoles = async (parent, args, context, info) => {
  const { applicationId } = args;
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM userpreferredroles where application_id = ?;
      `;

    db.query(query, [applicationId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
const getApplication = async (parent, args, context, info) => {
  if (!verifyToken(context.authorization)) {
    throw new Error("Unauthorized");
  }
  const { ApplicationId } = args;
  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM userapplication where ApplicationId = ?;
      `;

    db.query(query, [ApplicationId], (error, results) => {
      // console.log("application:", results[0]);
      if (error) {
        reject(error);
      } else {
        resolve(results[0]);
      }
    });
  });
};

const getHallTicket = async (_, { email, listingId }, context) => {
  if (!verifyToken(context.authorization)) {
    throw new Error("Unauthorized");
  }
  try {
    // Query to fetch userId based on email
    const userIdQuery = `
      SELECT ID FROM usercredentials WHERE Email = ?;
    `;
    const [user] = await new Promise((resolve, reject) => {
      db.query(userIdQuery, [email], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    if (!user) {
      throw new Error("User with the provided email not found");
    }
    console.log("id: ", user.ID);
    const userId = user.ID;

    // Query to fetch user application based on listingId and userId
    const userApplicationQuery = `
      SELECT * FROM userapplication WHERE listing_id = ? AND user_id = ?;
    `;
    const [userApplication] = await new Promise((resolve, reject) => {
      db.query(userApplicationQuery, [listingId, userId], (error, results) => {
        console.log("in query", results);
        if (error) reject(error);
        else resolve(results);
      });
    });

    if (!userApplication) {
      throw new Error(
        "User application not found for the given listing and user"
      );
    }

    return userApplication;
  } catch (error) {
    throw new Error("Failed to get hall ticket: " + error.message);
  }
};

//MUTATIONS//
const loginMutation = async (_, { email, password }) => {
  const query = `SELECT * FROM usercredentials where email=? and password=SHA2(?, 256);`;
  return new Promise((resolve, reject) => {
    db.query(query, [email, password], (err, results) => {
      if (err) {
        reject(new Error("Database error"));
      }
      if (results.length === 1) {
        const user = results[0];
        const token = jwt.sign({ userEmail: user.Email }, "walkinportal", {
          expiresIn: "1h",
        });
        resolve({ token, email: user.Email });
      } else {
        resolve({ token: null, email: "Invalid credentials" });
      }
    });
  });
};

const registerMutation = async (_, { input }) => {
  // const generatedPassword = "mypass";
  const generatedPassword = generator.generate({
    length: 7,
    numbers: true,
  });
  try {
    const mailDraft = {
      from: "cinematicchaos70@gmail.com",
      to: input.email,
      subject: `Welcome to Walk-In Portal`,
      html: `
          <p>Hello!</p>
          <p>Welcome to Walk-In Portal!</p>
          <p>Your login information:</p>
          <ul>
              <li><strong>Email:</strong> ${input.email}</li>
              <li><strong>Password:</strong> "${generatedPassword}"</li>
          </ul>
          <p>Reach out if you need assistance.</p>
          <p>Regards,<br/>Walk-In Portal Team</p>
      `,
    };

    // Begin transaction
    await new Promise((resolve, reject) => {
      db.beginTransaction(async (err) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          // Extract data from the request body
          const {
            email,
            password,
            phoneNumber,
            firstName,
            lastName,
            resume,
            profilePhoto,
            portfolioURL,
            preferredJobRole,
            haveReferral,
            referralEmployeeName,
            receiveUpdates,
            aggregatePercentage,
            passingYear,
            educationQualification,
            stream,
            collegeId,
            collegeLocation,
            applicationType,
            appliedBefore,
            roleApplied,
            technologiesFamiliar,
            otherTechnologies,
            yearsOfExperience,
            currentCTC,
            expectedCTC,
            technologiesExpertise,
            otherExpertiseTechnologies,
            onNoticePeriod,
            endDateOfNotice,
            durationOfNoticePeriod,
          } = input;
          console.log(preferredJobRole);
          // Insert user credentials
          const insertUserCredentialsQuery = `
            INSERT INTO usercredentials (Email, Password, PhoneNumber, dt_created, dt_modified)
            VALUES (?, SHA2(?, 256), ?, NOW(), NOW());
          `;
          await new Promise((resolve, reject) => {
            db.query(
              insertUserCredentialsQuery,
              [email, generatedPassword, phoneNumber],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          });

          // Get the newly inserted user's ID
          const getUserIdQuery = `
            SELECT ID FROM usercredentials WHERE Email = ?;
          `;
          const [result] = await new Promise((resolve, reject) => {
            db.query(getUserIdQuery, [email], (error, results) => {
              if (error) reject(error);
              else resolve(results);
            });
          });
          console.log(result);
          const userId = result.ID;

          // Insert user details
          const insertUserDetailsQuery = `
            INSERT INTO userdetails (UserId, FirstName, LastName, Resume, ProfilePhoto, PortfolioURL, PreferredJobRole, HaveReferral, ReferralEmployeeName, ReceiveUpdates, dt_created, dt_modified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
          `;
          console.log(preferredJobRole[0]);
          console.log(JSON.stringify(preferredJobRole));
          await new Promise((resolve, reject) => {
            db.query(
              insertUserDetailsQuery,
              [
                userId,
                firstName,
                lastName,
                resume,
                profilePhoto,
                portfolioURL,
                preferredJobRole, //nedd a change
                haveReferral,
                referralEmployeeName,
                receiveUpdates,
              ],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          });

          // Insert qualifications
          const insertQualificationsQuery = `
            INSERT INTO qualifications (UserId, AggregatePercentage, PassingYear, EducationQualification, Stream, college_id, CollegeLocation, ApplicationType, AppliedBefore, RoleApplied, TechnologiesFamiliar, OtherTechnologies, dt_created, dt_modified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
          `;
          await new Promise((resolve, reject) => {
            db.query(
              insertQualificationsQuery,
              [
                userId,
                aggregatePercentage,
                passingYear,
                educationQualification,
                stream,
                collegeId,
                collegeLocation,
                applicationType,
                appliedBefore,
                roleApplied,
                technologiesFamiliar[0], //need to change
                otherTechnologies,
              ],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          });

          // Insert user experience
          const insertUserExperienceQuery = `
            INSERT INTO userexperience (user_id, YearsOfExperience, CurrentCTC, ExpectedCTC, TechnologiesExpertise, OtherExpertiseTechnologies, OnNoticePeriod, EndDateOfNotice, DurationOfNoticePeriod, dt_created, dt_modified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
          `;
          await new Promise((resolve, reject) => {
            db.query(
              insertUserExperienceQuery,
              [
                userId,
                yearsOfExperience,
                currentCTC,
                expectedCTC,
                technologiesExpertise[0], //need to change
                otherExpertiseTechnologies,
                onNoticePeriod,
                endDateOfNotice,
                durationOfNoticePeriod,
              ],
              (error) => {
                if (error) reject(error);
                else resolve();
              }
            );
          });

          // Commit transaction
          db.commit((error) => {
            if (error) reject(error);
            else {
              contactmailer.sendMail(mailDraft, (error) => {
                console.log(error || "Email sent");
              });
              resolve();
            }
          });
        } catch (error) {
          // Rollback on error
          db.rollback(() => {
            reject(error);
          });
        }
      });
    });

    // Return user details if registration is successful
    const getUserDetailsQuery = `
      SELECT *
      FROM usercredentials uc
      JOIN userdetails ud ON uc.ID = ud.UserId
      JOIN qualifications q ON q.UserId = ud.UserId
      JOIN userexperience ue ON ue.user_id = ud.UserId
      WHERE uc.Email = ?;
    `;
    const [userDetails] = await new Promise((resolve, reject) => {
      db.query(getUserDetailsQuery, [input.email], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });

    return userDetails;
  } catch (error) {
    throw new Error("Registration failed: " + error.message);
  }
};

const applyMutaion = async (_, { input }) => {
  try {
    // Begin transaction
    console.log(input);
    await new Promise((resolve, reject) => {
      db.beginTransaction(async (err) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          // Get the user ID based on the provided email
          const getUserIdQuery = `
            SET @NewUserID := (SELECT ID FROM usercredentials WHERE Email = ?);
            SELECT @NewUserID;
          `;
          const result = await new Promise((resolve, reject) => {
            db.query(getUserIdQuery, [input.email], (err, results) => {
              // console.log("in query", results[1][0]);
              if (err) reject(err);
              else if (results[1][0]["@NewUserID"] == null)
                reject({ message: "No account found with that email" });
              else resolve(results[1][0]);
            });
          });
          console.log("result", result);
          const userId = result["@NewUserID"];
          if (userId == null) {
            console.log("null userid");
          }
          // Apply to the listing
          const applyToListingQuery = `
          INSERT INTO userapplication (listing_id, user_id, time_slot_id, user_resume, dt_created, dt_modified)
          VALUES (?, @NewUserID, ?, ?, NOW(), NOW());
        `;
          const applicationResult = await new Promise((resolve, reject) => {
            db.query(
              applyToListingQuery,
              [input.listingId, input.timeSlotId, input.userResume],
              (error, results) => {
                console.log("application:", results);
                if (error) reject(error);
                else resolve(results);
              }
            );
          });
          const applicationId = applicationResult.insertId;
          console.log("id", applicationId);

          // Insert preferred roles
          const insertPreferredRolesQuery = `
          INSERT INTO userpreferredroles (application_id, role_id)
          VALUES (?, ?);
        `;
          await Promise.all(
            input.preferredRoles.map(async (roleId) => {
              await new Promise((resolve, reject) => {
                db.query(
                  insertPreferredRolesQuery,
                  [applicationId, roleId],
                  (error) => {
                    if (error) reject(error);
                    else resolve();
                  }
                );
              });
            })
          );

          // Commit transaction
          db.commit((error) => {
            if (error) reject(error);
            else resolve();
          });
        } catch (error) {
          // Rollback on error
          db.rollback(() => {
            reject(error);
          });
        }
      });
    });

    // Return success message if application is successful
    return { message: "Application successful" };
  } catch (error) {
    throw new Error("Application failed: " + error.message);
  }
};

const resolvers = {
  Query: {
    getColleges,
    getEducationQualifications,
    getJobRole,
    getWalkinListing,
    getAllWalkinListing,
    getWalkinTimeSlots,
    getWalkinTimeSlot,
    getAdditionalInformation,
    getWalkinroles,
    getWalkinrole,
    getApplicationpreferredRoles,
    getApplication,
    getHallTicket,
  },
  WalkinRoles: {
    role(parent, _, context, info) {
      const tmp = getJobRole(
        parent,
        { roleId: parent.role_id },
        parent.context,
        parent.info
      );
      // console.log(tmp);
      return tmp;
    },
  },

  WalkinListing: {
    roles(parent, _, context, info) {
      const tmp = getWalkinroles(
        parent,
        { listingId: parent.listing_id },
        parent.context,
        parent.info
      );
      // console.log("roles", tmp);
      return tmp;
    },
    timeslots(parent, _, context, info) {
      const tmp = getWalkinTimeSlots(
        parent,
        { listingId: parent.listing_id },
        context,
        info
      );
      // console.log("timeslots", tmp);
      return tmp;
    },
    additionalInformation(parent, _, context, info) {
      const tmp = getAdditionalInformation(
        parent,
        { listingId: parent.listing_id },
        context,
        info
      );
      // console.log("additionalInformation", tmp);
      return tmp;
    },
  },
  UserPreferredRoles: {
    role(parent, _, context, info) {
      roleId;
      const tmp = getJobRole(parent, { roleId: parent.role_id }, context, info);
      // console.log("roles", tmp);
      return tmp;
    },
  },
  UserApplication: {
    listing(parent, _, context, info) {
      // console.log("context", context);
      const listing = getWalkinListing(
        "",
        { listingId: parent.listing_id },
        context,
        info
      );
      return listing;
    },
    preferredRoles(parent, _, context, info) {
      return getApplicationpreferredRoles(
        parent,
        { applicationId: parent.ApplicationId },
        context,
        info
      );
    },
    timeslot(parent, args, context, info) {
      return getWalkinTimeSlot(
        parent,
        { id: parent.time_slot_id },
        context.info
      );
    },
  },

  Mutation: {
    login: loginMutation,
    register: registerMutation,
    apply: applyMutaion,

    //query input :
    // {
    //   "input": {
    //     "aggregatePercentage": 60,
    //     "applicationType": "Experienced",
    //     "appliedBefore": false,
    //     "collegeId": "1",
    //     "collegeLocation": "ahmedabad",
    //     "currentCTC": 35000,
    //     "durationOfNoticePeriod": 3,
    //     "educationQualification": "1",
    //     "email": "register9@gmail.com",
    //     "expectedCTC": 65000,
    //     "endDateOfNotice": "2024-02-15",
    //     "firstName": "register",
    //     "haveReferral": true,
    //     "lastName": "register",
    //     "onNoticePeriod": true,
    //     "otherExpertiseTechnologies": "django",
    //     "otherTechnologies": "django",
    //     "passingYear": 2021,
    //     "password": "mypass",
    //     "phoneNumber": "9512511323",
    //     "portfolioURL": "text.com",
    //     "preferredJobRole": "Software Engineer",
    //     "profilePhoto": "test.jpg",
    //     "receiveUpdates": true,
    //     "referralEmployeeName": "purvajit",
    //     "resume": "test.pdfccc",
    //     "roleApplied": null,
    //     "stream": "cse",
    //     "technologiesExpertise": "React",
    //     "technologiesFamiliar": "React",
    //     "yearsOfExperience": 3
    //   },
    // }
  },
};

function verifyToken(token) {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.verify(token, "walkinportal");
    return decoded;
  } catch (error) {
    return null;
  }
}

const server = new ApolloServer({
  // typrdefs
  typeDefs,
  //resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => ({
    authorization: req.headers.authorization,
  }),
});

console.log("Server started at", 4000);
