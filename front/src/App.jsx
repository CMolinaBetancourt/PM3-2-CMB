import "./App.css";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Myappointments from "./views/MyAppointments/MyAppointments";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Home />
        <Myappointments />
        <Register />
        <Login />
      </main>
    </>
  );
}

export default App;


