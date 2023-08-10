import React, { useContext } from "react";
import { EntryContextType, ThemeContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";
import { ThemeContext } from "../utilities/themeContext";

export default function SettingsDialog({
  setShowSettingsDialog,
}: {
  setShowSettingsDialog: (status: boolean) => void;
}) {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowSettingsDialog(false)}
        ></div>
        <div className="flex items-center min-h-screen py-8 px-4">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white dark:bg-gray-700 rounded-md">
            <div className="mt-3 sm:flex">
              <div className="text-center sm:ml-4 sm:text-left">
                <h2 className="text-2xl text-black dark:text-white">Settings</h2>
                <div className="flex items-center mb-4 mt-4">
                  <input
                    id="dark-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={theme === "dark"}
                    onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                  />
                  <label htmlFor="dark-checkbox" className="ml-2 text-sm font-medium dark:text-white">
                    Dark Mode
                  </label>
                </div>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border dark:text-white"
                  onClick={() => setShowSettingsDialog(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
