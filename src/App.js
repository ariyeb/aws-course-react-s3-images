import { useEffect, useState } from 'react';
import './App.css';
import { deleteImage, getIamgesData, uploadImage } from './server/images';

function App() {
  // const URL = "https://ariyeb-photos-storage.s3-eu-west-1.amazonaws.com/";
  const URL = "http://Imagesserver-env.eba-swn3ughs.eu-west-1.elasticbeanstalk.com/get-image";
  const [images, setImages] = useState([]);

  useEffect(() => {
    getIamgesData()
      .then(newImages => {
        console.log(newImages);
        setImages(newImages);
      });
  }, []);

  const onSubmitForm = (event) => {
    event.preventDefault();
    const image = event.target.children[0].files[0];
    const formData = new FormData();
    formData.append("image", image);

    uploadImage(formData)
      .then(res => {
        console.log(res);
        return getIamgesData();
      })
      .then(newImages => {
        setImages(newImages);
      });
  };

  const onClickDelete = (id, key) => {
    deleteImage(id, key)
      .then(() => {
        alert("Image deleted");
        return getIamgesData();
      })
      .then(newImages => {
        setImages(newImages);
      });
  };


  return (
    <div>
      <h1>Image App</h1>
      <form onSubmit={ onSubmitForm }>
        <input type="file" name="image" />
        <button type="submit">Submit</button>
      </form>
      {
        images.map(image => (
          <div key={ image._id }>
            <h3>{ image.originalName }</h3>
            <img
              src={ URL + `?key=${image.key}&name=${image.originalName}` }
              alt={ image.originalName }
            />
            <button onClick={ () => onClickDelete(image._id, image.key) }>
              Delete { image.originalName }
            </button>
            <hr />
          </div>
        ))
      }
    </div>
  );
}

export default App;
