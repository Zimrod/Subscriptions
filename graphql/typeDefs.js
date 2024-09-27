const { gql } = require("apollo-server");

module.exports = gql`
  type Agriculture {
    _id: ID!
    description: String
    country: String
    province: String
    ward: String
    nearest: String
    distanceFrom: String
    offering: String
    owner: String
    yearEstab: String
    propSize: String
    landType: String
    useCase: [String]
    equipSched: String
    finStats: String
    bizPlan: String
    soilSurvey: String
    crops: [String]
    animals: [String]
    soiltype: [String]
    climate: String
    topography: [String]
    opStage: String
    permits: String
    zoning: String
    deeds: String
    numEmployees: String
    turnover: String
    map: String
    plans: String
    price: String
    img: [String]
    taxes: [String]
    email: String
    features: [String]
    listingRef: String
    listingDate: String
    publicPrivate: String
    minInvest: String
    reservedAmt: String
    remainAmt: String
    investedAmt: [Investment]
  }

  type Investment {
    amount: String
    email: String
    dateCreated: String
  }

  type User {
    fullname: String!
    username: String!
    email: String!
    mobile: String!
    password: String!
    token: String
    isVerified: Boolean!
    creationTime: Int
  }

  type Message {
    text: String
    createdAt: String
    createdBy: String
  }

  input AgricultureInput {
    description: String
    country: String
    province: String
    ward: String
    nearest: String
    distanceFrom: String
    offering: String
    owner: String
    yearEstab: String
    propSize: String
    landType: String
    useCase: [String]
    equipSched: String
    finStats: String
    bizPlan: String
    soilSurvey: String
    crops: [String]
    animals: [String]
    soiltype: [String]
    climate: String
    topography: [String]
    opStage: String
    permits: String
    zoning: String
    deeds: String
    numEmployees: String
    turnover: String
    map: String
    plans: String
    price: String
    img: [String]
    taxes: [String]
    email: String
    features: [String]
    listingRef: String
    listingDate: String
    publicPrivate: String
    minInvest: String
    reservedAmt: String
    remainAmt: String
    investedAmt: [InvestmentInput]
  }

  input InvestmentInput {
    amount: String
    email: String
    dateCreated: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    agrics(
      offering: String
      province: String
      nearest: String
      owner: String
      bizPlan: String
    ): [Agriculture]
    allAgric: [Agriculture!]
    message(id: ID!): Message
    user(token: String!): User
    getAllUsers: [User!]!
  }

  type BookingResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    createAgric(agricultureInput: AgricultureInput): Agriculture
    loginUser(loginInput: LoginInput): User
    verifyEmail(token: String!): User
    resetPassword(token: String!, newPassword: String!): User
    updateAgricReserve(id: ID!, reservedAmt: String): Agriculture
    updateAgricInvested(
      id: ID!
      remainAmt: String
      investedAmt: [InvestmentInput]
    ): Agriculture
  }

  type Subscription {
    remainAmtUpdate(id: ID!, remainAmt: String): Agriculture
  }
`;
