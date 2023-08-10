import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryProvider } from "./utilities/globalContext";
import { ThemeProvider } from "./utilities/themeContext";

export default function App() {
  return (
    <div className="w-screen h-screen dark:bg-gray-900">
      <section>
        <Router>
          <ThemeProvider>
            <EntryProvider>
              <NavBar></NavBar>
              <Routes>
                <Route path="/" element={<AllEntries />}></Route>
                <Route path="create" element={<NewEntry />}></Route>
                <Route path="edit/:id" element={<EditEntry />}></Route>
              </Routes>
            </EntryProvider>
          </ThemeProvider>
        </Router>
      </section>
    </div>
  );
}
