import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SidebarState {
  sideOpen: boolean;
}

const initialState: SidebarState = {
  sideOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
        state.sideOpen = !state.sideOpen;
    },
    openSidebar: (state) => {
      state.sideOpen = true;
    },
    closeSidebar: (state) => {
      state.sideOpen = false;
    },
  },
});

export const selectSideOpen = (state: RootState) => state.sidebar.sideOpen;


export const { openSidebar, closeSidebar, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
