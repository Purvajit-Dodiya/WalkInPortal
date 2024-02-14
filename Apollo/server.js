import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.js";
import { connection as db } from "./databaseConnection.js";

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
          resolve(results[0]); // Return the first result (assuming role_id is unique)
        } else {
          resolve(null); // Return null if no matching record is found
        }
      }
    });
  });
};

const getWalkinListing = async (parent, args, context, info) => {
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
        console.log(results);
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
      const tmp = getJobRole(null, { roleId: parent.role_id }, "", "");
      // console.log(tmp);
      return tmp;
    },
  },

  WalkinListing: {
    roles(parent) {
      const tmp = getWalkinroles(
        null,
        { listingId: parent.listing_id },
        "",
        ""
      );
      console.log("roles", tmp);
      return tmp;
    },
    timeslots(parent) {
      const tmp = getWalkinTimeSlots(
        null,
        { listingId: parent.listing_id },
        "",
        ""
      );
      console.log("timeslots", tmp);
      return tmp;
    },
    additionalInformation(parent) {
      const tmp = getAdditionalInformation(
        null,
        { listingId: parent.listing_id },
        "",
        ""
      );
      console.log("additionalInformation", tmp);
      return tmp;
    },
  },
};

const server = new ApolloServer({
  // typrdefs
  typeDefs,
  //resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server startted at", 4000);
