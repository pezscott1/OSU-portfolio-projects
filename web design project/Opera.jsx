import React from "react";
import {MdDeleteForever, MdEdit} from 'react-icons/md';


function Opera({ opera, onEdit, onDelete}) {
    return (
        <tr>
            <td>{opera.title}</td>
            <td>{new Date(opera.year).toLocaleDateString().slice(0,10)}</td>
            <td>{opera.language}</td>
            <td>{opera.length}</td>
            <td><MdDeleteForever onClick={() => onDelete(opera._id)}/></td>
            <td><MdEdit onClick={() => onEdit(opera)}/></td>
        </tr>
    );
}

export default Opera;