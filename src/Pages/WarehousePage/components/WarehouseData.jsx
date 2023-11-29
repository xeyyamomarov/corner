import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import TeacherCard from "./TeacherCard";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import { WAREHOUSE_M0DAL_ACTION_TYPE } from "../../../redux/actions-type";
import { getWarehouseAction } from "../../../redux/actions/wareHouseAction";
import WarehouseCard from "./WarehouseCard";

const WarehouseData = ({ teacherPageNum, getPageNumber }) => {
  const dispatch = useDispatch();
  const { teachers, totalPages } = useSelector((state) => state.teachersPagination);
  const { loading } = useSelector((state) => state.teachersPagination);
  const [openMoreModal, setOpenMoreModal] = useState(false);
  const {warehouses} = useSelector(state=>state.warehouses);

  const tableHead = [
    { id: 1, label: "Məhsulun adı" },
    { id: 2, label: "Kateqoriya" },
    { id: 3, label: "Qiyməti" },
    { id: 7, label: "",type:"more-options-head" },
  ];


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table teacher-table">
            <thead>
              <tr>
                {tableHead.map((head, i) => (
                  <th key={i} className={head.type ? head.type : ""}>
                  {head.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
                {warehouses.map((item,i)=>(
                    <WarehouseCard
                    key={i}
                    data={item}
                    mode="desktop"
                    />
                ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
          {warehouses.map((item,i)=>(
                    <WarehouseCard
                    key={i}
                    data={item}
                    mode="tablet"
                    />
                ))}
          </div>

          {/* {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={teacherPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )} */}
        </>
      )}
    </>
  );
};

export default WarehouseData;
