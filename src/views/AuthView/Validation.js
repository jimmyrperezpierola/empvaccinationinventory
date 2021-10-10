export const signIn = data => {
    let error = [];
    for (const [key, value] of Object.entries(data)) {
        if (key === "email") {
            if (value.length < 1) {
                error.push({ "error": "email", "errorValue": `Email is required.` })
            }
        }
        else {
            if (value.length < 1) {
                error.push({ "error": "password", "errorValue": "Password is required." })
            }
        }
    }
    return error;
}