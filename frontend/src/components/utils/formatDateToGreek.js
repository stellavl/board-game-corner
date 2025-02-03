export const formatDateToGreek = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("el-GR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  