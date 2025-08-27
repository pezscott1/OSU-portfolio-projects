import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const OperaEdit = ({operaToEdit}) => {

    const redirect = useNavigate();

    const [title, setTitle] = useState(operaToEdit.title);
    const [year, setYear] = useState(operaToEdit.year);
    const [language, setLanguage] = useState(operaToEdit.language);
    const [length, setLength] = useState(operaToEdit.length);

    const editOpera = async () => {
        const response = await fetch(`/operas/${operaToEdit._id}`,
            {
            method: 'PUT',
            body: JSON.stringify({ 
                title: title, 
                year: year, 
                language: language,
                length: length
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert(`You have successfully edited the opera.`);
        } else {
            const errMessage = await response.json();
            alert(`Something went wrong while saving your edit. ${response.status}. ${errMessage.Error}`);
        }
        redirect("/operaPage");
    }

    return (
        <>

        <h2>Edit an opera</h2>
<article>
   <p>You can edit an opera below.</p>
   <table>
      <caption>Edit this opera:</caption>
      <thead>
         <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Language</th>
            <th>Length</th>
         </tr>
      </thead>
      <tbody>
        <tr>
        <td>
    <label htmlFor="title"></label>
    <input type="text" placeholder="Title of the opera" id="title"
           value={title}
           onChange={e => setTitle(e.target.value)} 
    />
</td>
<td>
    <label htmlFor="year"></label>
    <input type="date" placeholder="Date of first performance" id="year"
           value={year}
           onChange={e => setYear(e.target.value)} 
    />
</td>
<td>
    <label htmlFor="language"></label>
    <input type="text" placeholder="Language of the opera" id="language"
           value={language}
           onChange={e => setLanguage(e.target.value)} 
    />
</td>
<td>
    <label htmlFor="length"></label>
    <input type="text" placeholder="Length of the opera" id="length"
           value={length}
           onChange={e => setLength(e.target.value)} 
    />
    </td>
    <td>
        <label htmlFor="submit">
    <button type="submit" id="submit" onClick={editOpera}>Save Edit</button></label>
    </td>
        </tr>
      </tbody>
      </table>
      </article>
      </>
    )
    }

    export default OperaEdit;