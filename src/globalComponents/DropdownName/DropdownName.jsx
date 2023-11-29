import React, { useState, useEffect } from "react";
import "./dropdownName.css";
import { useLocation } from "react-router-dom";
import { ReactComponent as CheckIcon } from "../../assets/icons/Checkbox.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow-down-dropdown.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  getTeachersAction,
  getTeachersActiveAction,
} from "../../redux/actions/teachersActions";
import { getStudentsAction } from "../../redux/actions/studentsActions";
import {
  DROPDOWN_NAME_ACTION_TYPE,
  DATEPICKER_ACTION_TYPE,
  PAGINATION_PAGE_NUMBER_ACTION_TYPE,
} from "../../redux/actions-type";
import { useCustomHook } from "../GlobalFunctions/globalFunctions";

export const DropdownName = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { changeDropdownNameErr } = useCustomHook();
  const { students } = useSelector((state) => state.studentsPagination);
  const { teachers } = useSelector((state) => state.teachersPagination);
  const { mainpageType } = useSelector((state) => state.mainpageType);
  const { dropdownNameError } = useSelector((state) => state.dropdownNameError);
  const { dropdownName } = useSelector((state) => state.dropdownName);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ searchedValue, setSearcherValue ] = useState('')
  const [selectedName, setSelectedName] = useState('')

  const nameData =
    mainpageType === "teacher"
      ? teachers?.filter((teacher) => teacher)
      : students?.filter((student) => student);

  const clearFiltersForLesson = () => {
    if (
      location.pathname === "/" ||
      location.pathname === "/student" ||
      location.pathname === "/temporary-table"
    ) {
      dispatch({
        type: DATEPICKER_ACTION_TYPE.START_DATE,
        payload: "",
      });
      dispatch({
        type: DATEPICKER_ACTION_TYPE.END_DATE,
        payload: "",
      });
      dispatch({
        type: PAGINATION_PAGE_NUMBER_ACTION_TYPE.UPDATE_PAGE_NUMBER,
        payload: 0,
      });
    }
  }
  const changeDropdownName = (data) => {
    dispatch({type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN,payload: data});
    setSelectedName(data.fullName)
    setDropdownOpen(false);
    
    setTimeout(() => {
    setSearcherValue('')
    }, 500);
    clearFiltersForLesson()
  };
  const searchData = (e) => {
    setDropdownOpen(true)
    setSearcherValue(e.target.value)
    setSelectedName('')
  }
  const changeOpenDropdown = () => {
    if(!selectedName && dropdownName) {
      setSelectedName(dropdownName.fullName)
    }
    setDropdownOpen(!dropdownOpen)
    setTimeout(() => {
      setSearcherValue('')
      }, 500);
  }

  useEffect(() => {
    changeDropdownNameErr(false);
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: "" });
    setSearcherValue('')
    setSelectedName('')
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(getTeachersAction());
    } else if (location.pathname === "/temporary-table") {
      {
        /* temporary table */
      }
      dispatch(getTeachersAction());
    } else {
      dispatch(getTeachersActiveAction());
    }
    dispatch(getStudentsAction());
  }, [dispatch]);

  useEffect(() => {
    if (dropdownName) {
      changeDropdownNameErr(false);
    }
  }, [dropdownName]);


  return (
    <div
      className={`global-category-dropdown dropdown-name name ${
        dropdownOpen ? "active" : ""
      }`}
    >
      <div
        className="dropdown-head" 
        
      >
        <input
          type="text"
          placeholder={
            mainpageType === "teacher" ? "Müəllim adı" : "Tələbə adı"
          }
          onChange={(e) => searchData(e)}
          value={selectedName? selectedName : searchedValue}
          // value={dropdownName ? dropdownName.fullName : searchedValue}
        />
        {/* <h2>
          {dropdownName
            ? dropdownName.fullName
            : mainpageType === "teacher"
            ? "Müəllim adı"
            : "Tələbə adı"}
        </h2> */}
        <div className="arrow-icon" onClick={() => changeOpenDropdown()}>
          <ArrowIcon />
        </div>
      </div>

      <div className="dropdown-body">
        <ul>
          {nameData?.filter((item) => item.fullName.toLowerCase().includes(searchedValue.toLowerCase())).map((item, i) => {
            const { fullName, _id, courses, deleted } = item;
            return (
              <li
                key={i}
                onClick={() =>
                  changeDropdownName({ fullName, _id, courses, deleted })
                }
                className={deleted ? "deleted" : ""}
              >
                {dropdownName && dropdownName._id === _id && <CheckIcon />}
                {fullName}
              </li>
            );
          })}
        </ul>
      </div>

      {dropdownNameError && (
        <small className="err-message">Zəhmət olmasa ilk öncə ad seçin.</small>
      )}
    </div>
  );
};
