import type { CSSProp } from 'styled-components';

import defaultTheme from '@/styles/defaultTheme';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {

    }
}

declare module 'react' {
    interface DOMAttributes<T> {
        css?: CSSProp<T>;
    }
}
