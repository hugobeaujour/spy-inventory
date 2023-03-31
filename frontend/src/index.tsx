import { Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import App from "./components/App/App";
import "@aws-amplify/ui-react/styles.css";

const {
    REACT_APP_USER_POOL_ID = "eu-west-1_OCFP3q5JS",
    REACT_APP_REGION = "eu-west-3",
    REACT_APP_CLIENT_ID = "7tbmv9b1pg1dvhne532u21mof",
} = process.env;

Amplify.configure({
    Auth: {
        userPoolId: REACT_APP_USER_POOL_ID,
        region: REACT_APP_REGION,
        userPoolWebClientId: REACT_APP_CLIENT_ID,
    },
    authenticationFlowType: "CUSTOM_AUTH",
});

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <Provider store={store}>
            <Suspense fallback={<div />}>
                <Authenticator.Provider>
                    <ChakraProvider>
                        <App />
                    </ChakraProvider>
                </Authenticator.Provider>
            </Suspense>
        </Provider>
    );
}
