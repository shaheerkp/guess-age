import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: User|undefined = {
  name: "",
  age: 0,
  gender: "",
  country: [{ country_id: "PK", probability: 0.9 }],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.gender = action.payload.gender;
      state.country = action.payload.country;
    },
  },
});

export default UserSlice.reducer;

export const { setProfile } = UserSlice.actions;
