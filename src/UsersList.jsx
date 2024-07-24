import { useMemo, useEffect, useState } from "react";
import { usersData } from "./data";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const filteredData = useMemo(() => {
    if (userId) {
      const filteredUsers = users.filter((user) => user.id === userId);
      const filteredUsersList = filteredUsers.map((user) => (
        <li key={user.id}>
          {user.firstName} {user.lastName} {user.email}
        </li>
      ));
      return filteredUsersList;
    }
  }, [userId]);

  // const filteredNameOption = useMemo(() => {
  //   if (userId) {
  //     return users
  //       .filter((user) => user.id === userId)
  //       .map((user) => (
  //         <option key={user.id} value={user.id}>
  //           {user.firstName}
  //         </option>
  //       ));
  //   }
  // }, [userId]);

  const filteredEmailOption = useMemo(() => {
    if (userId) {
      return users
        .filter((user) => user.id === userId)
        .map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ));
    }
  }, [userId]);

  const usersList = users.map((user) => (
    <li key={user.id}>
      {user.firstName} {user.lastName} {user.email}
    </li>
  ));

  const selectNameOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.firstName}
    </option>
  ));

  const selectEmailOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.email}
    </option>
  ));

  const onChange = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <>
      <div className="flex">
        <select name="users" id="users" onChange={onChange}>
          <option value="" disabled selected>
            --Please choose a name--
          </option>
          {selectNameOption}
        </select>
        <select name="usersEmail" id="usersEmail" onChange={onChange}>
          <option value="" disabled selected>
            --Please choose an email--
          </option>
          {userId ? filteredEmailOption : selectEmailOption}
        </select>
      </div>

      {userId ? <ol>{filteredData}</ol> : <ol>{usersList}</ol>}
    </>
  );
};

export default UsersList;
