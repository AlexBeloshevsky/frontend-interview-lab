import { Autocomplete } from "../react-components/autocomplete/Autocomplete";

const options = [
  { id: "1", label: "React" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "JavaScript" },
  { id: "4", label: "SWR" },
];

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Frontend Interview Lab</h1>

      <Autocomplete
        options={options}
        onSelect={(option) => console.log(option)}
        placeholder="Search topics"
      />
    </main>
  );
}