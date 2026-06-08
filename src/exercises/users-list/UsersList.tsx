import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // can be derived

  useEffect(() => {
    setLoading(true); // can be initialized as true

    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        // no check for response errors
        setUsers(data.users);
        setFilteredUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        // no setLoading(false);
        setError(err.message);
      });
  }, []);
  // whole api call should be in a custom hook

  function handleSearch(value: string) {
    setSearch(value);

    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().includes(value.toLowerCase()),
    ); // filtering only works for first names, can add family names as well

    setFilteredUsers(filtered);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // no empty state

  return (
    <main>
      <h1>Users</h1>

      <input
        value={search}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Search users"
      />

      {filteredUsers.map((user) => (
        <div key={user.id}>
          <img src={user.image} alt={user.firstName} width={80} />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>{user.email}</p>
        </div>
      ))}
    </main>
  );
}
