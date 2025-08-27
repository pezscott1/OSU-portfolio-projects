import Opera from './Opera.jsx';


function OperaList({operas, onDelete, onEdit}) {

    return (

<table id="operas">
  <caption>Add and Edit Operas</caption>
  <thead>
     <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Language</th>
        <th>Length (in minutes)</th>
        <th>Delete</th>
        <th>Edit</th>
     </tr>
  </thead>
<tbody>
{operas.map((opera, i) => 
     <Opera 
        opera={opera} 
        key={i} 
        onDelete={onDelete}
        onEdit={onEdit}
    />)}
</tbody>
</table>

)}

export default OperaList;