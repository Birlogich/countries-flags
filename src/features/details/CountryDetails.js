import { useSelector, useDispatch } from "react-redux";

import { selectDetails } from "./details-slice";
import { useEffect } from "react";
import { clearDetails, loadCountryByName } from "./details-slice";
import { Info } from "./Info";

export const CountryDetails = ({ name = "", navigate }) => {
  const dispatch = useDispatch();
  const { currentCountry, error, status } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);

  return (
    <>
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};
