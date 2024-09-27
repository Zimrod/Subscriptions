const User = require("../../models/User");
const { ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-errors");
const nodemailer = require("nodemailer");
const postmark = require("postmark");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  Query: {
    // user: async (_, { token }) => {
    //   try {
    //     const user = await User.findOne({ token });
    //     return user;
    //   } catch (error) {
    //     console.error("Error fetching user:", error);
    //     throw new Error("Failed to fetch user");
    //   }
    // },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error("Error fetching users from the database");
      }
    },
  },
};
