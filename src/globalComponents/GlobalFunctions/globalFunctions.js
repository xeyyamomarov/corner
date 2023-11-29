import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE, 
  MAIN_PAGE_TYPE_ACTION_TYPE, 
  TABLE_TYPE_ACTION_TYPE,
  SHOWNAV_ACTION_TYPE,
  MODAL_LESSON_ACTION_TYPE,
  DROPDOWN_ERROR_TYPE
} from "../../redux/actions-type";
import { getFinanceChartAction } from "../../redux/actions/financeAction";
import { getFinanceDataAction } from "../../redux/actions/financeAction";
import moment from "moment";


export function useCustomHook() {
  const dispatch = useDispatch();
  const { financeMonthsFilter, financeChooseDate } = useSelector((state) => state.financeDateFilter);
  const startWeek = new Date();
  startWeek.setDate(startWeek.getDate() - (startWeek.getDay() === 0 ? 7 : startWeek.getDay()) +1);
  startWeek.setHours(0, 0, 0, 0);
  const endWeek = new Date();
  endWeek.setDate(startWeek.getDate() + 6);
  endWeek.setHours(0, 0, 0, 0);
  // endWeek.setHours(23, 59, 59, 999);

  const changeShowNav = (value) => {
    dispatch({ type: SHOWNAV_ACTION_TYPE.SHOW, payload: value });
  }
  const getWeeksBetweenDates = (start, end) => {
    let weeksList = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    let startWeek = new Date(startDate);
    let endWeek = new Date(startDate);

    if (endWeek.getDay() > 0) {
      endWeek.setDate(startDate.getDate() + (7 - startDate.getDay()));
    }

    const lastWeekEndDay = new Date(endDate);

    if (lastWeekEndDay.getDay() > 0) {
      lastWeekEndDay.setDate(
        lastWeekEndDay.getDate() + (7 - lastWeekEndDay.getDay())
      );
    }
    lastWeekEndDay.setDate(lastWeekEndDay.getDate() + 1);

    while (lastWeekEndDay > endWeek) {
      weeksList.push({
        startWeek: startWeek.toString(),
        endWeek: endWeek.toString(),
        allWeekDays: {
          monday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 6)
          ).toString(),
          tuesday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 5)
          ).toString(),
          wednesday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 4)
          ).toString(),
          thursday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 3)
          ).toString(),
          friday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 2)
          ).toString(),
          saturday: new Date(
            new Date(endWeek).setDate(endWeek.getDate() - 1)
          ).toString(),
          sunday: endWeek.toString(),
        },
      });

      if (startWeek.getDay() === 0) {
        startWeek.setDate(startWeek.getDate() + 1);
      } else {
        startWeek.setDate(startWeek.getDate() + (8 - startWeek.getDay()));
      }

      endWeek.setDate(endWeek.getDate() + 7);
    }

    weeksList.at(-1).endWeek = endDate.toString();

    dispatch({
      type: WEEKS_BETWEEN_SELECTED_DATES_ACTION_TYPE.GET_SELECTED_DATES,
      payload: weeksList,
    });
  };
  const changeMainPageType = (type) => {
    dispatch({ type: MAIN_PAGE_TYPE_ACTION_TYPE.GET_MAIN_PAGE_TYPE, payload: type});
  }
  const changeTableType = (type) => {
    dispatch({ type: TABLE_TYPE_ACTION_TYPE.GET_TABLE_TYPE, payload: type});
  }
  const createLessonModal = (data) => {
    dispatch({type:MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON, payload: data} )
  }
  const clearLessonModal = () => {
    dispatch({type:MODAL_LESSON_ACTION_TYPE.SET_MODAL_LESSON, payload: { modalLesson: {}, openModal: false }} )
  }
  const changeDropdownNameErr = (value) => {
    dispatch({type:DROPDOWN_ERROR_TYPE.GET_DROPDOWN_ERROR,payload:value})
  }
  const getFinanceDataAfterCreate = () => {
    if (financeChooseDate?.startDate && financeChooseDate?.endDate) {
      const start = moment(financeChooseDate?.startDate).format("YYYY-MM");
      const end = moment(financeChooseDate?.endDate).format("YYYY-MM");
      dispatch(getFinanceChartAction(start, end, ""));
      dispatch(getFinanceDataAction(start, end, ''));
    } else  if (financeMonthsFilter) {
      dispatch(getFinanceDataAction("", "", financeMonthsFilter))
      if (financeMonthsFilter === 1) {
        dispatch(getFinanceChartAction("", "", 3));
      } else {
        dispatch(getFinanceChartAction("", "", financeMonthsFilter));
      }
    } else {
      dispatch(getFinanceChartAction("", "", 3));
      dispatch(getFinanceDataAction("", "", 1))
    }
  }

  return { 
    startWeek, 
    endWeek,
    changeShowNav,
    getWeeksBetweenDates, 
    changeMainPageType,
    changeTableType,
    createLessonModal,
    clearLessonModal,
    changeDropdownNameErr,
    getFinanceDataAfterCreate
  };
}