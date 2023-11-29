import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import {
  DROPDOWN_NAME_ACTION_TYPE,
  MENU_M0DAL_ACTION_TYPE,
} from "../../../redux/actions-type";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./components/InputField"
import SubmitBtn from "./components/SubmitBtn";
import CategoryLists from "./components/CategoryList";

export const MenuModal = () => {
  const dispatch = useDispatch();
  const {menusModalData} = useSelector(state=>state.menuModal)
  const { courses } = useSelector((state) => state.coursesPagination);
  const categoryList = courses?.filter((category) => category?.name);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [categoryNameOpen, setCategoryNameOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [classIcon, setClassIcon] = useState(false);
  const inputArr = ["product", "inprice","outprice","unitAmount"];


  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };
  const categoryNameDropdown = () => {
    setCategoryNameOpen(!categoryNameOpen);
    setClassIcon(false);
  };
  const categoryNameAddData = (item) => {
    updateModalState("category", item._id);
    dispatch({ type: DROPDOWN_NAME_ACTION_TYPE.GET_DROPDOWN, payload: item });
    setCategoryNameOpen(false);
    setSelectedCategoryName(item);
  };

  const updateModalState = (keyName, value) => {
    dispatch({
      type: MENU_M0DAL_ACTION_TYPE.GET_MENU_MODAL,
      payload: {
        data: {
          ...menusModalData,
          category: selectedCategoryName?.name,
          [keyName]: value,
        },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: MENU_M0DAL_ACTION_TYPE.GET_MENU_MODAL,
      payload: { data: {}, openModal: false },
    });
  };


  useEffect(() => {
    if (menusModalData?._id && courses) {
      if (menusModalData.category) {
        setSelectedCategoryName(
          courses.filter((item) => item._id === menusModalData.category)[0]
        );
      }
    }
  }, [courses]);

  return (
    <div className="create-update-modal-con bonus-modal">
      <div className="create-update-modal ">
        <div className="create-update-modal-head">
          <h2>{menusModalData?._id ? "Menyu yenilə" : "Menyu yaradın"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            maxW_idth: "100%",
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
                menusModalData={menusModalData}
                updateModalState={updateModalState}
              />
            ))}
          </div>
        </Box>

        {menusModalData?._id ? (
          <SubmitBtn
            funcType="update"
            menusModalData={menusModalData}
            closeModal={closeModal}
            setDeleteModal={setDeleteModal}
          />
        ) : (
          <SubmitBtn
            funcType="create"
            menusModalData={menusModalData}
            closeModal={closeModal}
            setDeleteModal={setDeleteModal}
          />
        )}
      </div>
      {/* {deleteModal && (
        <DeleteBonusModal type="bonus" menusModalData={menusModalData} deleteMod={handleDeleteModal} />
      )} */}
    </div>
  );
};
