import {useEffect, useState} from "react";
import axios from "axios";
import {Link,useParams,useNavigate} from "react-router-dom";

const UpdateUser = () =>{

   const [firstName, setFirstName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const {id} = useParams();



    useEffect(() => {
        getUserById()
    },[])

    const getUserById = async() =>{
        const {data} = await axios.get(`http://localhost:3001/users/${id}`)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.email)
    }


  

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            await axios.patch(`http://localhost:3001/users/${id}`,{firstName,lastName,email})
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
        <>
            <form style={{display:"flex",gap:10, flexDirection:"column", margin:"auto", width:500}}>
                <h1>Edit User Details</h1>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={(event) =>{setFirstName(event.target.value)}}/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName"  value={lastName} onChange={(event) =>{setLastName(event.target.value)}}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"  value={email} onChange={(event) =>{setEmail(event.target.value)}}/>
                <input type="submit" value="Edit User" onClick={handleSubmit}/>
            </form>
            <Link to="/"><button>GO BACK TO HOME PAGE</button></Link>
        </>
        </>
    )
}


export default UpdateUser