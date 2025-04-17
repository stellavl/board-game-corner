export const handleDateNavigation = (currentDate, filter, direction) => {
    const newDate = new Date(currentDate);

    switch (filter) {
        case "year":
            newDate.setFullYear(newDate.getFullYear() + direction);
            break;
        case "month":
            newDate.setMonth(newDate.getMonth() + direction);
            break;
        case "week":
            newDate.setDate(newDate.getDate() + direction * 7);
            break;
        case "day":
            newDate.setDate(newDate.getDate() + direction);
            break;
        default:
            return currentDate;
    }

    return newDate;
};