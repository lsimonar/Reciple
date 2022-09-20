import { createReducer, on } from '@ngrx/store';
import * as actions from './reciple.actions';

export interface RecipleState {
  innerHeight: number;
  availableLanguages: Array<string>;
  settings: RecipleSettings;
}

export interface RecipleSettings {
  isCommaSeparator: boolean;
  isDarkMode: boolean;
  isFahrenheit: boolean;
  isFirstLogin: boolean;
  isHighContrast: boolean;
}

export const initialState: RecipleState = {
    innerHeight: 0,
    availableLanguages: [],
    settings: {
      isCommaSeparator: true,
      isDarkMode: false,
      isFahrenheit: false,
      isFirstLogin: true,
      isHighContrast: false
    }
};

export const recipleReducer = createReducer(
  initialState,
  on(
    actions.setIsDarkMode,
    (state, {isDarkMode}) => ({...state, settings: {...state.settings, isDarkMode: isDarkMode}})
  )
);