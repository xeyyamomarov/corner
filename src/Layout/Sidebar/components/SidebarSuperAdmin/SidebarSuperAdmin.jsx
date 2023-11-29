import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as TableIcon } from "../../../../assets/icons/tableIcon.svg";
import { ReactComponent as ExpensesIcon } from "../../../../assets/icons/expensenIcon.svg";
import { ReactComponent as CategoryIcon } from "../../../../assets/icons/sidebar/category-2-svgrepo-com.svg";
import {ReactComponent as WarehouseIcon} from "../../../../assets/icons/sidebar/warehouse-svgrepo-com.svg"
import {ReactComponent as MenuIcon } from "../../../../assets/icons/sidebar/food-bag-svgrepo-com.svg"

const SidebarSuperAdmin = ({ closeSidebar }) => {
  const location = useLocation();

  const financeNav = ["/finance/incomes", "/finance/expenses"];

  const isFinanceRoute = (route) => {
    return financeNav.includes(route);
  };

  return (
    <ul className="sidebar-nav-list">
      <li>
        <NavLink to="/tables" onClick={closeSidebar}>
          <TableIcon />
          Masalar
        </NavLink>
      </li>
      <li>
        <NavLink to="/menu" onClick={closeSidebar}>
          <MenuIcon />
          Menyu
        </NavLink>
      </li>
      <li>
        <NavLink to="/category" onClick={closeSidebar}>
          <CategoryIcon />
          Kateqoriya
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/finance/incomes"
          onClick={closeSidebar}
          className={isFinanceRoute(location.pathname) ? "active" : ""}
        >
          <ExpensesIcon />
          Maliyyə
        </NavLink>
      </li>
      <li>
        <NavLink to="/warehouse" onClick={closeSidebar}>
          <WarehouseIcon/>
          Anbar
        </NavLink>
      </li>
      <li>
        <NavLink to="/checks" onClick={closeSidebar}>
          Çeklər
        </NavLink>
      </li>
    </ul>
  );
};

export default SidebarSuperAdmin;
