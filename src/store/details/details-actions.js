export const SET_LOADING = "@@details/SET_LOADING";
export const SET_ERROR = "@@details/SET_ERROR";
export const SET_COUNTRY = "@@details/SET_COUNTRY";
export const CLEAR_DETAILS = "@@details/CLEAR_DETAILS";
export const SET_NEIGHBOURS = "@@details/SET_NEIGHBOURS";

const setLoading = () => ({
  type: SET_LOADING,
});

const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
});

const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: country,
});

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

const setNeighbours = (countries) => ({
  type: SET_NEIGHBOURS,
  payload: countries,
});

export const loadCountryByName =
  (name) =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());

    client
      .get(api.searchByCountry(name))
      .then(({ data }) => dispatch(setCountry(data[0])))
      .catch((err) => dispatch(setError(err)));
  };

export const loadNeighBoursByBorder =
  (borders) =>
  (dispatch, _, { client, api }) => {
    client
      .get(api.filterByCode(borders))
      .then(({ data }) => dispatch(setNeighbours(data.map((c) => c.name))));
  };
