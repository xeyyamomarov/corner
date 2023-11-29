import { TABLES_ACTION_TYPE, TABLES_M0DAL_ACTION_TYPE } from "../actions-type";
import axios from "axios";

const tablesModalOpen = (value) => ({
  type: TABLES_M0DAL_ACTION_TYPE.TABLES_OPEN_MODAL,
  payload: value,
});

export const getTablesAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3003/tables");
    dispatch({ type: TABLES_ACTION_TYPE.GET_TABLES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createTablesAction = (tablesData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3003/tables",
      tablesData
    );
    console.log(data, "create");
    // dispatch({ type: TABLES_ACTION_TYPE.CREATE_TABLES, payload: data });
    dispatch(tablesModalOpen(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateTableAction = (id, tablesData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:3003/tables/${id}`,
      tablesData
    );
    dispatch({ type: TABLES_ACTION_TYPE.UPDATE_TABLES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTablesAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3003/tables/${id}`);
    dispatch({ type: TABLES_ACTION_TYPE.DELETE_TABLES, payload: id });
  } catch (error) {
    console.log(error);
  }
};
