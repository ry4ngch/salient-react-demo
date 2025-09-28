import React, { useState, useRef } from "react";

const Dropdown = ({ onChange, placeholder, isSearchable = false, children, className, inputPrefix, expandFull = false, style, ...rest}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const handleBlur = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setActive(false);
      setActiveIndex(null);
      setSearchTerm("");
      document.removeEventListener("click", handleBlur, true);
    }
  };

  const handleChange = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    setActive(false);
    setSearchTerm("");
    if (typeof onChange === "function") {
      onChange(option.props.value);
    }
  };

  const handleOnInput = (event) => {
    const search = event.target.value;
    setSearchTerm(search);

    // Scroll to the matching option
    const option = React.Children.toArray(children).find((item) =>
      item.props.children.toLowerCase().startsWith(search)
    );
    if (!option) return;

    const listItem = listRef.current?.querySelector(`[data-key='${option.props.value}']`);
    if (!listItem) return;

    const listTop = listRef.current.getBoundingClientRect().top;
    const listItemTop = listItem.getBoundingClientRect().top;
    const index = Number(listItem.getAttribute("data-index"));
    const scrollTop = listItemTop - listTop;

    listRef.current.scrollTop += scrollTop;
    setActiveIndex(index);
  };

  const showList = () => {
    setActive(!active);
    if (!active) {
      document.addEventListener("click", handleBlur, true);
    }
  };

  return (
    <div
      className={['dropdown', active ? "active" : "", expandFull ? 'expand-full' : '', className || ''].join(' ').trim()}
      ref={dropdownRef}
      onClick={showList}
      tabIndex={0}
      style={style}
    >
      {isSearchable ? (
        <div className="dropdown__selected">
          {inputPrefix ? inputPrefix : ''}
          <input
            type="text"
            className="dropdown__input"
            value={searchTerm}
            onChange={handleOnInput}
            placeholder={selectedOption?.props.children || placeholder}
            {...rest}
          />
        </div>
      ) : (
        <div className="dropdown__selected">
          {inputPrefix ? inputPrefix : ''}
          {selectedOption?.props.children || placeholder}
        </div>
      )}
      <ul ref={listRef} className="dropdown__list">
        {React.Children.map(children, (item, index) =>
          React.isValidElement(item)
            ? React.cloneElement(item, {
                key: index,
                "data-key": item.props.value,
                "data-index": index,
                className: ["dropdown__list__item", activeIndex === index ? "active" : "", item.props.className || ""].join(" ").trim(),
                onClick: (event) => handleChange(event, item)
              })
            : item
        )}
      </ul>
    </div>
  );
};

const DropdownItem = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>;
};

export default Dropdown;
export { DropdownItem };