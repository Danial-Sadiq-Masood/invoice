import { InputState } from "./enums"

export function createFormValidationStatus(status, message = "") {
    return {
      status: status,
      message: message
    }
  }
  
  export const checkEmpty = (val) => {
    if (val === "") {
      return createFormValidationStatus(InputState.INVALID, "Required Field")
    }
    return createFormValidationStatus(InputState.VALID)
  }
  
  export const validateEmail = (email) => {
    let match = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  
      if (!match) {
        return createFormValidationStatus(InputState.INVALID, "Email in invalid format")
      }
      return createFormValidationStatus(InputState.VALID)
  };
  
  export function getInitFormElementState(
    validationFunctions = []
  ) {
    return {
      val: "",
      valid: createFormValidationStatus(InputState.VALID, ""),
      validationFunctions: [checkEmpty,...validationFunctions]
    }
  }