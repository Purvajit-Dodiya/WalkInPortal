import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { connection as db } from "./databaseConnection.js";
import jwt from "jsonwebtoken";

const getColleges = async () => {
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
  // console.log("args", args);
  const decodedToken = verifyToken(context.authorization);
  if (!decodedToken) {
    throw new Error("Unauthorized");
  }
  const { listingId } = args;

  return new Promise((resolve, reject) => {
    const query = `
        SELECT * FROM walkinlisting
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

const resolvers = {
  Query: {
    getColleges,
    getJobRole,
    getWalkinListing,
    getAllWalkinListing,
    getWalkinTimeSlots,
    getAdditionalInformation,
    getWalkinroles,
  },
  WalkinRoles: {
    role(parent) {
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
    roles(parent) {
      const tmp = getWalkinroles(
        parent,
        { listingId: parent.listing_id },
        parent.context,
        parent.info
      );
      // console.log("roles", tmp);
      return tmp;
    },
    timeslots(parent) {
      const tmp = getWalkinTimeSlots(
        parent,
        { listingId: parent.listing_id },
        parent.context,
        parent.info
      );
      // console.log("timeslots", tmp);
      return tmp;
    },
    additionalInformation(parent) {
      const tmp = getAdditionalInformation(
        parent,
        { listingId: parent.listing_id },
        parent.context,
        parent.info
      );
      // console.log("additionalInformation", tmp);
      return tmp;
    },
  },
  Mutation: {
    login: loginMutation,
    register: async (_, { input }) => {
      try {
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

              // Insert user credentials
              const insertUserCredentialsQuery = `
                INSERT INTO usercredentials (Email, Password, PhoneNumber, dt_created, dt_modified)
                VALUES (?, SHA2(?, 256), ?, NOW(), NOW());
              `;
              await new Promise((resolve, reject) => {
                db.query(
                  insertUserCredentialsQuery,
                  [email, password, phoneNumber],
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
                    preferredJobRole[0], //nedd a change
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
    },
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
