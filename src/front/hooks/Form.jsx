import { useState } from "react";

export const Form = (initialForm) => {
  const [input, setInput] = useState(initialForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const clearForm = () => setInput(initialForm);

  return [input, handleInputChange, clearForm, setInput];
};