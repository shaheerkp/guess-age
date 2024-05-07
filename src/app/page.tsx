"use client"

// import Image from "next/image";
import NameForm from "./Components/NameForm";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <NameForm />
    </Provider>
  );
}
