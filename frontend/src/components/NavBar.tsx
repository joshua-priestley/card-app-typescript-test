import { useState } from "react";
import { NavLink } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";

export default function NavBar() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  return (
    <nav className="flex justify-center gap-5">
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white dark:bg-gray-600 dark:hover:bg-gray-700"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white dark:bg-gray-600 dark:hover:bg-gray-700"
        to={"/create"}
      >
        New Entry
      </NavLink>

      <button
        className="m-3 p-4 text-xl bg-purple-400 hover:bg-purple-500 rounded-md font-medium text-white dark:bg-purple-700 dark:hover:bg-purple-800"
        type="button"
        onClick={() => {
          setShowSettingsDialog(true);
        }}
      >
        Settings
      </button>
      {showSettingsDialog && <SettingsDialog setShowSettingsDialog={setShowSettingsDialog} />}
    </nav>
  );
}
