import "./App.css";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Myappointments from "./views/MyAppointments/MyAppointments";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
        <Myappointments/>
      </main>
    </>
  );
}

export default App;
