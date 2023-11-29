import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COURSES_MODAL_ACTION_TYPE,
  SEARCH_VALUES_ACTION_TYPES,
} from "../../../../redux/actions-type";
import {
  createTablesAction,
  updateTableAction,
} from "../../../../redux/actions/tablesAction";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({
  formik,
  tablesModalData,
  funcType,
  closeModal,
}) {
  const dispatch = useDispatch();
  const { coursesModalLoading } = useSelector((state) => state.coursesModal);
  const classCreate = () => {
    if (tablesModalData?._id) {
      dispatch(
        updateTableAction(tablesModalData?._id, tablesModalData)
      );
    } else {
      dispatch({
        type: SEARCH_VALUES_ACTION_TYPES.COURSES_SEARCH_VALUE,
        payload: "",
      });
      dispatch(createTablesAction(tablesModalData));
    }
    // closeModal();
  };
  return (
    <div className="create-update-modal-btn">
      <button
        // disabled={!(formik.isValid && tablesModalData?.name && !coursesModalLoading)}
        onClick={classCreate}
      >
        {coursesModalLoading ? (
          <LoadingBtn />
        ) : funcType === "update" ? (
          "Yenilə"
        ) : (
          "Yarat"
        )}
      </button>
    </div>
  );
}
