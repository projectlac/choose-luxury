import { createSlice } from '@reduxjs/toolkit';

// types
import { SnackbarProps } from 'types/snackbar';

const initialState: SnackbarProps = {
  action: false,
  open: false,
  message: 'Note archived',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  variant: 'default',
  alert: {
    color: 'primary',
    variant: 'filled'
  },
  transition: 'Fade',
  close: true,
  actionButton: false,
  severity: 'success'
};

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbar = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar(state, action) {
      const { open, message, anchorOrigin, variant, alert, transition, close, actionButton, severity } = action.payload;

      state.action = !state.action;
      state.open = open || initialState.open;
      state.message = message || initialState.message;
      state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
      state.variant = variant || initialState.variant;
      state.alert = {
        color: alert?.color || initialState.alert.color,
        variant: alert?.variant || initialState.alert.variant
      };
      state.transition = transition || initialState.transition;
      state.close = close === false ? close : initialState.close;
      state.actionButton = actionButton || initialState.actionButton;
      state.severity = severity || initialState.severity;
    },

    closeSnackbar(state) {
      state.open = false;
    }
  }
});

export default snackbar.reducer;

export const { closeSnackbar, openSnackbar } = snackbar.actions;
