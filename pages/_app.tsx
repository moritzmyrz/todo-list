import { ChakraProvider, theme } from '@chakra-ui/react';
import { NextComponentType } from 'next';
import { SessionProvider as NextProvider } from 'next-auth/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';

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
						<NextProvider session={this.props.pageProps.session}>
							<this.props.Component {...this.props.pageProps} />
						</NextProvider>
					</PersistGate>
				</ReduxProvider>
			</ChakraProvider>
		);
	}
}
