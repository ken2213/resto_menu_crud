import FirebaseConfig from "@/config/firebase";
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";

const database = FirebaseConfig()

function Test() {
    let [username, setUsername] = useState('');
    let [fullname, setFullName] = useState('');
    let [phone, setPhone] = useState('');
    let [dob, setDob] = useState('');

    let isNullOrWhiteSpaces = (value: any) => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }

    let InsertData = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)
            || isNullOrWhiteSpaces(fullname)
            || isNullOrWhiteSpaces(phone)
            || isNullOrWhiteSpaces(dob)) {
                alert("Fill all the fields");
                return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                alert("the user already exists, try a different name")
            }

            else {
                set(ref(database, 'Customer/' + username),  {
                    fullname: fullname,
                    phonenumber: phone,
                    dateofbirth: dob,
                }).then(() => {
                    alert("customer inserted successfully")
                })
                .catch(error =>{
                    console.log(error);
                    alert("There was an error inserting the customer")
                })
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error data retrieval was unsuccessful")
        })
    }





    let UpdateData = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
                alert("username is empty, try to select a user first, with the select button");
                return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, 'Customer/' + username),  {
                    fullname: fullname,
                    phonenumber: phone,
                    dateofbirth: dob,
                }).then(() => {
                    alert("customer updated successfully")
                })
                .catch(error =>{
                    console.log(error);
                    alert("There was an error updating the customer")
                })
            }

            else {
                alert("Error: the user does not exist")
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error data retrieval was unsuccessful")
        })
    }

    let DeleteData = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
                alert("username is empty, try to select a user first, with the select button");
                return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, 'Customer/' + username))
                .then(() => {
                    alert("customer deleted successfully")
                })
                .catch(error =>{
                    console.log(error);
                    alert("There was an error deleting the customer")
                })
            }

            else {
                alert("Error: the user does not exist")
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error data retrieval was unsuccessful")
        })
    }






    let SelectData = () => {
        const dbref = ref(database);

        if (isNullOrWhiteSpaces(username)) {
            alert("username is required to retrieve the data");
            return;
        }

        get(child(dbref, 'Customer/' + username)).then(snapshot => {
            if (snapshot.exists()) {
                setFullName(snapshot.val().fullname);
                setPhone(snapshot.val().phonenumber);
                setDob(snapshot.val().dateofbirth)
            }

            else {
                alert("no data available")
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Error data retrieval was unsuccessful")
        })
    }

    return (
        <>
            <label>Username</label>
            <input type="text" value={username} onChange={e=>{setUsername(e.target.value)}} className="bg-gray-700" />
            <br />

            <label>Full Name</label>
            <input type="text" value={fullname} onChange={e=>{setFullName(e.target.value)}} className="bg-gray-700"  />
            <br />

            <label>Phone</label>
            <input type="text" value={phone} onChange={e=>{setPhone(e.target.value)}} className="bg-gray-700"  />
            <br />

            <label>Date of Birth</label>
            <input type="date" value={dob} onChange={e=>{setDob(e.target.value)}} className="bg-gray-700"  />
            <br />

            <button onClick={InsertData}>Insert Data</button>
            <button onClick={UpdateData}>Update Data</button>
            <button onClick={DeleteData}>Delete Data</button>
            <button onClick={SelectData}>Select Data</button>
        </>
    )
}


export default Test;