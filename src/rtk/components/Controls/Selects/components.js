import React from 'react';
import {components} from "react-select";
import icoArrow from "./ico-arrow.svg";

export const IndicatorSeparator = () => {
  return false
};

export const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <img src={icoArrow} width={'9'} height={'6'} alt="open list"/>
    </components.DropdownIndicator>
  );
};

export const RemoveIndicators = () => {
  return null;
};
