import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
  category: yup.string().required("Bu xana tələb olunur."),
  tableNumber: yup
    .number()
    .typeError("Rəqəm olmalıdır.")
    .moreThan(0, "Müsbət ədəd olmalıdır.")
    .required("Bu xana tələb olunur."),
  deposit: yup
    .number()
    .typeError("Rəqəm olmalıdır.")
    .moreThan(0, "Müsbət ədəd olmalıdır.")
    .required("Bu xana tələb olunur."),
  oneMinutePrice: yup
    .number()
    .typeError("Rəqəm olmalıdır.")
    .moreThan(0, "Müsbət ədəd olmalıdır.")
    .required("Bu xana tələb olunur."),
});
