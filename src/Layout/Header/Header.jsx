import { useLocation } from "react-router-dom";

import NavbarProfile from "./components/NavbarProfile/NavbarProfile";
import { ReactComponent as MenuMobileIcon } from "../../assets/icons/mobile-menu.svg";
import { useDispatch } from "react-redux";
import { SIDEBAR_ACTION_TYPE } from "../../redux/actions-type";

export const Header = () => {
  const location = useLocation();
  // const [openMenu, setOpenMenu] = useState(true);
  const dispatch = useDispatch();

  // const handleOpenMenu = () => {
  //   setOpenMenu(!openMenu);
  // };

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_ACTION_TYPE.SIDEBAR_OPEN_MODAL, payload: true });
  };

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return "İdarəetmə paneli";
      case "/":
      case "/student":
        return "Davamiyyət";
      case "/courses":
        return "Fənlər";
      case "/teachers":
        return "Müəllimlər";
      case "/students":
        return "Tələbələr";
      case "/admins":
        return "Adminlər";
      case "/table":
        return "Cədvəl";
      case "/expenses":
        return "Xərclər";
      case "/salary":
        return "Əmək haqqı";
      case "/incomes":
        return "Mədaxil ";
      case "/student-panel":
        return "Cədvəl";
      case "/teacher-panel":
        return "Cədvəl";
      case "/teacher-panel/home":
        return "Ana səhifə";
      case "/teacher-panel/salary":
        return "Əmək haqqı";
      case "/stimulations":
        return "Həvəsləndirmə";
      case "/stimulations/fine":
        return "Həvəsləndirmə";
      case "/stimulations/bonus":
        return "Həvəsləndirmə";
      case "/finance":
        return "Maliyyə";
      case "/finance/expenses":
        return "Maliyyə";
      case "/finance/incomes":
        return "Maliyyə";
      case "/feedback":
        return "Rəylər";
      case "/feedback/teacher":
        return "Rəylər";
      case "/feedback/student":
        return "Rəylər";
        {
          /* temporary table */
        }
      case "/temporary-table":
        return "Müvəqqəti cədvəl";
      case "/category":
        return "Kateqoriya";
      case "/tables":
        return "Masalar";
      case "/warehouse":
        return "Anbar";
        case "/menu":
          return "Menyu"
      default:
        return "";
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <>
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="header-content-container">
              <div className="header-context">
                <MenuMobileIcon onClick={openSidebar} />
                <h2>{pageTitle}</h2>
              </div>
              <div className="header-icons">
                <NavbarProfile />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
