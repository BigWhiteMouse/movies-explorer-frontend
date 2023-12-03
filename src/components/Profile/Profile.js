import React from 'react';

function Profile() {
  return (
    <section className="profile">
      <h1 className="profile__header">Привет, Виталий!</h1>
      <ul className="profile__credentials">
        <li className="profile__credential profile__credential_underlined">
          <p className="profile__label">Имя</p>
          <p className="profile__label profile__label_text">Виталий</p>
        </li>
        <li className="profile__credential">
          <p className="profile__label">E-mail</p>
          <p className="profile__label profile__label_text">pochta@yandex.ru</p>
        </li>
      </ul>
      <div className="profile__buttons">
        <button className="profile__edit">Редактировать</button>
        <button className="profile__signout">Выйти из аккаунта</button>
        <button className="profile__save">Сохранить</button>
      </div>
    </section>
  )
}

export default Profile;

