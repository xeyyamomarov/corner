import React from 'react'
import { TextField } from "@mui/material";


const Category = ({
    selectedCategory,
    categoryDropdown,
    categoryOpen,
    selectedCategoryList,
    categoryAddData
}) => {
    
  return (
    <>
        <div className="class-input">
            <div className="class-field">
            <TextField
                sx={{
                "& input": {
                    fontSize: "12px",
                    marginRight: '32px'
                },
                marginTop: "20px",
                marginBottom: "24px",
                }}
                InputLabelProps={{
                style: { fontSize: "12px", color: "#3F3F3F" },
                }}
                fullWidth
                label="Kateqoriya"
                name="class"
                autoComplete="off"
                value={selectedCategory ? selectedCategory.name : ""}
                onClick={categoryDropdown}
            />
            <div className="dropdown-icon" onClick={categoryDropdown}>
                <svg
                className={!categoryOpen ? "down" : "up"}
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

            <ul className={`create-update-modal-dropdown where-coming ${categoryOpen ? "active" : ""}`}>
            {selectedCategoryList.map((item) => (
                <li key={item.key} onClick={() => categoryAddData(item)}>
                <h4>{item.name}</h4>
                </li>
            ))}
            </ul>
        </div>
        {/* {formik.errors.category && formik.touched.category &&  <small className="validation-err-message">{formik.errors.category}</small>} */}
        </>
  )
}

export default Category