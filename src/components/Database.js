import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Database() {
    
    //Create a state - Universal / Main state
  const [users,setUsers]=useState([]);

  //Create multiple state to add new data
  const [newName,setNewName]=useState("");
  const [newAge,setNewAge]=useState("");
  const [newCity,setNewCity]=useState("");

  //Create state to edit
  const[editId, setEditId] = useState("");


  //create useEffect
  useEffect( () => {
    fetch('http://localhost:3001/persons')         //Sends request 
    .then(response=> response.json())              // after sending request we get response, convert raw response into JSON data
    .then(data => setUsers(data))                  // store that JSON in state.  data (the parsed JSON array) is passed into setUsers().setUsers updates the React state variable users with this new array.Since users changes, React re-renders the component, and your <tbody>.
  },[])

  function addUser(){
    const name=newName.trim();     //trim() - pre-defined js function which removes leading/trailing spaces
    const age=newAge;             //Age is stored as integer in your database. So no need to use trim() function, it is used for strings only
    const city=newCity.trim();
   

    //If form fields are filled, send POST request. After success → update local users array + clear form.
    if(name && age && city){
      fetch('http://localhost:3001/persons',
        {
          method : "POST",
          body: JSON.stringify({name,age,city}), //JSON.stringify() is pre-defined js function used to convert Js objects into JSON formatted string
          headers: {"Content-Type":"application/json; charset=utf-8"}
        }
      )
      .then(response=> response.json())
      .then(data => {
        setUsers([...users,data]);        //... -> spread operator. It calls old array values & merges & stores as new array
        alert("User added Successfully!");
        setNewName(""); // clear inputs after fields are filled
        setNewAge("");
        setNewCity("");
      }
      )
    }
  }

  //Fill form values of edit Id
  function startEdit(a){
    setEditId(a.id);
    setNewName(a.name || "");    //If i click edit button, then if it has name then call that name & passd it for editing else if the name is null or undefined then pass as empty string
    setNewAge(a.age || "");
    setNewCity(a.city || "");
  }

  //Update (PUT)
  function updateUser(){
    const name=newName.trim();     
    const age=newAge;            
    const city=newCity.trim();

    if(!editId || !name || !age || !city) //If any one of these fields is not filled then don't do anything
        return;
    //This below part is else part
    fetch(`http://localhost:3001/persons/${editId}`,       //back tick (`) is used here to pass dynamic contents
        {
          method : "PUT",
          body: JSON.stringify({name,age,city}), //JSON.stringify() is pre-defined js function used to convert Js objects into JSON formatted string
          headers: { "Content-Type":"application/json; charset=utf-8" }
        })
        .then(response => response.json())
        .then((data) => {
            setUsers((prev) => prev.map((u) => u.id === editId ? {...u,name,age,city} : u));  //(...u copies old properties, then overwrite with name, age, city).
            alert("User Updated Successfully!");
            cancelEdit();
        }
        )
        .catch(() => alert("Update Failed!"));
  }

  //Function to Cancel edit Mode
  function cancelEdit(){
    setEditId(null)
    setNewName("");
    setNewAge("");
    setNewCity("");
  }

  //Delete Function
  function deleteUser(id){
    if(!window.confirm("Do you want to delete?")) 
      return;    // exit if user cancels
    fetch(`http://localhost:3001/persons/${id}`,
      {
        method : "DELETE"
      })
      .then(() =>{
        setUsers((prev)=> prev.filter((u) => u.id !== id));      //'prev' is for calling setUsers previous values. 'filter() is built-in js funcion that loops through each element of an array and keeps only the ones that match a condition.It returns a new array (does not change the original one).
        alert("User Deleted Successfully!")
      })
      .catch(() => alert("User Delete Failed!"))
  }
  return(
    
    <table className='table'>
      <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
        <th>Action</th>
      </tr>
      </thead>

      <tbody>
        {users.map((a) =>
          <tr key={a.id}>   {/* 'a' is user-defined variable. Here key is a id becoz that is unique*/}
          <td>{a.id}</td>
          <td>{a.name}</td>
          <td>{a.age}</td>
          <td>{a.city}</td>
          <td>
            <Button variant="info" onClick={()=>startEdit(a)}>Edit</Button>   {/*To edit we need entire data so we're passing 'a' */}
            <Button variant="danger" onClick={() => deleteUser(a.id)}>Delete</Button>   {/*To delete we need only id so we're passing 'a.id' */}
          </td>
          </tr>
        )
        }
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td><input type='text' placeholder='Enter Name' value={newName} onChange={(e) => setNewName(e.target.value)}/></td>
          <td><input type='text' placeholder='Enter Age' value={newAge} onChange={(e) => setNewAge(e.target.value)}/></td>
          <td><input type='text' placeholder='Enter City' value={newCity} onChange={(e) => setNewCity(e.target.value)}/></td>
          <td>
            {editId ? (
                <>
                <Button variant="primary" onClick={updateUser}>Update user</Button>
                <Button variant="warning" onClick={cancelEdit}>Cancel</Button>
                </>
                ) : (
                    <Button variant="success" onClick={addUser}>Add User</Button>
                ) 
            }
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Database
