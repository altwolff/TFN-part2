function validateIsbn(isbn) {
    const isValid = /^\d{13}$/.test(isbn);
    return {
        valid: isValid,
        error: isValid ? null : 'ISBN musi składać się z dokładnie 13 cyfr'
    };
}

function validateYear(year) {
    const currentYear = new Date().getFullYear();
    const isValid = Number.isInteger(year) && year >= 1000 && year <= currentYear;
    return {
        valid: isValid,
        error: isValid ? null : `Rok wydania musi być między 1000 a ${currentYear}`
    };
}

function validatePositiveNumber(value) {
    const isValid = typeof value === 'number' && value > 0;
    return {
        valid: isValid,
        error: isValid ? null : 'Wartość musi być liczbą większą od zera'
    };
}

function validateRequiredString(value) {
    const isValid = typeof value === 'string' && value.trim().length > 0;
    return {
        valid: isValid,
        error: isValid ? null : 'Pole tekstowe nie może być puste'
    };
}

module.exports = {
    validateIsbn,
    validateYear,
    validatePositiveNumber,
    validateRequiredString
};