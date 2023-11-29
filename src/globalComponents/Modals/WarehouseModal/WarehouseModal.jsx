import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  DROPDOWN_NAME_ACTION_TYPE,
  WAREHOUSE_M0DAL_ACTION_TYPE,
} from "../../../redux/actions-type";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField";
import SubmitBtn from "./components/SubmitBtn";
import { getTeachersAction } from "../../../redux/actions/teachersActions";
import CategoryLists from "./components/CategoryList";

export const WarehouseModal = () => {
  const dispatch = useDispatch();
  const { warehouseModalData } = useSelector((state) => state.warehouseModal);
  //   const { teachers } = useSelector((state) => state.teachersPagination);
  const { courses } = useSelector((state) => state.coursesPagination);
  const categoryList = courses?.filter((category) => category?.name);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [categoryNameOpen, setCategoryNameOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [classIcon, setClassIcon] = useState(false);
  const inputArr = ["product", "amount"];

  const categoryNameDropdown = () => {
    setCategoryNameOpen(!categoryNameOpen);
    setClassIcon(false);
  };
  const categoryNameAddData = (item) => {
    updateModalState("category", item.id);
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: item });
    setCategoryNameOpen(false);
    setSelectedCategoryName(item);
  };

  const updateModalState = (keyName, value) => {
    dispatch({
      type: WAREHOUSE_M0DAL_ACTION_TYPE.GET_WAREHOUSE_MODAL,
      payload: {
        data: {
          ...warehouseModalData,
          category: selectedCategoryName?.name,
          [keyName]: value,
        },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: WAREHOUSE_M0DAL_ACTION_TYPE.GET_WAREHOUSE_MODAL,
      payload: { data: {}, openModal: false },
    });
  };

  useEffect(() => {
    dispatch(getTeachersAction());
  }, [dispatch]);

  useEffect(() => {
    if (warehouseModalData?.id && courses) {
      if (warehouseModalData.category) {
        setSelectedCategoryName(
          courses.filter((item) => item.id === warehouseModalData.category)[0]
        );
      }
    }
  }, [courses]);

  return (
    <div className="create-update-modal-con bonus-modal">
      <div className="create-update-modal ">
        <div className="create-update-modal-head">
          <h2>{warehouseModalData?.id ? "Məhsul yenilə" : "Məhsul yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="create-update-modal-form">
            <CategoryLists
              setSelectedCategoryName={setSelectedCategoryName}
              selectedCategoryName={selectedCategoryName}
              categoryNameDropdown={categoryNameDropdown}
              categoryNameOpen={categoryNameOpen}
              setCategoryNameOpen={setCategoryNameOpen}
              categoryNameAddData={categoryNameAddData}
              categoryList={categoryList}
            />
            {inputArr.map((name, index) => (
              <InputField
                key={index}
                inputName={name}
                warehouseModalData={warehouseModalData}
                updateModalState={updateModalState}
              />
            ))}
          </div>
        </Box>

        {warehouseModalData?.id ? (
          <SubmitBtn
            funcType="update"
            warehouseModalData={warehouseModalData}
            closeModal={closeModal}
            setDeleteModal={setDeleteModal}
          />
        ) : (
          <SubmitBtn
            funcType="create"
            warehouseModalData={warehouseModalData}
            closeModal={closeModal}
            setDeleteModal={setDeleteModal}
          />
        )}
      </div>
    </div>
  );
};
