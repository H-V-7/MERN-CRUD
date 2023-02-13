import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios"

const User = () => {


    const [user,setUser] = useState([]);

    const getUser = async() => {
        const {data} = await axios.get("http://localhost:3001/users")
        setUser(data)
    }


    const deleteUser = async(id) =>{
        try{
            await axios.delete(`http://localhost:3001/users/${id}`)
            getUser()
        }catch(error){
            console.log(error)
        }
    }
   
    useEffect(() => {
       getUser()
    },[])
    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {user.map((result,index) => (
               
                    <tr>
                        <td>{index+1}</td>
                        <td>{result.firstName}</td>
                        <td>{result.lastName}</td>
                        <td>{result.email}</td>
                        <td>
                        <Link to={`/update/${result._id}`}><button>EDIT</button></Link>
                        <button onClick={() => deleteUser(result._id)}>DELETE</button>
                        </td>
                    </tr>
               ))}
                </tbody>
            </table>
             
             
                <Link to="/add"><button>Add User</button></Link>

        </>
    )
};

export default User;