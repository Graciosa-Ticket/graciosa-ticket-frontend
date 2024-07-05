import React, { useState } from "react";
import { DisplayComponent } from "./styles";

interface DisplayProps {
  label: string;
  onSubmit: (value: string) => void;
}

export default function Display({ label }: DisplayProps) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };



  return (
    <DisplayComponent>
      <div className="label">{label}</div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="content"
      />
    </DisplayComponent>
  );
}