import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TablesCard from "./TablesCard";
import { Pagination } from "antd";
import Loading from "../../../../globalComponents/Loading/Loading";
import { TABLES_M0DAL_ACTION_TYPE } from "../../../../redux/actions-type";

const TablesData = ({ coursePageNum, getPageNumber }) => {
  const { courses, totalPages } = useSelector(
    (state) => state.coursesPagination
  );
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.coursesPagination);
  const tableHead = [
    { id: 1, label: "Masa nömrəsi" },
    { id: 2, label: "Kateqoriya" },
    { id: 4, label: "Depozit" },
    { id: 5, label: "Dəqiqə başına qiymət" },
    { id: 3, label: "", type: "more-options-head" },
  ];

  const { tables } = useSelector((state) => state.tables);

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
              {tables?.map((table, i) => (
                <TablesCard
                  key={i}
                  data={table}
                  mode="desktop"
                  // cellNumber={i + 1 + (teacherPageNum - 1) * 10}
                  // setOpenMoreModal={setOpenMoreModal}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet course-list-mobile">
            <h3 className="details-list-title">Masa nömrəsi</h3>
            {tables.map((table, i) => (
              <TablesCard
                key={i}
                data={table}
                mode="mobile"
                // cellNumber={i + 1 + (coursePageNum - 1) * 10}
              />
            ))}
          </div>
          {/* {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={coursePageNum}
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

export default TablesData;
