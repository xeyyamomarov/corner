import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import {
  createIncomesAction,
  updateIncomesAction,
} from "../../../../../redux/actions/incomeActions";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";
import { FINANCE_FILTER_ACTION_TYPE } from "../../../../../redux/actions-type";
import { getFinanceDataAction } from "../../../../../redux/actions/financeAction";
import { getFinanceChartAction } from "../../../../../redux/actions/financeAction";
import moment from "moment";
import { useCustomHook } from "../../../../../globalComponents/GlobalFunctions/globalFunctions";

export default function SubmitBtn({
  formik,
  funcType,
  incomesModalData,
  setDeleteModal,
}) {
  const dispatch = useDispatch();
  const { incomesModalLoading } = useSelector((state) => state.incomesModal);
  const { financeMonthsFilter, financeChooseDate } = useSelector(
    (state) => state.financeDateFilter
  );
  const { getFinanceDataAfterCreate } = useCustomHook();

  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });
  const incomesCreate = () => {
    if (incomesModalData?._id) {
      dispatch(updateIncomesAction(incomesModalData?._id, incomesModalData));
    } else {
      dispatch(createIncomesAction({ ...incomesModalData }));
    }
    getFinanceDataAfterCreate();
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (
          Object.keys(formik.errors).length === 0 &&
          incomesModalData?.category
        ) {
          return false;
        } else if (
          Object.keys(formik.errors).length === 1 &&
          formik.errors.password === "Bu xana tələb olunur."
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && incomesModalData?.category) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);

  return (
    <div>
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button disabled={isDisabled || incomesModalLoading} onClick={incomesCreate}>
            {incomesModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>

          <div className="delete-income-modal-btn">
            <DeleteIcon onClick={() => setDeleteModal(true)} />
          </div>
          <button
            className="delete-income-modal-btn-mobile"
            onClick={() => setDeleteModal(true)}
          >
            Sil
          </button>
        </div>
      ) : (
        <div className="create-update-modal-btn">
          <button disabled={isDisabled || incomesModalLoading} onClick={incomesCreate}>
            {incomesModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
