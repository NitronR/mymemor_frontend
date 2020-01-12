import cogoToast from "cogo-toast"

export const toastSuccess = (message => cogoToast.success(message, { position: 'bottom-right' }))