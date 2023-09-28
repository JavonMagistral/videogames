import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getGenres } from "../../Redux/actions"
import axios from 'axios';
import { useDispatch } from 'react-redux';





// Función para validar los campos del formulario

const NewVideoGame = () => {

  const dispatch = useDispatch()
  const allGenres = useSelector((state) => state.allGenres)
  const videogames = useSelector((state) => state.videogames);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
            name: '',
            description: '',
            platforms:[],
            image: '',
            released: '',
            rating: '',
            genres: [],
                                   });

  
  useEffect(() => {
    if(allGenres.length===0){
    dispatch(getGenres());
  }
  }, [dispatch, allGenres.length])


  // Errores en el formulario
  const [errors, setErrors] = useState({
    name: true,
    description: true,
    platforms: true,
    image: true,
    released: true,
    rating: true,
    genres: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form);
    console.log(form.released + " " + form.rating);
    console.log(form.genres)
    try{
        const res = await axios.post('http://localhost:3001/videogame', form)
          if (res.status === 201){
            console.log("videojuego creado")
          }
      }
    
      catch(error){
        alert("Error al crear el videojuego", error)
      }

    setForm({
      name: '',
      description: '',
      platforms: "",
      image: '',
      released: '',
      rating: '',
      genres: [],
    });
  }
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
    setErrors(validate({
      ...form, 
      [e.target.name]: e.target.value,
    }))
  }

  const handleGenres = (event, genreName) => {
    const selectedGenres = [...form.genres];
  
    if (event.target.checked) {
      selectedGenres.push(genreName);
    } else {
      const index = selectedGenres.indexOf(genreName);
      if (index !== -1) {
        selectedGenres.splice(index, 1);
      }
    }

    setForm({
      ...form,
      genres: selectedGenres,
    });
    setErrors({
      ...errors,
      genres: selectedGenres.length < 1 ? 'Select at least one genre' : '',
    });
  };
  
  






  const closeAlerts = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };
  const validate = (form) => {
    let errors = {}

    if (!form.name) {
      errors.name = '🎮Insert a valid name🕹️';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(form.name)) {
      errors.name = 'The name must only contain letters, numbers, and spaces';
    }
    
    if (!form.description) {
      errors.description = '🎮Insert a valid description🕹️'
    } else if (form.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    if (!form.platforms) {
      errors.platforms = '🎮Insert valid platforms🕹️'
    }
    if (!form.image) {
      errors.image = 
      !form.image.includes('🎮https://' || 'http://🕹️')
      ? '🎮Insert a valid URL image🕹️' 
      : ''
    }
    if (!form.released) {
      errors.released = '🎮Insert a valid release date🕹️'
    }
    if (!form.rating) {
      errors.rating = '🎮Insert a valid rating🕹️';
    } else if (!/^\d+(\.\d+)?$/.test(form.rating) || parseFloat(form.rating) < 1 || parseFloat(form.rating) > 5) {
      errors.rating = '🕹️The rating must be a number between 1 and 5🕹️';
    }
    if (form.genres.length < 1 || form.genres.length > 10) {
      errors.genres = 'Select at least one genre';
    } else {
      errors.genres = '';
    }
    return errors;
  }
  
  return (


    <div>
        <div >
          {successMessage && (
            <div >
              <p>EXITO!!!</p>
              <img  alt="Descripción de la imagen de éxito" />
              <button onClick={closeAlerts}>Cerrar</button>
            </div>
          )}
          {errorMessage && (
            <div >
              <p>Something has gone wrong!</p>
              <img  alt="Descripción de la imagen de error" />
              <button  onClick={closeAlerts}>Cerrar</button>
            </div>
          )}
        </div>
           

          <div >

            <div >
            <p>CREATE</p>
            <p>VIDEOGAMES</p>
            </div>



            <div >

            <form onSubmit={(e) => handleSubmit(e)}>

              <section>
                <label htmlFor="name" > Name: </label>
                <input 
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  
                />
              </section>
              {
                errors.name && (<p >{errors.name}</p>)
              }
              <section>
                <label htmlFor="description" >Description: </label>
                <input 
                  type="text"
                  name="description"
                  onChange={handleInputChange}
                  value={form.description}
                 
                />
              </section>
              {
                errors.description && (<p >{errors.description}</p>)
              }
              <section>
                <label htmlFor="platforms">Platforms: </label>
                <input 
                  type="text"
                  name="platforms"
                  onChange={handleInputChange}
                  value={form.platforms}
                 
                />
              </section>
              {
                errors.platforms && (<p >{errors.platforms}</p>)
              }
              <section>
                <label htmlFor="image" >Image link: </label>
                <input 
                  type="url"
                  name="image"
                  onChange={handleInputChange}
                  value={form.image}
                
                />
              </section>
              {
                errors.image && (<p >{errors.image}</p>)
              }
              <section>
                <label htmlFor="released" >Released: </label>
                <input 
                  type="date"
                  name="released"
                  onChange={handleInputChange}
                  value={form.released}
                 
                />
              </section>
              {
                errors.released && (<p >{errors.released}</p>)
              }
              <section>
                <label htmlFor="rating">Rating: </label>
                <input 
                  type="number"
                  name="rating"
                  onChange={handleInputChange}
                  value={form.rating}
                
                />
              </section>
              {
                errors.rating && (<p >{errors.rating}</p>)
              }

<section>
                <label >Genres: </label>

                <div >
                  {allGenres?.map((genre) => (
                    <label key={genre.name} >
                      <input
                        type="checkbox"
                        value={genre.name}
                        checked={form.genres.includes(genre.name)}
                        onChange={(e) => handleGenres(e, genre.name)}
                      />
                      <span>{genre.name}</span>
                    </label>
                  ))}
                </div>
              </section>

        {errors.genres && (<p >{errors.genres}</p>)}


        <button type="submit"  disabled={Object.values(errors).some((error) => error)} >Create Videogame</button>
      
      
      </form>

      </div>
      </div>
    </div>
  )
}

export default NewVideoGame;