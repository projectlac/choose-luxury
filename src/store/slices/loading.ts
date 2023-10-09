// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from '../../types';
// import { ChatHistory } from 'views/application/chat/types';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['loading'] = {
  loading: false
};

const slice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // HAS ERROR
    toggleLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function showLoading() {
  return () => {
    dispatch(slice.actions.toggleLoading(true));
  };
}

export function hiddenLoading() {
  return () => {
    dispatch(slice.actions.toggleLoading(false));
  };
}
