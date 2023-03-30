import React from "react";
import TextField from "./textField";

const Form = ({ data, onChange, errors }) => {
  return (
    <>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextField
        label="Фамилия"
        name="lastName"
        value={data.lastName}
        onChange={onChange}
        error={errors.lastName}
      />
      <TextField
        label="Год рождения"
        name="birthYear"
        value={data.birthYear}
        onChange={onChange}
        error={errors.birthYear}
      />
      <TextField
        label="Портфолио"
        name="url"
        value={data.url}
        onChange={onChange}
        error={errors.url}
      />{" "}
    </>
  );
};

export default Form;
