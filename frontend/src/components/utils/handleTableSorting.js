export const handleUpArrowClick = (data, key) => {
    return [...data].sort((a, b) => {
        if (a[key] === undefined || b[key] === undefined) return 0;
        return String(a[key]).localeCompare(String(b[key]), 'el', { sensitivity: 'base' });
    });
};

export const handleDownArrowClick = (data, key) => {
    return [...data].sort((a, b) => {
        if (a[key] === undefined || b[key] === undefined) return 0;
        return String(b[key]).localeCompare(String(a[key]), 'el', { sensitivity: 'base' });
    });
};