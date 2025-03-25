export const validatePersonalData = (formData, fieldKey = null) => {
    let errors = {};

    const validateField = (field, value, validationRules) => {
        if (validationRules.required && !value) {
            errors[field] = validationRules.requiredMessage;
        } else if (validationRules.pattern && !validationRules.pattern.test(value)) {
            errors[field] = validationRules.patternMessage;
        } else if (validationRules.minLength && value.length < validationRules.minLength) {
            errors[field] = validationRules.minLengthMessage;
        } else if (validationRules.match && value !== formData[validationRules.match]) {
            errors[field] = validationRules.matchMessage;
        }
    };

    const fieldValidations = {
        firstName: {
            required: true,
            requiredMessage: "Το όνομα είναι υποχρεωτικό.",
        },
        lastName: {
            required: true,
            requiredMessage: "Το επίθετο είναι υποχρεωτικό.",
        },
        email: {
            required: true,
            requiredMessage: "Το email είναι υποχρεωτικό.",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            patternMessage: "Το email δεν είναι έγκυρο.",
        },
        phone: {
            required: true,
            requiredMessage: "Το τηλέφωνο είναι υποχρεωτικό.",
            pattern: /^\d{10}$/,
            patternMessage: "Το τηλέφωνο πρέπει να αποτελείται από 10 ψηφία.",
        },
        password: {
            required: true,
            requiredMessage: "Ο κωδικός πρόσβασης είναι υποχρεωτικός.",
            minLength: 6,
            minLengthMessage: "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.",
        },
        confirmPassword: {
            match: "password",
            matchMessage: "Οι κωδικοί δεν ταιριάζουν.",
        },
    };

    if (fieldKey) {
        const fieldValidation = fieldValidations[fieldKey];
        if (fieldValidation) {
            validateField(fieldKey, formData[fieldKey], fieldValidation);
        }
    } else {
        Object.keys(fieldValidations).forEach((field) => {
            validateField(field, formData[field], fieldValidations[field]);
        });
    }

    return errors;
};