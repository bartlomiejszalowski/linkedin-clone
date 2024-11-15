import { useState } from "react";

export const useSignUpFormValidation = () => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = async (formFields) => {
    const errors = {};

    // Name validation
    if (
      !formFields.name ||
      formFields.name.length < 2 ||
      formFields.name.length > 50
    ) {
      errors.name = "Name must be between 2 and 50 characters";
    }

    // Username validation
    if (
      !formFields.username ||
      formFields.username.length < 3 ||
      formFields.username.length > 30
    ) {
      errors.username = "Username must be between 3 and 30 characters";
    }

    // Email validation (basic format check, excluding unique check)
    if (!formFields.email || !/\S+@\S+\.\S+/.test(formFields.email)) {
      errors.email = "Please enter a valid email address";
    }

    //one digit
    //one special character
    //at least 8 characters
    // at least one lowercase letter
    // at least one uppercase letter

    // Password validation (minimum length check, at least one lowercase letter, at least one uppercase letter, one digit, and one special character)
    if (!formFields.password || formFields.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[a-z]/.test(formFields.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(formFields.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(formFields.password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formFields.password)) {
      errors.password = "Password must contain at least one special character";
    }

    // Confirm password validation (match check)
    if (formFields.password !== formFields.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  return { formErrors, validateForm };
};

export const useSignInFormValidation = () => {
  const [formErrors, setFormErrors] = useState({});
  const errors = {};
  const validateForm = async (formFields) => {
    // Username validation
    if (
      !formFields.username ||
      formFields.username.length < 3 ||
      formFields.username.length > 30
    ) {
      errors.username = "Username must be between 3 and 30 characters";
    }

    // Password validation (minimum length check, at least one lowercase letter, at least one uppercase letter, one digit, and one special character)
    if (!formFields.password || formFields.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[a-z]/.test(formFields.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(formFields.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(formFields.password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formFields.password)) {
      errors.password = "Password must contain at least one special character";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  return { formErrors, validateForm };
};
