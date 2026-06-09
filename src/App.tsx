import UsersList from "./exercises/users-list/UsersList";
import { useIsFirstRender } from "./exercises/use-is-first-render/useIsFirstRender";
export default function App() {
  const isFirstRender = useIsFirstRender();
  console.log({ isFirstRender });

  return (
    <main style={{ padding: 24 }}>
      <h1>Frontend Interview Lab</h1>

      <UsersList />
    </main>
  );
}
