import { useMemo, useEffect, useState } from "react";
import { usersData, userEmailOptions, userNameOptions } from "./data";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const usersToDisplay = useMemo(() => {
    if (!userId && users.length > 0) return users;

    return users.filter((user) => user.id === userId);
  }, [userId, users]);

  const emailOptionsToDisplay = useMemo(() => {
    if (!userId) return userEmailOptions;

    return userEmailOptions.filter(({ value }) => value === userId);
  }, [userId]);

  const renderOption = (options, labelKey) => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option[labelKey]}
      </option>
    ));
  };

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
          {renderOption(userNameOptions, "label")}
        </select>

        <select name="usersEmail" id="usersEmail" onChange={onChange}>
          <option value="" disabled selected>
            --Please choose an email--
          </option>
          {renderOption(emailOptionsToDisplay, "label")}
        </select>
      </div>

      <ol>
        {usersToDisplay.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} {user.email}
          </li>
        ))}
      </ol>
    </>
  );
};

export default UsersList;
