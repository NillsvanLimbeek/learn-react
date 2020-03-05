import React from "react";

type Props = {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

export const BaseInput = ({ onChange, value }: Props) => {
  return (
    <input type="text" onChange={onChange} name="base-input" value={value} />
  );
};
