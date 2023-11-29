import React from "react";
import { useSelector } from "react-redux";
import IncomesCard from "./IncomesCard";
import { Pagination } from "antd";
import Loading from "../../../../../globalComponents/Loading/Loading";

const IncomesData = ({ getPageNumber, page, dataHead = [] }) => {
  const { incomes, totalPages } = useSelector((state) => state.incomes);
  const { loading, lastPage: incomesPageNum  } = useSelector((state) => state.incomes);
  const incomesHead = page !== 'finance' ? [
    { id: 1, label: "Kateqoriya" },
    { id: 2, label: "Təyinat" },
    { id: 3, label: "Ölçü vahidi" },
    // { id: 4, label: "Miqdarı" },
    { id: 5, label: "Vahidin qiyməti" },
    { id: 6, label: "Alan şəxs" },
    { id: 7, label: "Məbləği" },
    { id: 8, label: "Tarix" },
    { id: 9, label: "Ödəmə üsulu" },
    { id: 10, label: "İMX nömrə" },
    { id: 11, label: "" },
  ] : [...dataHead];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className="details-table incomes-table">
            <thead>
              <tr>
                {incomesHead.map((head, i) => (
                  <th key={i}>{head.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incomes?.map((income, i) => (
                <IncomesCard
                  key={i}
                  data={income}
                  mode="desktop"
                  cellNumber={i + 1 + (incomesPageNum - 1) * 10}
                  page={page}
                />
              ))}
            </tbody>
          </table>

          <div className="details-list-tablet incomes-page  ">
            {incomes?.map((income, i) => (
              <IncomesCard
                key={i}
                data={income}
                mode="tablet"
                cellNumber={i + 1 + (incomesPageNum - 1) * 10}
                page={page}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pages-pagination">
              <Pagination
                current={incomesPageNum}
                defaultCurrent={1}
                total={totalPages * 10}
                onChange={getPageNumber}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default IncomesData;
