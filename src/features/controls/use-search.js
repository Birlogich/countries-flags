import { selectSearch } from "./controls-slice";
import { setSearch } from "./controls-slice";
import { useSelector, useDispatch } from "react-redux";

export const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [handleSearch, search];
};
