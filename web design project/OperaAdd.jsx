import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const OperaAdd = () => {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [language, setLanguage] = useState('');
    const [length, setLength] = useState('');
    const redirect = useNavigate();

    const addOpera = async (event) => {
        event.preventDefault();

        const newOpera = {title, year, language, length};

            const response = await fetch('/operas', {
               method: 'post',
               body: JSON.stringify(newOpera),
               headers: {
                   'Content-Type': 'application/json',
               },
            });
            if(response.status === 201){
               alert(`You've successfully added an opera.`);
               redirect("/operaPage");
  } else {
          alert(`Opera was not successfully added, please try again. = ${response.status}`);

  } 
}

 return (
    <>
    <h2>Add an opera:</h2>
    <article>
   <p>You can add an opera below. If you don't know the language or year, don't add it!</p>
   <form id="" onSubmit={addOpera} >
   <table>
      <caption>Which movie are you adding?</caption>
      <thead>
         <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Language</th>
         </tr>
      </thead>
      <tbody>
        <tr>
        <td>
    <label htmlFor="title"></label>
    <input type="text" placeholder="Title of the opera" id="title"
           value={title}
           required
           onChange={e => setTitle(e.target.value)} 
    />
        </td>
        <td>
    <label htmlFor="year"></label>
    <input type="date" placeholder="Date of first performance" id="year"
           value={year}
           required
           onChange={e => setYear(e.target.value)} 
    />
        </td>
        <td>
    <label htmlFor="language"></label>
    <input type="text" placeholder="Language of the opera" id="language"
           value={language}
           required
           onChange={e => setLanguage(e.target.value)} 
    />
        </td>
        <td>
    <label htmlFor="length"></label>
    <input type="text" placeholder="Length of the opera" id="length"
           value={length}
           required
           onChange={e => setLength(e.target.value)} 
    />
        </td>
        <td>
    <label htmlFor='submit'>Commit</label>
    <button
        type='submit'
        onClick={addOpera}
        id='submit'
        >Add</button>
        </td>
        </tr>
      </tbody>
    </table>
    </form>
    </article>
    </>
 )
}

export default OperaAdd;