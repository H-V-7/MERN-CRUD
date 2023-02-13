import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const CreateUser = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({firstName:"", lastName:"", email:""});

    const handleChange = (event) => {
        setFormData((prevData) => {
            return{
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/add",formData)
            navigate("/")
        }catch(error){
            console.log(error)
        }
        
    }


    return(
        <>
            <form style={{display:"flex",gap:10, flexDirection:"column", margin:"auto", width:500}}>
                <h1>Add User</h1>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={handleChange}/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" onChange={handleChange}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange}/>
                <input type="submit" value="Create User" onClick={handleSubmit}/>
            </form>
            <Link to="/"><button>GO BACK TO HOME PAGE</button></Link>
        </>
    )
}

export default CreateUser;