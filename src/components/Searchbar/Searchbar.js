import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';
import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [searchImgName, setSearchImgName] = useState('');

  const handleNameChange = event => {
    setSearchImgName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchImgName.trim() === '') {
      return alert('Введите, что хотите найти из изображений!');
    }
    //2.И передаю в метод значение из этого файла state=searchImgName -> прокидываем пропс с App 'propName' и передаем ему значение с Searchbar -> searchImgName
    onSubmit(searchImgName);
    //5.Идет очистка формы поля input после ее сабмита
    setSearchImgName('');
  };

  return (
    <>
      <header className={css.searchbar}>
        {/* // 1.при событии Submit формы -> вызываю из App -> handleSubmit -> propName */}
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch
              style={{
                height: '20',
                width: '20',
              }}
            />
          </button>
          <input
            className={css.input}
            type="text"
            name="searchImgName"
            value={searchImgName}
            onChange={handleNameChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
