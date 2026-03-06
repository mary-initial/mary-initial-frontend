import { ScreenMode, Theme } from '../types';
export type TypographyStyles = {

}
export type TypographyStylesFactory = () => TypographyStyles;
export const makeTypographyStyles = ({ typography }: Theme, screenMode: ScreenMode): TypographyStylesFactory => {
    return () => ({
        displayLarge: {
            
        }
    })
}