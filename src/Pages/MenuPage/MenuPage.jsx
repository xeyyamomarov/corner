import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENU_M0DAL_ACTION_TYPE, WAREHOUSE_M0DAL_ACTION_TYPE } from "../../redux/actions-type";
import { getCoursesPaginationAction } from "../../redux/actions/coursesActions";
import GlobalHead from "../../globalComponents/GlobalHead/GlobalHead";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";
import MenuData from "./components/MenuData";
import { getMenusAction} from "../../redux/actions/menusAction";

const MenuPage = () => {
  const dispatch = useDispatch();
  const { lastPage } = useSelector((state) => state.coursesPagination);
  const { coursesSearchValues } = useSelector((state) => state.searchValues);
  const [coursePageNum, setCoursePageNum] = useState(1);
  const { changeShowNav } = useCustomHook();

  const openModal = () => {
    dispatch({
      type: MENU_M0DAL_ACTION_TYPE.GET_MENU_MODAL,
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


  useEffect(()=>{
    dispatch(getMenusAction())
  },[])

  return (
    <div className="details-page courses ">
      <GlobalHead
        openModal={openModal}
        DATA_SEARCH_VALUE={"COURSES_SEARCH_VALUE"}
        dataSearchValues={coursesSearchValues}
        statusType="courses"
      />
      <MenuData
        coursePageNum={coursePageNum}
        getPageNumber={getPageNumber}
      />
    </div>
  );
};

export default MenuPage;
