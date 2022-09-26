import { createAction, props } from '@ngrx/store';
import { GameHistoric } from '../models/recipes';

export const setIsDarkMode = createAction('[Reciple] Set isDarkMode', props<{isDarkMode: boolean}>());
export const setGameHistoric = createAction('[Reciple] Set game historic', props<{gameHistoric: GameHistoric}>());
export const setAvailableLanguages = createAction('[Reciple] Set available languages', props<{availableLanguages: Array<string>}>());
export const setIsHighContrast = createAction('[Reciple] Set isHighContrast', props<{isHighContrast: boolean}>());
export const setIsFirstLogin = createAction('[Reciple] Set isFirstLogin', props<{isFirstLogin: boolean}>());
export const setLanguage = createAction('[Reciple] Set language', props<{language: string}>());


