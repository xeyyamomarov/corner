import { useDispatch } from "react-redux";
import { WAREHOUSE_M0DAL_ACTION_TYPE } from "../../../redux/actions-type";
import { deleteWarehouseAction } from "../../../redux/actions/wareHouseAction";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const WarehouseCard = ({ data, mode }) => {
  const dispatch = useDispatch()


  const updateItem = () => {
    const { 
      category,
      id,
      product,
      amount } = data;
    dispatch({
      type: WAREHOUSE_M0DAL_ACTION_TYPE.GET_WAREHOUSE_MODAL,
      payload: { data: {  category,
        id,
        product,
        amount }, openModal: true },
    });
  };
  const deleteItem = () => {
    dispatch(deleteWarehouseAction(data._id));
  };

  
  return (
    <>
      {mode === "desktop" ? (
        <tr>
          <td>
            <div className="td-con">
              {/* <div className="cell-number">{cellNumber}.</div> */}
              <div className="table-scroll-text">{data.product}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text">{data.category}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.amount}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td className="more-options" >
          <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </td>
        </tr>
      ) : (
        <div className="content-box">
          <div className="left">
            <ul>
              <li>
                <span className="type">Məhsulun adı:</span>
                <p>{data.product ? data.product : "boş"}</p>
              </li>
              <li>
                <span className="type">Kateqoriya:</span>
                <p>{data.category ? data.category : "boş"}</p>
              </li>
              <li>
                <span className="type">Miqdarı:</span>
                <p>{data.amount}</p>
              </li>
            </ul>
          </div>

          <div className="right">
          <UpdateDeleteModal
              updateItem={updateItem}
              deleteItem={deleteItem}
              data={data}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WarehouseCard;
