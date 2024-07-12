import { users } from "./data";

export default function UsersList() {
  const usersList = users.map((user) => (
    <li key={user.id}>
      {user.name} {user.email}
    </li>
  ));

  return <ol>{usersList}</ol>;
}
