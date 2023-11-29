import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomePaginationAction } from "../../../../redux/actions/incomeActions";
import { getExpensesPaginationAction } from "../../../../redux/actions/expensesAction";
import { EXPENSES_ACTION_TYPE, INCOME_ACTION_TYPE } from "../../../../redux/actions-type";
import IncomesData from "./IncomesData/IncomesData";
import ExpensesData from "./ExpensesData/ExpensesData";

const FinanceData = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    financeMonthsFilter,
    financeChooseDate,
    financeIncomeCategory,
    financeIncomeSorting,
    financeExpenseCategory,
    financeExpenseSorting,
  } = useSelector((state) => state.financeDateFilter);
  const { lastPage: incomesLastPage } = useSelector((state) => state.incomes);
  const { lastPage: expensesLastPage } = useSelector(
    (state) => state.expensesData
  );
  const dataHead = [
    { id: 1, label: "Kateqoriya" },
    { id: 2, label: "Təyinat" },
    { id: 3, label: "Məbləğ" },
    { id: 4, label: "Tarix" },
    { id: 6, label: "" },
  ];

  const getPageNumberIncomes = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getIncomePaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          financeIncomeCategory
            ? financeIncomeCategory !== "all"
              ? financeIncomeCategory
              : ""
            : "",
          financeIncomeSorting ? financeIncomeSorting : "oldest"
        )
      );
    } else {
      dispatch({
        type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getIncomePaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          financeIncomeCategory
            ? financeIncomeCategory !== "all"
              ? financeIncomeCategory
              : ""
            : "",
          financeIncomeSorting ? financeIncomeSorting : "oldest"
        )
      );
    }
  };
  const getDateFilteredIncomes = (pageNumber) => {
    dispatch({
      type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getIncomePaginationAction(
        pageNumber,
        financeChooseDate.startDate,
        financeChooseDate.endDate,
        "", //month
        financeIncomeCategory
          ? financeIncomeCategory !== "all"
            ? financeIncomeCategory
            : ""
          : "",
        financeIncomeSorting ? financeIncomeSorting : "oldest"
      )
    );
  };
  const getMonthFilteredIncomes = (pageNumber) => {
    dispatch({
      type: INCOME_ACTION_TYPE.GET_INCOME_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getIncomePaginationAction(
        pageNumber,
        "",
        "",
        financeMonthsFilter ? financeMonthsFilter : 1, //month
        financeIncomeCategory
          ? financeIncomeCategory !== "all"
            ? financeIncomeCategory
            : ""
          : "",
        financeIncomeSorting ? financeIncomeSorting : "oldest"
      )
    );
  };

  const getPageNumberExpenses = (pageNumber) => {
    if (financeChooseDate.startDate && financeChooseDate.endDate) {
      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getExpensesPaginationAction(
          pageNumber,
          financeChooseDate.startDate,
          financeChooseDate.endDate,
          "", //month
          financeExpenseCategory
            ? financeExpenseCategory !== "all"
              ? financeExpenseCategory
              : ""
            : "",
          financeExpenseSorting ? financeExpenseSorting : "oldest"
        )
      );
    } else {
      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
        payload: pageNumber,
      });
      dispatch(
        getExpensesPaginationAction(
          pageNumber,
          "",
          "",
          financeMonthsFilter ? financeMonthsFilter : 1, //month
          financeExpenseCategory
            ? financeExpenseCategory !== "all"
              ? financeExpenseCategory
              : ""
            : "",
          financeExpenseSorting ? financeExpenseSorting : "oldest"
        )
      );
    }
  };
  const getDateFilteredExpenses = (pageNumber) => {
    dispatch({
      type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getExpensesPaginationAction(
        pageNumber,
        financeChooseDate.startDate,
        financeChooseDate.endDate,
        "", //month
        financeExpenseCategory
          ? financeExpenseCategory !== "all"
            ? financeExpenseCategory
            : ""
          : "",
        financeExpenseSorting ? financeExpenseSorting : "oldest"
      )
    );
  };
  const getMonthFilteredExpenses = (pageNumber) => {
    dispatch({
      type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
      payload: pageNumber,
    });
    dispatch(
      getExpensesPaginationAction(
        pageNumber,
        "",
        "",
        financeMonthsFilter ? financeMonthsFilter : 1, //month
        financeExpenseCategory
          ? financeExpenseCategory !== "all"
            ? financeExpenseCategory
            : ""
          : "",
        financeExpenseSorting ? financeExpenseSorting : "oldest"
      )
    );
  };

  useEffect(() => {
    if (financeChooseDate?.startDate && financeChooseDate?.endDate) {
      getDateFilteredIncomes(incomesLastPage);
      getDateFilteredExpenses(expensesLastPage);
    }
  }, [financeChooseDate]);

  useEffect(() => {
    if (financeMonthsFilter) {
      getMonthFilteredIncomes(incomesLastPage);
      getMonthFilteredExpenses(expensesLastPage);
    }
  }, [financeMonthsFilter]);

  useEffect(() => {
    if(financeIncomeCategory || financeIncomeSorting) {
      getPageNumberIncomes(incomesLastPage);
    }
  }, [financeIncomeCategory, financeIncomeSorting]);

  useEffect(() => {
    if (financeExpenseCategory || financeExpenseSorting) {
      getPageNumberExpenses(expensesLastPage);
    }
  }, [financeExpenseCategory, financeExpenseSorting]);

  useEffect(() => {
    // page,
    // startDate,
    // endDate,
    // monthCount,
    // category

    dispatch(getIncomePaginationAction(1, "", "", 1, "", "oldest"));
    dispatch(getExpensesPaginationAction(1, "", "", 1, "", "oldest"));
  }, []);

  // console.log('months: ', financeMonthsFilter);
  // console.log('date: ', financeChooseDate);

  return (
    <div>
      {location.pathname === "/finance/incomes" ? (
        <IncomesData
          getPageNumber={getPageNumberIncomes}
          page={"finance"}
          dataHead={dataHead}
        />
      ) : (
        <ExpensesData
          // expensesPageNum={expensesPageNum}
          getPageNumber={getPageNumberExpenses}
          page={"finance"}
          dataHead={dataHead}
        />
      )}
    </div>
  );
};

export default FinanceData;
