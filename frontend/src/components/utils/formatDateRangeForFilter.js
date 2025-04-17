export const formatDateRangeForFilter = (filter, currentDate) => {
    const monthNames = [
        "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
        "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
    ];

    switch (filter) {
        case "year":
            return `${currentDate.getFullYear()}`;
        case "month":
            return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        case "week":
            const weekStart = new Date(currentDate);
            weekStart.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return `${weekStart.toLocaleDateString("el-GR")} - ${weekEnd.toLocaleDateString("el-GR")}`;
        case "day":
            return `${currentDate.toLocaleDateString("el-GR")}`;
        default:
            return "";
    }
};