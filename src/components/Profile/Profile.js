import React from 'react';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile({onSignOut, onClick}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isActive, setActive] = React.useState(false);

  function handleSignOut() {
    onSignOut()
  }

  function handleChange(e) {
    e.preventDefault();
    if (e.target.name === 'name') {
      setName(e.target.value);
      setEmail(currentUser.email);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
      setName(currentUser.name);
    }
    if (e.target.value !== currentUser.name && e.target.value !== currentUser.email) setActive(true);
    else setActive(false);
  }

  function handleClick() {
    if (!isActive) return;
    onClick(name, email);
  }

  return (
    <section className="profile">
      <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
      <ul className="profile__credentials">
        <li className="profile__credential profile__credential_underlined">
          <p className="profile__label">Имя</p>
          <input type='text' name='name' defaultValue={currentUser.name} onChange={handleChange}
                 className="profile__label profile__label_text"/>
        </li>
        <li className="profile__credential">
          <p className="profile__label">E-mail</p>
          <input type='text' name='email' defaultValue={currentUser.email} onChange={handleChange}
                 className="profile__label profile__label_text"/>
        </li>
      </ul>
      <div className="profile__buttons">
        <button className={isActive ? 'profile__edit profile__edit_active' : 'profile__edit'} onClick={handleClick}>
          Редактировать</button>
        <button className="profile__signout" onClick={handleSignOut}>Выйти из аккаунта</button>
        <button className="profile__save">Сохранить</button>
      </div>
    </section>
  )
}

export default Profile;

