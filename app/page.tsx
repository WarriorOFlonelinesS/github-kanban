'use client'
import { useState } from "react";
import { Menu } from "./components/Menu";
import { PanelUsers } from "./components/PanelUsers";
import { Board } from "./components/Board";
import { Provider } from "react-redux";
import store from "./redux/sagas/store";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Provider store={store}>
      <header className="bg-[#F9F9F9] w-[100%] h-[81px] p-4 shadow-lg shadow-slate-200">
        <div className="flex justify-between items-center">
          <div className="bg-red-700 w-[40px] h-[40px]" />
          <div className="w-18 flex items-center">
            <div className="w-[30px] h-[30px] rounded-2xl bg-red-100" />
            <div className="w-[30px] h-[30px] rounded-2xl bg-red-100" />
            <p>+5</p>
            <button
              className="focus:outline-none z-50 ml-4"
              onClick={toggleMenu}
            >

              <div className={`w-8 h-[2px] bg-black mb-[8px] transform transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-8 h-[2px] bg-black mb-[8px] transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-8 h-[2px] bg-black transform transition-transform ${isOpen ? '-rotate-45 -translate-y-3' : ''}`} />
            </button>
          </div>
        </div>
        <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
      </header >
      <main className="p-4 flex pt-10 min-w-[350px] overflow-auto h-full">
        <PanelUsers />
        <Board />
      </main>
    </Provider>
  );
}
