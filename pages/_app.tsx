import React from "react";
import { store, persistor } from "../redux/store";
import { NextComponentType } from "next";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider as NextProvider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface AppProps {
  Component: NextComponentType;
  pageProps: any;
}
export default class App extends React.Component<AppProps> {
  render() {
    return (
      <ChakraProvider theme={theme}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NextProvider
              options={{
                clientMaxAge: 0,
                keepAlive: 0
              }}
              session={this.props.pageProps.session} >
              <this.props.Component {...this.props.pageProps} />
            </NextProvider>
          </PersistGate>
        </ReduxProvider>
      </ChakraProvider>
    );
  }
}
