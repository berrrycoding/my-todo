import Navigators from "./components/navigators";
import { Providers } from "./components/providers";

function App() {
  return (
    <Providers>
      <Navigators />
    </Providers>
  );
}

export default App;
