import axios from "axios";
import {
  EXPENSES_ACTION_TYPE,
  EXPENSES_MODAL_ACTION_TYPE,
} from "../actions-type";
import { toast } from "react-toastify";
import { logoutAction } from "./auth";
import { apiRoot } from "../../apiRoot";

const API = axios.create({
  baseURL: `${apiRoot}/expense`,
  // withCredentials:true
});

const refreshApi = axios.create({
  baseURL: `${apiRoot}/user/auth/refresh_token`,
  // withCredentials:true
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("auth")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("auth")).AccessToken
    }`;
  }

  return req;
});


const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export const setLoadingExpensesAction = (loadingValue) => ({
  type: EXPENSES_ACTION_TYPE.EXPENSES_LOADING,
  payload: loadingValue,
});

const expensesModalLoading = (loadingValue) => ({
  type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_MODAL_LOADING,
  payload: loadingValue,
});

export const getExpensesPaginationAction =
  (page = 1, startDate, endDate, monthCount, category, sort) =>
  async (dispatch) => {
    dispatch(setLoadingExpensesAction(true));
    // console.log(page, startDate, endDate, monthCount, category, sort);
    try {
      const { data } = await API.get(
        `/?page=${page}&startDate=${startDate || ""}&endDate=${
          endDate || ""
        }&monthCount=${monthCount || ""}&category=${category || ""}&sort=${
          sort || "oldest"
        }`
      );
      // console.log(data,"get")

      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
        payload: page,
      });
      dispatch({
        type: EXPENSES_ACTION_TYPE.GET_EXPENSES_PAGINATION,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshApi.get("/");
          localStorage.setItem(
            "auth",
            JSON.stringify({
              AccessToken: token.data.accesstoken,
            })
          );

          const { data } = await API.get(
            `/?page=${page}&startDate=${startDate || ""}&endDate=${
              endDate || ""
            }&monthCount=${monthCount || ""}&category=${category || ""}&sort=${
              sort || "oldest"
            }`
          );

          dispatch({
            type: EXPENSES_ACTION_TYPE.GET_EXPENSES_LAST_PAGE,
            payload: page,
          });
          dispatch({
            type: EXPENSES_ACTION_TYPE.GET_EXPENSES_PAGINATION,
            payload: data,
          });
        } catch (error) {
          console.log(error);
          if (error?.response?.status === 401) {
            return dispatch(logoutAction());
          }
        }
      }
    } finally {
      dispatch(setLoadingExpensesAction(false));
    }
  };

export const createExpensesAction = (expensesData) => async (dispatch) => {
  dispatch(expensesModalLoading(true));
  try {
    const { data } = await API.post("/", expensesData);
    dispatch(
      getExpensesPaginationAction(data.lastPage, "", "", 1, "", "oldest")
    );

    // console.log(data);
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Yeni məhsul əlavə edildi");
  } catch (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        const { data } = await API.post("/", expensesData);
        console.log(data, "xeeeerc");
        dispatch(
          getExpensesPaginationAction(data.lastPage, "", "", 1, "", "oldest")
        );
        dispatch({
          type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Yeni məhsul əlavə edildi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(expensesModalLoading(false));
  }
};

export const updateExpensesAction = (_id, expensesData) => async (dispatch) => {
  dispatch(expensesModalLoading(true));
  try {
    const { data } = await API.patch(`/${_id}`, expensesData);
    dispatch({ type: EXPENSES_ACTION_TYPE.UPDATE_EXPENSES, payload: data });
    dispatch({
      type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
      payload: false,
    });
    toastSuccess("Məhsul yeniləndi");
  } catch (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );
        const { data } = await API.patch(`/${_id}`, expensesData);
        dispatch({ type: EXPENSES_ACTION_TYPE.UPDATE_EXPENSES, payload: data });
        dispatch({
          type: EXPENSES_MODAL_ACTION_TYPE.EXPENSES_OPEN_MODAL,
          payload: false,
        });
        toastSuccess("Məhsul yeniləndi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  } finally {
    dispatch(expensesModalLoading(false));
  }
};

export const deleteExpensesAction = (_id) => async (dispatch) => {
  try {
    await API.delete(`/${_id}`);
    dispatch({ type: EXPENSES_ACTION_TYPE.DELETE_EXPENSES, payload: _id });
    dispatch(getExpensesPaginationAction(1, "", "", 1, "", "oldest"));
    toastSuccess("Məhsul silindi");
  } catch (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await refreshApi.get("/");
        localStorage.setItem(
          "auth",
          JSON.stringify({
            AccessToken: token.data.accesstoken,
          })
        );

        await API.delete(`/${_id}`);
        dispatch({ type: EXPENSES_ACTION_TYPE.DELETE_EXPENSES, payload: _id });
        dispatch(getExpensesPaginationAction(1, "", "", 1, "", "oldest"));
        toastSuccess("Məhsul silindi");
      } catch (error) {
        console.log(error);
        if (error?.response?.status === 401) {
          return dispatch(logoutAction());
        }
      }
    }
  }
};
