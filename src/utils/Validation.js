export function checkUsername(username) {
    let usernamePattern = /^[a-z][a-z_0-9]*$/;

    if (!usernamePattern.test(username)) {
        return "Username should contain only lowarcase characters, digits and underscore(_). It should start with a lowercase character."
    }
    return "";
}
// returns an array of errors created by validating the
// given value with the given validators
export function getErrors(validators, value) {
    let errors = [];
    validators.forEach(validator => {
        let error = validator(value);
        if (error) {
            errors.push(error)
        }
    });
    return errors;
}

// validate URL
export default function URLValidator(str) {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    if (!pattern.test(str)) {
        return "Invalid URL";
    }
}