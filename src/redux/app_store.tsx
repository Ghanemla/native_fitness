import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit"

// A reducer's function signature is: (state, action) => newState
const userInit = {
		isLoading: true,
		tok: "",
		heroName: "",
		iBag: [], // ALL items, rm potions in boss battle
		equipped: [""], // ([ikey,ikey,ikey,ikey]
}
const userSlice = createSlice({
	name: "user",
	initialState: userInit,
	reducers: {
		loaded: (state) => { state.isLoading = false },
		setHero: (state, action:PayloadAction<string>) => { state.heroName = action.payload },
		setTok: (state, action:PayloadAction<string>) => { state.tok = action.payload },
		setEq: (state, action:PayloadAction<{item: string, idx: number} | string>) => {
			if (typeof action.payload == "string") state.equipped = action.payload.split(',');
			else state.equipped[action.payload.idx] = action.payload.item;
		},
		logout: () => userInit
	}
});

export const { loaded, setTok, setHero, setEq, logout } = userSlice.actions

export const store = configureStore({
	reducer: {
		user: userSlice.reducer
	}
});

// Can still subscribe to the store
//store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
