import { useState } from 'react';


function Gallery() {
    const images = [
      {
        id: 0,
        filepath: '/src/assets/bach-b-minor.jpg',
        caption: 'Bass soloist in a performance of Bach\'s B Minor Mass in New York City.',
        title: "&copy; 2024 Dispensa"
      },
      {
        id: 1,
        filepath: '/src/assets/count-sort.jpg',
        caption: 'An implementation of count sort.',
        title: "&copy; 2024 Dispensa"
      },
      {
        id: 2,
        filepath: '/src/assets/kings-chapel-cambridge.jpg',
        caption: 'The famous ceiling of the King\'s College chapel, Cambridge, U.K.',
        title: "&copy; 2024 Dispensa"
      },
      {
        id: 3,
        filepath: '/src/assets/tete-de-moine-bellelay.jpg',
        caption: 'The Tete de Moine creamery in Bellelay, Switzerland.',
        title: "&copy; 2024 Dispensa"
      },
      {
        id: 4,
        filepath: '/src/assets/weightlifting-clean-and-jerk.jpg',
        caption: 'One of my hobbies, Olympic weightlifting, features the clean and jerk.',
        title: "&copy; 2024 Dispensa"
      }]
    

  return (
    <>
         <h2>Gallery</h2>
         <p>This is a gallery of hobbies, accomplishments, and coding examples.</p>
         <article className='gallery'>
           { images.map((image) => 
              <figure key ={image.id}>
                <img src={image.filepath} alt={image.caption} title={image.title} />
              <figcaption>{image.caption}</figcaption>
              </figure>
            )
            }
        </article>
    </>
  )
}

export default Gallery;
