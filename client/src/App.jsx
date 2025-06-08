import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme}>
      <h1>Welcome to the Chat App</h1>
      <p>Current theme: {theme}</p>
      {/* Other components can be added here */}
    </div>
  );
}

export default App;
