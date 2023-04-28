export const getChartData = (data, filter) => {
  let victims;
  switch (filter) {
    case "infected":
      victims =
        data?.infected &&
        Object.keys(data?.infected).map((e) => data?.infected[e]);
      break;
    case "recovered":
      victims =
        data?.recovered &&
        Object.keys(data?.recovered).map((e) => data?.recovered[e]);
      break;
    case "deaths":
      victims =
        data?.deaths && Object.keys(data?.deaths).map((e) => data?.deaths[e]);
      break;
    default:
      victims = null;
      break;
  }
  return victims;
};
