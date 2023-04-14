import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

import defaultTheme from "@/styles/defaultTheme";
import GlobalStyle from "@/styles/GlobalStyle";

export default function StyleProvider({ children } : PropsWithChildren){
    return (
        <ThemeProvider theme={defaultTheme}>
            <Reset />
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}
