import { useDispatch, useSelector } from "react-redux";
import {
  createWarehouseAction,
  updateWarehouseAction,
} from "../../../../redux/actions/wareHouseAction";
import LoadingBtn from "../../../Loading/components/LoadingBtn/LoadingBtn";

export default function SubmitBtn({
  formik,
  warehouseModalData,
  funcType,
}) {
  const dispatch = useDispatch();
  const { warehouseModalLoading } = useSelector((state) => state.warehouseModal);
  const classCreate = () => {
    if (warehouseModalData?._id) {
      dispatch(
        updateWarehouseAction(warehouseModalData?._id, warehouseModalData)
      );
    } else {
      dispatch(createWarehouseAction(warehouseModalData));
    }
    // closeModal();
  };
  return (
    <div className="create-update-modal-btn">
      <button
        // disabled={!(formik.isValid && warehouseModalData?.name && !warehouseModalLoading)}
        onClick={classCreate}
      >
        {warehouseModalLoading ? (
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
