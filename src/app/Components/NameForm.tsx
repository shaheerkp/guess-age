"use client";
import { setProfile } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/store";
import axios from "axios";
import React, { useState } from "react";
import PersonCard from "./PersonCard";

const NameForm = () => {
  const dispatch = useAppDispatch();

  interface User {
    name: String;
    age: Number;
    gender: String;
    country: [Country];
  }

  interface Country {
    country_id: String;
    probability: Number;
  }

  const [name, setName] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!name) return;
    event.preventDefault();

    Promise.all([
      axios.get(`https://api.agify.io?name=${name}`),
      axios.get(`https://api.genderize.io?name=${name}`),
      axios.get(`https://api.nationalize.io?name=${name}`),
    ])
      .then((res) => {
        dispatch(
          setProfile({
            name: res[0].data.name,
            age: res[0].data.age,
            gender: res[1].data.gender,
            country: res[2].data.country,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });

    // const {data}=await axios.get(`https://api.agify.io?name=${name}`)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Get Details
          </button>
        </div>
      </form>
       <PersonCard />
    </div>
  );
};

export default NameForm;
