import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

type Status = "loading" | "success" | "failure";

export default function UsersList() {
  const [status, setStatus] = useState<Status>("loading");
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const normalizedSearch = search.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(normalizedSearch),
  );

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong!");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data.users);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("failure");
        setError(err instanceof Error ? err.message : "unknown error");
      });
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failure") {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Users</h1>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search users"
      />

      {filteredUsers.length === 0 && <p>empty state</p>}

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
