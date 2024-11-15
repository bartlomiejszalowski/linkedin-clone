import { body } from "express-validator";
import User from "../models/user.model.js";

export const signInValidator = [
  // Username validation
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .custom((value) => {
      return User.findOne({ username: value }).then((userDoc) => {
        if (!userDoc) {
          // Reject if no user with this username is found
          return Promise.reject("Username not found");
        }
      });
    }),

  // Password validation
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character")
    .notEmpty()
    .withMessage("Password cannot be empty"),
];
