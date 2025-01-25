export const dicomDateQueryStringFromDateFromDateTo = (
  dateFrom: string,
  dateTo: string
): string => {
  let dateString = "";
  const dicomDateFrom = dateFrom.split("-").join("");
  const dicomDateTo = dateTo.split("-").join("");
  if (dicomDateFrom !== "" && dicomDateTo !== "") {
    dateString = dicomDateFrom + "-" + dicomDateTo;
  } else if (dicomDateFrom === "" && dicomDateTo !== "") {
    dateString = "-" + dicomDateTo;
  } else if (dicomDateFrom !== "" && dicomDateTo === "") {
    dateString = dicomDateFrom + "-";
  }
  return dateString;
};
