import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSES_MODAL_ACTION_TYPE } from "../../redux/actions-type";
import { getCoursesPaginationAction } from "../../redux/actions/coursesActions";
import CategoryData from "./components/CategoryData/CategoryData";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.coursesPagination);
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const [coursePageNum, setCoursePageNum] = useState(1);
  const { changeShowNav } = useCustomHook();

  const openModal = () => {
    dispatch({
      type: COURSES_MODAL_ACTION_TYPE.GET_COURSES_MODAL,
      payload: { data: {}, openModal: true },
    });
  };
  const getPageNumber = (pageNumber) => {
    setCoursePageNum(pageNumber);
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(pageNumber, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(pageNumber, ""));
    }
  };
  const searchData = (e) => {
    e.preventDefault();
    dispatch(getCoursesPaginationAction(1, coursesSearchValues));
    setCoursePageNum(1);
  };

  useEffect(() => {
    if (coursesSearchValues) {
      dispatch(getCoursesPaginationAction(1, coursesSearchValues));
    } else {
      dispatch(getCoursesPaginationAction(1, ""));
    }

    changeShowNav(false);
    return () => {
      changeShowNav(true);
    };
  }, [dispatch]);
  useEffect(() => {
    if (lastPage) {
      setCoursePageNum(lastPage);
    }
  }, [lastPage]);

  return (
    <div className="details-page courses ">
      <GlobalHead
        searchData={searchData}
        openModal={openModal}
        DATA_SEARCH_VALUE={"COURSES_SEARCH_VALUE"}
        dataSearchValues={coursesSearchValues}
        statusType="courses"
      />
      <CategoryData
        coursePageNum={coursePageNum}
        getPageNumber={getPageNumber}
      />
    </div>
  );
};

export default CategoryPage;
