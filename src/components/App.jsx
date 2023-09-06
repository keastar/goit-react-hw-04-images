import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './imageGallery/ImageGallery';
import Container from './Container';
import fetchImages from 'api/api';
import Loading from './ImageGalleryItem/Loading';
import ErrorView from './ImageGalleryItem/ErrorView';
import Modal from './Modal/Modal';
import Button from './Button/Button';

export default function App() {
  const [images, setImages] = useState([]);
  const [searchImgName, setSearchImgName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');

  // аналог ComponentDidUpdate - срабатывает фетч getImgs
  // каждый раз при изменении запроса в поле поиска

  useEffect(() => {
    if (!searchImgName) return;

    getImgs();
    // eslint-disable-next-line
  }, [searchImgName]);

  //принимаю с формы запрос и пишу в стейт, сбрасывается после отправки стейтa из inputa
  const handleFormSubmit = searchImgName => {
    setSearchImgName(searchImgName);
    setImages([]);
    setCurrentPage(1);
    setError(null);
  };

  //получаю данные с сервера и обновляю массив картинок
  const getImgs = () => {
    setIsLoading(true);

    fetchImages(searchImgName, currentPage)
      .then(({ hits, totalHits }) => {
        setImages(prevImages => [...prevImages, ...hits]);
        setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
        setTotal(totalHits);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const openModal = (largeImageURL, tags) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTags('');
  };

  const totalPage = total / images.length;

  return (
    <Container>
      {showModal && (
        <Modal onClose={closeModal} largeImageURL={largeImageURL} tags={tags} />
      )}
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <ErrorView message={error.message} />}
      {images.length > 0 && (
        <ImageGallery images={images} onOpenModal={openModal} />
      )}
      {isLoading && <Loading />}
      {totalPage > 1 && !isLoading && images.length > 0 && (
        <Button onClick={getImgs} />
      )}
    </Container>
  );
}
