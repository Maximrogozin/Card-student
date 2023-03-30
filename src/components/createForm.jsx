import React, { useState, useEffect } from "react";
// import TextField from "./textField";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Form from "./form";

const CreateForm = () => {
  const [data, setData] = useState({
    name: "",
    lastName: "",
    birthYear: undefined,
    url: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const getUserFromLocalStorage = (key) => {
    const saveObj = localStorage.getItem(key);
    return saveObj ? JSON.parse(saveObj) : null;
  };
  const navigate = useNavigate();

  const user = "student";
  useEffect(() => {
    if (getUserFromLocalStorage(user)) setData(getUserFromLocalStorage(user));
  }, []);

  // Валидация yup
  const validateScheme = yup.object().shape({
    url: yup
      .string()
      .url("Введите корректный URL адрес")
      .required("Поле 'Портфолио' обязательно для заполнения"),
    lastName: yup
      .string()
      .required("Поле 'Фамилия' обязательно для заполнения"),
    birthYear: yup
      .number()
      .required("Поле 'Год рождения' обязательно для заполнения")
      .typeError("Год рождения должен быть числом")
      .min(1900, "Год рождения должен быть больше 1900")
      .max(new Date().getFullYear(), "Год рождения не может быть в будущем")
      .max(new Date().getFullYear() - 10, "Вы должны быть старше 10 лет"),
    name: yup.string().required("Поле 'Имя' обязательно для заполнения"),
  });
  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const validate = () => {
    validateScheme
      .validate(data, { abortEarly: false })
      .then(() => setErrors({}))
      .catch((err) => {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    const isValid = validate();
    if (!isValid) return;
  };

  // сохранение в localStorage
  const saveUserInLocalStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };
  const handleSave = () => {
    saveUserInLocalStorage(user, data);
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 p-4 shadow">
          <form onSubmit={handleSubmit}>
            {getUserFromLocalStorage(user) ? (
              <>
                {" "}
                <h1>Редактировать</h1>
                <Form onChange={handleChange} data={data} errors={errors} />
                <button
                  type="Назад"
                  className="btn btn-secondary"
                  onClick={() => navigate(-1)}
                >
                  Назад
                </button>{" "}
                <button
                  type="Создать"
                  disabled={!isValid}
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Обновить
                </button>
              </>
            ) : (
              <>
                <h1>Создать</h1>
                <Form onChange={handleChange} data={data} errors={errors} />

                <button
                  type="Создать"
                  disabled={!isValid}
                  className="btn btn-primary w-100 mx-auto "
                  onClick={handleSave}
                >
                  Создать
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
