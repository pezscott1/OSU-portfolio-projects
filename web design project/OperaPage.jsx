import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import OperaList from './OperaList.jsx';
import { Link } from 'react-router-dom';


function OperaPage ({setOpera}){
    const redirect = useNavigate();

    const [operas, setOperas] = useState([]);

    const loadOperas = async () => {
        const response = await fetch('/operas');
        const operas = await response.json();
        setOperas(operas)
    }

    const onEditOpera = async opera => {
        setOpera(opera);
        redirect('/update');
    }

    const onDeleteOpera = async _id => {
        const response = await fetch(`/operas/${_id}`, { method: 'DELETE' });
     if (response.status === 200) {
        const getResponse = await fetch('/operas');
        const operas = await getResponse.json();
        setOperas(operas);
   } else {
        console.error(`You did not successfully delete, please check the id and try again. = ${_id}, status code = 
        ${response.status}`)
     }
    }
    useEffect(() => {
        loadOperas();
     }, []);

     return (
     <>
     <h2>List of Operas and their premiere dates at the Metropolitan Opera in New York</h2>
        <article>
            <p>Please add, delete, or edit, as appropriate.</p>
        
            <Link to="/create">Add an opera</Link>
        
            <OperaList
                operas={operas}
                onEdit={onEditOpera}
                onDelete={onDeleteOpera}
            />
        </article>
        </>
        );
}

export default OperaPage;