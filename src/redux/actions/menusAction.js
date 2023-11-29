import axios from "axios";
import { MENU_ACTION_TYPE } from "../actions-type";

export const getMenusAction = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3003/menus");
    dispatch({ type: MENU_ACTION_TYPE.GET_MENU, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createMenusAction = (menuData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:3003/menus", menuData);
    dispatch({ type: MENU_ACTION_TYPE.CREATE_MENU, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateMenusAction = (_id, menuData) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `http://localhost:3003/menus/${_id}`,
      menuData
    );
    dispatch({ type: MENU_ACTION_TYPE.UPDATE_MENU, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const deleteMenusAction=(_id)=>async(dispatch)=>{
    try {
        await axios.delete(`http://localhost:3003/menus/${_id}`);
        dispatch({type:MENU_ACTION_TYPE.DELETE_MENU,payload:_id})
    } catch (error) {
        console.log(error)
    }
}