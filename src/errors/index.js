function conflictError(message) {
    return {
        name: "ConflictError",
        message,
    };
}

function duplicatedEmailError(email) {
    return {
        name: "DuplicatedEmailError",
        message: "There is already an user with given email",
        email,
    };
}

function unauthorizedError() {
    return {
        name: "UnauthorizedError",
        message: "You must be signed in to continue",
    };
}

function notFoundError() {
    return {
        name: "NotFoundError",
        message: "No result for this search!",
    };
}

function invalidCredentialsError() {
    return {
        name: "InvalidCredentialsError",
        message: "Email or password are incorrect",
    };
}

function appointmentIsNotYoursError() {
    return {
        name: "appointmentIsNotYoursError",
        message: "This appointment is not yours",
    };
}

function appointmentFinishedError() {
    return {
        name: "appointmentFinishedError",
        message: "This appointment has already been completed",
    };
}

function notAvailableError() {
    return {
        name: "notAvailableError",
        message: "Horary is not available",
    };
}

function doctorExistsError() {
    return {
        name: "doctorExistsError",
        message: "Doctor already exists",
    };
}

function doctorNotExistsError() {
    return {
        name: "doctorNotExistsError",
        message: "Doctor not exists",
    };
}

export default {
    conflictError,
    duplicatedEmailError,
    unauthorizedError,
    notFoundError,
    invalidCredentialsError,
    appointmentIsNotYoursError,
    appointmentFinishedError,
    notAvailableError,
    doctorExistsError,
    doctorNotExistsError
};