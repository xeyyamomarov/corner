import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import Loading from "../../../globalComponents/Loading/Loading";
import MenuCard from "./MenuCard";

const MenuData = ({ teacherPageNum, getPageNumber }) => {
  const { loading } = useSelector((state) => state.teachersPagination);
  const { menus } = useSelector((state) => state.menus);

  const tableHead = [
    { id: 1, label: "Məhsulun adı" },
    { id: 2, label: "Kateqoriya" },
    { id: 3, label: "Alış qiyməti" },
    { id: 4, label: "Satış qiyməti" },
    { id: 5, label: "Miqdarı" },
    { id: 7, label: "", type: "more-options-head" },
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
              {menus.map((item, i) => (
                <MenuCard key={i} data={item} mode="desktop" />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet with-more">
            {menus.map((item, i) => (
              <MenuCard key={i} data={item} mode="tablet" />
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

export default MenuData;
