import cogoToast from "cogo-toast"

export const toastSuccess = (message => cogoToast.success(message))
export const toastError = (message => cogoToast.error(message))