function checkUsername(username) {
    let usernamePattern = /^[a-z][a-z_0-9]*$/;

    if (!usernamePattern.test(username)) {
        return "Username should contain only lowarcase characters, digits and underscore(_). It should start with a lowercase character."
    }
    return "";
}

export default checkUsername;