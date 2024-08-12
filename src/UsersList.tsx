import { useMemo, useEffect, useState, ChangeEvent } from "react";
import {
  usersData,
  userEmailOptions,
  userNameOptions,
  TUserOptions,
  IUser,
} from "./data.ts";

const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const usersToDisplay = useMemo(() => {
    if (!userId) return users;

    return users.filter((user) => user.id === userId);
  }, [userId, users]);

  const emailOptionsToDisplay = useMemo(() => {
    if (!userId) return userEmailOptions;

    return userEmailOptions.filter(({ value }) => value === userId);
  }, [userId]);

  const renderOption = (options: TUserOptions[]) => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (e.target !== null) {
      const selectEl = e.target as HTMLSelectElement;
      setUserId(Number(selectEl.value));
    }
  };

  return (
    <>
      <div className="flex">
        <select name="users" id="users" onChange={onChange}>
          <option value="" disabled selected>
            --Please choose a name--
          </option>
          {renderOption(userNameOptions)}
        </select>

        <select name="usersEmail" id="usersEmail" onChange={onChange}>
          <option value="" disabled selected>
            --Please choose an email--
          </option>
          {renderOption(emailOptionsToDisplay)}
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
