import { body } from "express-validator";
import User from "../models/user.model.js";

export const signUpValidator = [
  // Name validation
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .notEmpty()
    .withMessage("Name cannot be empty"),

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
        if (userDoc) {
          // Reject if a user with the same username already exists
          return Promise.reject("Username already exists");
        }
      });
    }),

  // Email validation with uniqueness check
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .custom((value) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          // If userDoc is found, the email already exists
          return Promise.reject("Email address already exists");
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
    .withMessage("Password must contain at least one special character"),

  // Confirm Password validation
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Confirm Password does not match Password");
    }
    return true;
  }),
];
