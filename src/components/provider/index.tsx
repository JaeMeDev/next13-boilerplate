'use client';

import { PropsWithChildren } from "react";

import StyledComponentsRegistry from "./StyledComponentsRegistry";
import StyleProvider from "./StyleProvider";

export default function Provider({ children } : PropsWithChildren){
    return(
        <StyledComponentsRegistry>
            <StyleProvider>
                {children}
            </StyleProvider>
        </StyledComponentsRegistry>
    )
}
