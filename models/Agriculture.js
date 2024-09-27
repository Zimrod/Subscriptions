const { model, Schema } = require("mongoose");

const agricSchema = new Schema({
  description: String,
  country: String,
  province: String,
  ward: String,
  nearest: String,
  distanceFrom: String,
  offering: String,
  owner: String,
  yearEstab: String,
  propSize: String,
  landType: String,
  useCase: [{ type: String }],
  equipSched: String,
  finStats: String,
  bizPlan: String,
  soilSurvey: String,
  crops: [{ type: String }],
  animals: [{ type: String }],
  soiltype: [{ type: String }],
  climate: String,
  topography: [{ type: String }],
  opStage: String,
  permits: String,
  zoning: String,
  deeds: String,
  numEmployees: String,
  turnover: String,
  map: String,
  plans: String,
  price: String,
  img: [{ type: String }],
  taxes: [{ type: String }],
  email: String,
  features: [{ type: String }],
  listingRef: String,
  listingDate: String,
  publicPrivate: String,
  minInvest: String,
  reservedAmt: String,
  remainAmt: String,
  investedAmt: [
    {
      amount: String,
      email: String,
      dateCreated: String,
    },
  ],
});

module.exports = model("Agriculture", agricSchema);
