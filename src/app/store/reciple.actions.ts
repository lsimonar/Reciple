import { createAction, props } from '@ngrx/store';

export const setIsDarkMode = createAction('[Reciple] Set isDarkMode', props<{isDarkMode: boolean}>());
