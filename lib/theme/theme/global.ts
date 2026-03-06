import { TextStyle, ViewStyle } from "react-native";
import { Theme } from ".";

export type GlobalStyles = {
    appContainer: ViewStyle | TextStyle;
}
export type GlobalStylesFactory = () => GlobalStyles
export const makeGlobalStyles: (theme: Theme) => GlobalStylesFactory = (theme: Theme) => {
    const appContainer: ViewStyle | TextStyle = {
        fontSize: 16,
        fontFamily: theme.typography.base.font
    }

    return () => ({
        appContainer
    })
}