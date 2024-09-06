import { InputHTMLAttributes, useState } from "react";
import { SearchBarContainer } from "./styles";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import useDebounce from "../../utils/useDebounce";

interface searchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange(value: string): void;
}

const SearchBarComponent = ({
  placeholder = "Buscar",
  onValueChange,
  ...props
}: searchBarProps) => {
  const [loading, setLoading] = useState(false);

  const onInput = () => {
    setLoading(true);
  };

  const onChange = (value: string) => {
    const filteredValue = value.replace(/\\/g, "");

    onValueChange(filteredValue);
    setLoading(false);
  };

  return (
    <SearchBarContainer $loading={loading}>
      <AiOutlineSearch className="search-icon" />
      <input
        {...props}
        placeholder={placeholder}
        onInput={onInput}
        onChange={useDebounce(({ target }) => onChange(target?.value), 1000)}
        type="text"
      />
      {loading && <AiOutlineLoading3Quarters className="loading-icon" />}
    </SearchBarContainer>
  );
};

export default SearchBarComponent;
