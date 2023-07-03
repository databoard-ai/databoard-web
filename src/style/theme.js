import { extendTheme } from "@chakra-ui/react";
import '@fontsource/montserrat';

export const DataboardTheme=extendTheme(
    {
        colors:{
            primary:"#4283E4",
            white:"#ffffff",
            dark:"#121212",
        },
        fonts: {
            heading: `'Montserrat', sans-serif`,
            body: `'Montserrat', sans-serif`,
          },
    }
);


