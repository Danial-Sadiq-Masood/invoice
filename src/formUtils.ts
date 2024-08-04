import { InputState } from "./enums"

export enum FormModelElemTypes {
  QUESTION,
  FORM_SECTION
}

export function createFormModelElement(obj, modelType) {
  obj.formModelElemType = modelType
  return obj;
}

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
  return createFormModelElement({
    val: "",
    valid: createFormValidationStatus(InputState.VALID, ""),
    validationFunctions: [checkEmpty, ...validationFunctions],
  }, FormModelElemTypes.QUESTION)
}

export function setFormElementValidationStatus(formModelEl) {
  const validationStatus = formModelEl.validationFunctions
    .map((d) => {
      return d(formModelEl.val)
    })

  const invalidStatus = validationStatus.find(d => d.status === InputState.INVALID)

  if (invalidStatus) {
    formModelEl.valid = invalidStatus
  } else {
    formModelEl.valid = createFormValidationStatus(InputState.VALID)
  }
}
