import { useSelector, useDispatch } from "react-redux";
import {  TABLES_M0DAL_ACTION_TYPE } from "../../../../redux/actions-type";
import {deleteTablesAction} from "../../../../redux/actions/tablesAction"
import UpdateDeleteModal from "../../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const TablesCard = ({ data, mode }) => {
  const dispatch = useDispatch();

  const updateItem = () => {
    const { category,
      deposit,
      oneMinutePrice,
      tableNumber,
      _id } = data;
    dispatch({
      type: TABLES_M0DAL_ACTION_TYPE.GET_TABLES_MODAL,
      payload: { data: {  category,
        deposit,
        oneMinutePrice,
        tableNumber,
        _id }, openModal: true },
    });
  };
  const deleteItem = () => {
    dispatch(deleteTablesAction(data._id));
  };

  return (
    <>
      {mode === "desktop" ? (
        <tr>
        <td>
          <div className="td-con">
            {/* <div className="cell-number">{cellNumber}.</div> */}
            <div className="table-scroll-text">{data.tableNumber}</div>
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
            <div className="table-scroll-text phone">{data.deposit}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td>
          <div className="td-con">
            <div className="table-scroll-text phone">{data.oneMinutePrice}</div>
            <div className="right-fade"></div>
          </div>
        </td>
        <td className="more-options">
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
              <h3 className="name">{data.tableNumber}</h3>
              <ul>
            <li>
              <span className="type">Kateqoriya:</span>
              <p>{data.category ? data.category : "boş"}</p>
           </li>
            <li>
              <span className="type">Depozit:</span>
              <p>{data.deposit ? data.deposit : "boş"}</p>
             </li>
             <li>
              <span className="type">Dəqiqə başına qiymət:</span>
              <p>{data.oneMinutePrice}</p>
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

export default TablesCard;
