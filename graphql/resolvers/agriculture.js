const Agriculture = require("../../models/Agriculture");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

module.exports = {
  Subscription: {
    remainAmtUpdate: {
      subscribe: (_, { remainAmtUpdateId }) => {
        // Publish the event with a specific `remainAmtUpdateId`
        return pubsub.asyncIterator(`REMAIN_AMT_UPDATE_${remainAmtUpdateId}`);
      },
    },
  },
  Query: {
    async allAgric() {
      try {
        const allAgric = await Agriculture.find();
        return allAgric;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch agric opportunities");
      }
    },
    async agrics(_, { offering, province, nearest, owner, bizPlan }) {
      try {
        // Create a base query object
        const query = {};

        // Add additional parameters to the query if they are provided
        if (offering) {
          query.offering = offering;
        }

        if (province) {
          query.province = province;
        }

        if (nearest) {
          query.nearest = nearest;
        }

        if (owner) {
          query.owner = owner;
        }

        if (bizPlan) {
          query.bizPlan = bizPlan;
        }

        // Use the combined query to find agrics
        const agrics = await Agriculture.find(query);

        return agrics;
      } catch (error) {
        // Log the error for debugging
        console.error(error);
        throw error; // Rethrow the error to be handled at the GraphQL layer
      }
    },
    agricById: async (parent, { id }, context, info) => {
      try {
        const agriculture = await Agriculture.findById(id);
        return agriculture;
      } catch (error) {
        console.error("Error fetching agric project by ID:", error);
        throw error;
      }
    },
  },
  Mutation: {
    async createAgric(
      _,
      {
        agricultureInput: {
          description,
          country,
          province,
          ward,
          nearest,
          distanceFrom,
          offering,
          owner,
          yearEstab,
          propSize,
          landType,
          useCase,
          equipSched,
          finStats,
          bizPlan,
          soilSurvey,
          crops,
          animals,
          soiltype,
          climate,
          topography,
          opStage,
          permits,
          zoning,
          deeds,
          numEmployees,
          turnover,
          map,
          plans,
          price,
          img,
          taxes,
          email,
          features,
          listingRef,
          listingDate,
          publicPrivate,
          minInvest,
          reservedAmt,
          remainAmt,
          investedAmt,
        },
      }
    ) {
      const createdAgric = new Agriculture({
        description: description,
        country: country,
        province: province,
        ward: ward,
        nearest: nearest,
        distanceFrom: distanceFrom,
        offering: offering,
        owner: owner,
        yearEstab: yearEstab,
        propSize: propSize,
        landType: landType,
        useCase: useCase,
        equipSched: equipSched,
        finStats: finStats,
        bizPlan: bizPlan,
        soilSurvey: soilSurvey,
        crops: crops,
        animals: animals,
        soiltype: soiltype,
        climate: climate,
        topography: topography,
        opStage: opStage,
        permits: permits,
        zoning: zoning,
        deeds: deeds,
        numEmployees: numEmployees,
        turnover: turnover,
        map: map,
        plans: plans,
        price: price,
        img: img,
        taxes: taxes,
        email: email,
        features: features,
        listingRef: listingRef,
        listingDate: listingDate || new Date(),
        publicPrivate: publicPrivate,
        minInvest: minInvest,
        reservedAmt: reservedAmt,
        remainAmt: remainAmt,
        investedAmt: investedAmt,
      });

      const res = await createdAgric.save();

      return {
        id: res.id,
        ...res._doc,
      };
    },

    // async deleteProperty(_, {ID}) {
    //     const wasDeleted = (await Property.deleteOne({_id: ID})).deletedCount;
    //     return wasDeleted; //1 if something was deleted, 0 if nothing was deleted
    // },

    async updateAgricReserve(_, { id, reservedAmt }) {
      try {
        // Find and update the reservedAmt, and return the updated document
        const updatedAgric = await Agriculture.findByIdAndUpdate(
          id, // Match the document by ID
          { reservedAmt: reservedAmt }, // Update the reservedAmt field
          { new: true } // Return the updated document
        );

        // If no document was found, handle it
        if (!updatedAgric) {
          throw new Error("Agriculture record not found");
        }

        // Return the updated Agriculture document
        return updatedAgric;
      } catch (error) {
        console.error("Error updating agriculture:", error);
        throw new Error("Failed to update reservedAmt");
      }
    },

    async updateAgricInvested(_, { id, remainAmt }, { io }) {
      // Convert the investedAmt array to an array of InvestmentInput objects
      const investedAmtObjects = investedAmt.map((input) => ({
        amount: input.amount,
        email: input.email,
        dateCreated: input.dateCreated,
      }));

      try {
        const updatedAgriculture = await Agriculture.findOneAndUpdate(
          { _id: id },
          {
            remainAmt, // Update remainAmt
            $push: { investedAmt: { $each: investedAmtObjects } }, // Add investments to investedAmt array
          },
          { new: true } // Return the updated document
        );

        if (updatedAgriculture) {
          return updatedAgriculture;
        } else {
          throw new Error("Agriculture not found or update failed.");
        }
      } catch (error) {
        console.error("Error updating agriculture investments:", error);
        throw new Error("Failed to update investedAmt.");
      }

      server.listen(3001, () => {
        console.log("Server listening on port 3001");
      });
    },
  },
};
