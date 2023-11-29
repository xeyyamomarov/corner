import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

const CategoryLists = ({
    setSelectedCategoryName,
    selectedCategoryName,
    categoryNameDropdown,
    categoryNameOpen,
    setCategoryNameOpen,
    categoryNameAddData,
    categoryList,
}) => {
  const [searchedValue, setSearcherValue] = useState("");
  const { dropdownName } = useSelector((state) => state.dropdownName);

  const searchData = (e) => {
    setSearcherValue(e.target.value);
    setSelectedCategoryName("");
    setCategoryNameOpen(true);
  };


  // console.log(selectedCategoryName,"selected");
  // console.log(dropdownName,"drop name")
  // console.log(searchedValue,"search")

  const changeOpenDropdown = () => {
    if (!selectedCategoryName && dropdownName) {
      // setselectedCategoryName(dropdownName.fullName)
    }
    setCategoryNameOpen(!categoryNameOpen);
  };

  return (
    <>
      <div className="class-input">
        <div className="class-field">
          <TextField
            sx={{
              "& input": {
                fontSize: "12px",
                marginRight: "32px",
              },
              marginTop: "20px",
            }}
            InputLabelProps={{
              style: { fontSize: "12px", color: "#3F3F3F" },
            }}
            fullWidth
            label="Kateqoriya "
            name="class"
            autoComplete="off"
            value={
              selectedCategoryName ? selectedCategoryName.name : searchedValue
            }
            onChange={(e) => searchData(e)}
            // onBlur={() => formik.setFieldTouched('whereComing', true)}
            onClick={categoryNameDropdown}
          />
          <div className="dropdown-icon">
            
              <div onClick={changeOpenDropdown}>
                <svg
                  className={!categoryNameOpen ? "down" : "up"}
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.92 9.4502L13.4 15.9702C12.63 16.7402 11.37 16.7402 10.6 15.9702L4.07999 9.4502"
                    stroke="#5D5D5D"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
          </div>
        </div>

        <ul
          className={`create-update-modal-dropdown where-coming ${
            categoryNameOpen ? "active" : ""
          }`}
        >
          {categoryList
            ?.filter((item) =>
              item.name.toLowerCase().includes(searchedValue.toLowerCase())
            )
            .map((item, i) => {
              return (
                <li key={i} onClick={() => categoryNameAddData(item)}>
                  <h4>{item.name}</h4>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CategoryLists;
