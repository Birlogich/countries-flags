import { useSelector, useDispatch } from "react-redux";
import {
  selectCountriesInfo,
  selectVisibleCountries,
  loadCountries,
} from "./countries-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { selectControls } from "../controls/controls-slice";

export const useCountries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [navigate, countries, status, error];
};
