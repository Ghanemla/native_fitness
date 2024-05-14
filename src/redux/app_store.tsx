import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { quests, Quest } from "../data";

// A reducer's function signature is: (state, action) => newState
const userInit:UserState = {
		isLoading: true,
		tok: "",
		heroName: "",
		bag: [],
		equipped: [],
		todayQuests: [],
}
const userSlice = createSlice({
	name: "user",
	initialState: userInit,
	reducers: {
		loaded: (state) => { state.isLoading = false },
		setHero: (state, action:PayloadAction<string>) => { state.heroName = action.payload },
		setTok: (state, action:PayloadAction<string>) => { state.tok = action.payload },
		setEq: (state, action:PayloadAction<{item: string, idx:0|1|2|3} | string>) => {
			if (typeof action.payload == "string") state.equipped = action.payload.split(',', 4) as [];
			else state.equipped[action.payload.idx] = action.payload.item;
		},
		setTodayQ: (state, action:PayloadAction<number[] | Quest>) => {
			if (!Array.isArray(action.payload)) state.todayQuests.push(action.payload);
			else action.payload.forEach(id => {
				const x = quests.find(q => q.id == id);
				if (x) state.todayQuests.push(x);
			});
		},
		logout: () => userInit
	}
});

export const { loaded, setTok, setHero, setEq, setTodayQ, logout } = userSlice.actions;

export const store = configureStore({
	reducer: {
		user: userSlice.reducer
	}
});

// Can still subscribe to the store
//store.subscribe(() => console.log(store.getState()))

type RootState = ReturnType<typeof store.getState>;
export const useSelectorRS = useSelector.withTypes<RootState>();

//type AppDispatch = typeof store.dispatch;
//export const useDispatchT = useDispatch.withTypes<AppDispatch>()
