import axios from "axios";
import { WAREHOUSE_ACTION_TYPE, WAREHOUSE_M0DAL_ACTION_TYPE } from "../actions-type";

export const getWarehouseAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3003/warehouse");
    dispatch({ type: WAREHOUSE_ACTION_TYPE.GET_WAREHOUSE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createWarehouseAction = (warehouseData) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3003/warehouse",
      warehouseData
    );
    dispatch({ type: WAREHOUSE_ACTION_TYPE.CREATE_WAREHOUSE, payload: data });
    dispatch({type:WAREHOUSE_M0DAL_ACTION_TYPE.GET_WAREHOUSE_MODAL,payload:{
      data:{},
      openModal:false
    }})
  } catch (error) {
    console.log(error);
  }
};

export const updateWarehouseAction =
  (id, warehouseData) => async (dispatch) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3003/warehouse/${id}`,
        warehouseData
      );
      dispatch({ type: WAREHOUSE_ACTION_TYPE.UPDATE_WAREHOUSE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteWarehouseAction = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3003/warehouse/${id}`);
    dispatch({ type: WAREHOUSE_ACTION_TYPE.DELETE_WAREHOUSE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
