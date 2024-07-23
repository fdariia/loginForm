import { useEffect, useState } from "react";
import { usersData } from "./data";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const usersList = users.map((user) => (
    <li key={user.id}>
      {user.name} {user.email}
    </li>
  ));

  return <ol>{usersList}</ol>;
};

export default UsersList;
