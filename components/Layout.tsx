import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from './sections/Header';

export default function Layout({ children }) {
	return (
		<>
			<Header />
			<Container>
				<main>{children}</main>
			</Container>
		</>
	);
}
