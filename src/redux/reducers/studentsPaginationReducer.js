import { STUDENTS_ALL_ACTIONS_TYPE } from "../actions-type";

const initialState = {
  students: [],
  studentsByCourse: [],
  allStudentsByCourse: [],
  totalPages: 1,
  lastPage: "",
  loading: false,
};

export const StudentsPaginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT:
      // console.log(1)
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_BY_COURSE:
      return {
        ...state,
        // studentsByCourse: [...state.studentsByCourse, ...action.payload],
        // allStudentsByCourse: [...state.allStudentsByCourse, ...action.payload],
        studentsByCourse: action.payload?.students,
        // loading: false,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_MORE_STUDENT_BY_COURSE:
      return {
        ...state,
        studentsByCourse: [...state.studentsByCourse, ...action.payload?.students],
        // loading: false,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.STUDENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_PAGINATION:
      return {
        ...state,
        ...action.payload,
      };
    case STUDENTS_ALL_ACTIONS_TYPE.CREATE_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case STUDENTS_ALL_ACTIONS_TYPE.UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };
    case STUDENTS_ALL_ACTIONS_TYPE.DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };
    case STUDENTS_ALL_ACTIONS_TYPE.GET_STUDENT_LAST_PAGE:
      return {
        // ...state,
        lastPage: action.payload,
      };
    default:
      return state;
  }
};
