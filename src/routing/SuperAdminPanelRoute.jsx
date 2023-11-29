import React from "react";
import { Route } from "react-router";
import FinancePage from "../Pages/FinancePage/FinancePage";
import TablesPage from "../Pages/TablesPage/TablesPage"
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import WarehousePage from "../Pages/WarehousePage/WarehousePage";
import MenuPage from "../Pages/MenuPage/MenuPage";

const SuperAdminPanelRoute = () => {
  return (
    <>
      <Route path="/finance" element={<FinancePage />} />
      <Route path="/finance/expenses" element={<FinancePage />} />
      <Route path="/finance/incomes" element={<FinancePage />} />
      <Route path="/tables" element={<TablesPage/>} />
      <Route path="/category"  element={<CategoryPage/>} />
      <Route path="/warehouse"  element={<WarehousePage/>} />
      <Route path="/menu"  element={<MenuPage/>} />
    </>
  );
};

export default SuperAdminPanelRoute;
