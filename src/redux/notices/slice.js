import { createSlice } from '@reduxjs/toolkit';
import { initialNotices } from '../../presets/initial';
import { fetchAddNoticesFavorite, fetchNoticesByCategory, fetchRemoveNoticesFavorite } from './operation';

const noticesSlice = createSlice({
  name: 'notices',
  initialState: initialNotices,
  reducers: {
    setFilter(state, action) {
      state.additionalFilter = action.payload;

    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNoticesByCategory.fulfilled, (state, { payload }) => {
        state.notices = payload;
      })
      .addCase(fetchAddNoticesFavorite.fulfilled, (state, action) => {

        const notice = state.notices.data.find(item => item._id === action.meta.arg.id);
        if (notice) {
          notice.favorite.push(action.meta.arg.userId);
        }
      })
      .addCase(fetchRemoveNoticesFavorite.fulfilled, (state, action) => {
        const notice = state.notices.data.find(item => item._id === action.meta.arg.id);
        if (notice) {
          const index = notice.favorite.indexOf(action.meta.arg.userId);
          if (index !== -1) {
            notice.favorite.splice(index, 1);
          }
        }
      });
  },
});

export const { setFilter } = noticesSlice.actions;

export const noticesReducer = noticesSlice.reducer;
