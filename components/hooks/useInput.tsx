import { useState, FormEvent } from "react";

const useInput = (initValue: string, validator: (value: string) => boolean) => {
  const [value, setValue] = useState(initValue);

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    let isUpdate = true;

    isUpdate = validator(value);

    if (isUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};
export default useInput;
