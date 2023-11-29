import React, { useEffect } from 'react';
import "./notFoundPage.css";
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SHOWNAV_ACTION_TYPE } from '../../redux/actions-type';
import NotFoundPageImg from "../../assets/images/notfound.svg";
import { useCustomHook } from '../../globalComponents/GlobalFunctions/globalFunctions';

const NotFoundPage = ({setNotFound}) => {
  const {user} = useSelector(state=>state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { changeShowNav } = useCustomHook();
  const handleNav=()=>{
    if(user.role==="admin"){
      navigate("/")
    }
    else if (user.role==="super-admin"){
      navigate("/")
    }
    else if (user.role==="teacher"){
      navigate("/teacher-panel")
    }
    else if (user.role==="student"){
      navigate("/student-panel")
    }
  }

  useEffect(() => {
    changeShowNav(false)
    return () => {
      changeShowNav(true)
    };
  }, [dispatch]);
  
  useEffect(()=>{
    setNotFound(true);
    return ()=>{
      setNotFound(false)
    }
  },[setNotFound])

  return (
    <div className='not-found-page'>
      <div className="container">
        <div className="not-found-page-component">
          <img src={NotFoundPageImg} alt="" />
          <p>Oops! Bağışlayın, bu səhifə işləmir. Əsas səhifəyə qayıtmaq üçün bura klikləyin.</p>
          <button onClick={handleNav} className='return-btn' >Ana səhifəyə dön</button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;