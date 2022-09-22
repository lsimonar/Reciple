import { createReducer, on } from '@ngrx/store';
import * as actions from './reciple.actions';
import { GameHistoric } from '../models/recipes';

export interface RecipleState {
  innerHeight: number;
  availableLanguages: Array<string>;
  gameHistoric: GameHistoric;
  settings: RecipleSettings;
}

export interface RecipleSettings {
  isDarkMode: boolean;
  isFirstLogin: boolean;
  isHighContrast: boolean;
}

export const initialState: RecipleState = {
    innerHeight: 0,
    availableLanguages: [],
    gameHistoric: {} as GameHistoric,
    settings: {
      isDarkMode: false,
      isFirstLogin: true,
      isHighContrast: false
    }
};

export const recipleReducer = createReducer(
  initialState,
  on(
    actions.setIsDarkMode,
    (state, {isDarkMode}) => ({...state, settings: {...state.settings, isDarkMode: isDarkMode}})
  ),
  on(
    actions.setGameHistoric,
    (state, {gameHistoric}) => ({...state, gameHistoric: gameHistoric})
  )
);