import { useContext, useState } from "react";
import React from 'react'
import "./styles.css"
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/auth";

const Dropdown = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const {logoff} = useContext(AuthContext)

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="dropdown">
          <div className="dropdown-content">
            <ul className="dropdown-ul">
                {children}
            </ul>
          </div>
      </div>
    );
}

export {Dropdown}
