import { useMemo, useEffect, useState } from "react";
import { usersData } from "./data";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const [selectedName, setSelectedName] = useState(undefined);
  const [selectedEmail, setSelectedEmail] = useState(undefined);
  const [usersListSelectedByName, setUsersListSelectedByName] = useState("");
  const [usersListSelectedByEmail, setUsersListSelectedByEmail] = useState("");

  useEffect(() => {
    setUsers(usersData);
  }, []);

  useEffect(() => {
    if (selectedName) {
      const usersListSelected = selectedName.map((user) => (
        <li key={user.id}>
          {user.firstName} {user.lastName} {user.email}
        </li>
      ));
      setUsersListSelectedByName(usersListSelected);
    }
    if (selectedEmail) {
      const usersListSelected = selectedEmail.map((user) => (
        <li key={user.id}>
          {user.firstName} {user.lastName} {user.email}
        </li>
      ));
      setUsersListSelectedByEmail(usersListSelected);
    }
    if (selectedName && selectedEmail) {
    }
  }, [selectedName, selectedEmail]);

  const uniqueNames = useMemo(
    () => [...new Set(users.map((user) => user.firstName))],
    [users]
  );

  const uniqueEmails = useMemo(
    () => [...new Set(users.map((user) => user.email))],
    [users]
  );

  const usersList = users.map((user) => (
    <li key={user.id}>
      {user.firstName} {user.lastName} {user.email}
    </li>
  ));

  const selectNameOption = uniqueNames.map((name, i) => (
    <option key={i} value={name}>
      {name}
    </option>
  ));

  const selectEmailOption = uniqueEmails.map((email, i) => (
    <option key={i} value={email}>
      {email}
    </option>
  ));

  const onNameChange = ({ target }) => {
    if (selectedEmail) {
      const selectedUsers = selectedEmail.filter(
        (user) => user.name === target.value
      );
      setSelectedName(selectedUsers);
    } else {
      const selectedUsers = users.filter(
        (user) => user.firstName === target.value
      );
      setSelectedName(selectedUsers);
    }
  };

  const onEmailChange = ({ target }) => {
    if (selectedName) {
      const selectedUsers = selectedName.filter(
        (user) => user.email === target.value
      );
      setSelectedEmail(selectedUsers);
    } else {
      const selectedUsers = users.filter((user) => user.email === target.value);
      setSelectedEmail(selectedUsers);
    }
  };

  return (
    <>
      <div className="flex">
        <label htmlFor="users">Choose user</label>
        <select name="users" id="users" onChange={onNameChange}>
          {selectNameOption}
        </select>
        <label htmlFor="usersEmail">Choose email</label>
        <select name="usersEmail" id="usersEmail" onChange={onEmailChange}>
          {selectEmailOption}
        </select>
      </div>

      {selectedName && <ol>{usersListSelectedByName}</ol>}
      {selectedEmail && <ol>{usersListSelectedByEmail}</ol>}

      {!selectedName && !selectedEmail && <ol>{usersList}</ol>}
    </>
  );
};

export default UsersList;
