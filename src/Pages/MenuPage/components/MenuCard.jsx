import { deleteMenusAction } from "../../../redux/actions/menusAction";
import { useDispatch } from "react-redux";
import { MENU_M0DAL_ACTION_TYPE } from "../../../redux/actions-type";
import UpdateDeleteModal from "../../../globalComponents/Modals/UpdateDeleteModal/UpdateDeleteModal";

const MenuCard = ({ data, mode }) => {

  const dispatch = useDispatch();

  const updateItem = () => {
    const { category,
      _id,
      product,
      inprice,
      outprice,
      unitAmount } = data;
    dispatch({
      type: MENU_M0DAL_ACTION_TYPE.GET_MENU_MODAL,
      payload: { data: {  category,
        _id,
        product,
        unitAmount,
        inprice,
        outprice }, openModal: true },
    });
  };
  const deleteItem = () => {
    dispatch(deleteMenusAction(data._id));
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
              <div className="table-scroll-text phone">{data.inprice}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.outprice}</div>
              <div className="right-fade"></div>
            </div>
          </td>
          <td>
            <div className="td-con">
              <div className="table-scroll-text phone">{data.unitAmount}</div>
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
                <span className="type">Alış qiyməti:</span>
                <p>{data.inprice}</p>
              </li>
              <li>
                <span className="type">Satış qiyməti:</span>
                <p>{data.outprice}</p>
              </li>
              <li>
                <span className="type">Miqdarı:</span>
                <p>{data.unitAmount}</p>
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

export default MenuCard;
