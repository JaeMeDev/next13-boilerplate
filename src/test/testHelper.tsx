import {ReactNode} from "react";
import {render} from "@testing-library/react";

import MockTheme from "./MockTheme";

export function renderWithProviders(node: ReactNode){
    return render(
        <MockTheme>
            {node}
        </MockTheme>
    )
}
