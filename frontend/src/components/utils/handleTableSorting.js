function parseValue(value) {
    // Check for date format DD-MM-YYYY
    if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
        const [day, month, year] = value.split('-').map(Number);
        return new Date(year, month - 1, day).getTime();
    }
    // Check for time format HH:mm
    if (/^\d{2}:\d{2}$/.test(value)) {
        const [hours, minutes] = value.split(':').map(Number);
        return hours * 3600 + minutes * 60;
    }
    // Fallback: return as string for localeCompare
    return value;
}

export const handleUpArrowClick = (data, key) => {
    return [...data].sort((a, b) => {
        if (a[key] === undefined || b[key] === undefined) return 0;
        const valA = parseValue(a[key]);
        const valB = parseValue(b[key]);
        if (typeof valA === "number" && typeof valB === "number") {
            return valA - valB;
        }
        return String(valA).localeCompare(String(valB), 'el', { sensitivity: 'base' });
    });
};

export const handleDownArrowClick = (data, key) => {
    return [...data].sort((a, b) => {
        if (a[key] === undefined || b[key] === undefined) return 0;
        const valA = parseValue(a[key]);
        const valB = parseValue(b[key]);
        if (typeof valA === "number" && typeof valB === "number") {
            return valB - valA;
        }
        return String(valB).localeCompare(String(valA), 'el', { sensitivity: 'base' });
    });
};