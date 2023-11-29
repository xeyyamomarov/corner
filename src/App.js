import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routing } from "./routing";
import { ExpensesModal } from "./globalComponents/Modals/ExpensesModal/ExpensesModal";
import { IncomesModal } from "./globalComponents/Modals/IncomesModal/IncomesModal";
import { CategoryModal } from "./globalComponents/Modals/CategoryModal/CategoryModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WarehouseModal } from "./globalComponents/Modals/WarehouseModal/WarehouseModal";
import { MenuModal } from "./globalComponents/Modals/MenuModal/MenuModal";
import {TablesModal} from "./globalComponents/Modals/TablesModal/TablesModal"

function App() {
  const { expensesOpenModal } = useSelector((state) => state.expensesModal);
  const { incomesOpenModal } = useSelector((state) => state.incomesModal);
  const { coursesOpenModal } = useSelector((state) => state.coursesModal);
  const { warehouseOpenModal } = useSelector((state) => state.warehouseModal);
  const { menuOpenModal } = useSelector((state) => state.menuModal);
  const {tablesOpenModal} = useSelector(state=>state.tablesModal)


  console.log(tablesOpenModal)

  useEffect(() => {
    if (expensesOpenModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [expensesOpenModal]);

  useEffect(() => {
    if (incomesOpenModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [incomesOpenModal]);

  useEffect(() => {
    if (tablesOpenModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [tablesOpenModal]);

  return (
    <div className="App">
      <Routing />
      {expensesOpenModal && <ExpensesModal />}
      {incomesOpenModal && <IncomesModal />}
      {coursesOpenModal && <CategoryModal />}
      {warehouseOpenModal && <WarehouseModal />}
      {menuOpenModal && <MenuModal />}
      {tablesOpenModal && <TablesModal/>}
      <ToastContainer />
    </div>
  );
}

export default App;
