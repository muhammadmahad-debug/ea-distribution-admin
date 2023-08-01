// import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import SelectComponent, {
  ActionMeta,
  GroupBase,
  OptionProps,
  OptionsOrGroups,
  StylesConfig,
} from "react-select";

const RSelect = ({
  options,
  placeholder,
  size,
  value,
  defaultValue,
  name,
  id,
  error,
  onBlur,
  isClearable,
  type,
  touched,
  className,
  style,
  disabled = false,
  components = undefined,
  onMenuOpen,
  onMenuClose,
  ...rest
}) => {
  let sizeCls = "";
  switch (size) {
    case "large":
      sizeCls = "lg";
      break;
    case "small":
      sizeCls = "sm";
      break;
    case "x-small":
      sizeCls = "xs";
      break;
    default:
      break;
  }

  return (
    <div>
      <SelectComponent
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        className="react-select-container"
        name={name}
        isClearable={isClearable}
        id={id}
        components={components}
        isDisabled={disabled}
        classNamePrefix="react-select"
        menuPlacement="auto"
        openMenuOnFocus={true}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        options={options}
        {...rest}
      />
      { touched && error && (
        <>
          <div className="error-message text-xs text-red-600 pt-3">
            {/* <FontAwesomeIcon
              style={{ marginRight: 3 }}
              icon={faExclamationCircle}
            /> */}
            {error}
          </div>
        </>
      )}
    </div>
  );
};
export default RSelect;
