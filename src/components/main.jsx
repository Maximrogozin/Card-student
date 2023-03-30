/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Main = () => {
  const user = "student";
  const [data, setData] = useState({});

  const getUserFromLocalStorage = (key) => {
    const saveObj = localStorage.getItem(key);
    return saveObj ? JSON.parse(saveObj) : null;
  };
  useEffect(() => {
    setData(getUserFromLocalStorage(user));
  }, []);

  const createYear = (item) => {
    const date = new Date();
    const year = date.getFullYear() - item;
    let text;
    if (year.toString().slice(-1) == 1) {
      text = `(${year} год)`;
    } else if (year.toString().slice(-1) > 1 && year.toString().slice(-1) < 5) {
      text = `(${year} года)`;
    } else if (
      year.toString().slice(-1) > 4 ||
      year.toString().slice(-1) == 0
    ) {
      text = `(${year} лет)`;
    }
    return text;
  };

  return (
    <div className="container mt-4">
      <div>
        <h1>Карточка студента</h1>
        <div>
          {data ? (
            <div className="container">
              <div>
                <b>Имя: </b>
                {data.name}
              </div>
              <div>
                <b>Фамилия: </b>
                {data.lastName}
              </div>
              <div>
                <b>Год рождения: </b>
                {`${data.birthYear}  ${createYear(data.birthYear)}`}
              </div>
              <div>
                <b>Портфолио: </b>
                <a href="{data.url}">{data.url}</a>
              </div>
              <Link to="createForm">
                <button className="btn btn-primary mt-3">Редактировать</button>
              </Link>
            </div>
          ) : (
            <div>
              <div>Нет данных</div>
              <Link to="createForm">
                <button className="btn btn-primary mt-3">Добавить</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
