import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button.js";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
  //const [enteredUsername, setEnteredUsername] = useState("");
  //const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    //plus turns the enteredAge into the number
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age!",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    // setEnteredUsername("");
    // setEnteredAge("");
    
    //shouldn't be done NORMALLY!!!
    nameInputRef.current.value = "";
    ageInputRef.current.value = ""
  };
  //const usernameChangeHandler = (event) => {
  // setEnteredUsername(event.target.value);
  //};
  //const ageChangeHandler = (event) => {
  // setEnteredAge(event.target.value);
  //};
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            //onChange={usernameChangeHandler}
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            //value="username"
            //onChange={ageChangeHandler}
            ref={ageInputRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
