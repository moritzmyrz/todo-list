import {
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from '@chakra-ui/react';
import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import ItemList from '../components/ui/ItemList';
import TodoInput from '../components/ui/TodoInput';
import { ITodoItem } from '../interfaces';

interface HomeProps {
	items: ITodoItem[];
}
class Home extends React.Component<HomeProps> {
	render() {
		const completedItems = this.props.items.filter((item) => item.completed);
		const uncompletedItems = this.props.items.filter((item) => !item.completed);
		const handleText = (text: string) =>
			this.props.items.length
				? text
				: 'You have no tasks, would you like to add one?';
		return (
			<Layout>
				<Stack textAlign={'center'} mt={5} mb={10} spacing={5}>
					<Text
						as={'h1'}
						fontSize={{ base: 'md', md: 'lg' }}
						fontWeight={'bold'}
					>
						To-Do Liste
					</Text>
					<Text>
						Denne to-do listen programmet er laget med React.JS og Next.JS,
						autentisering skjer med NextAuth.js og grensesnittet er laget med
						Chakra UI.
					</Text>
					<TodoInput />
				</Stack>
				<Stack mb={10}>
					<Tabs isFitted variant={'enclosed'} colorScheme={'teal'}>
						<TabList>
							<Tab>Alle</Tab>
							<Tab>Gjennomført</Tab>
							<Tab>Gjenstår</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<ItemList
									data={this.props.items}
									text={handleText('Du har ingen oppgaver, vil du lage en?')}
								/>
							</TabPanel>
							<TabPanel>
								<ItemList
									data={completedItems}
									text={handleText('Du har ikke gjennomført noen oppgaver!')}
								/>
							</TabPanel>
							<TabPanel>
								<ItemList
									data={uncompletedItems}
									text={handleText(
										'Gratulerer, alle oppgavene dine har blitt fullført!'
									)}
								/>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Stack>
			</Layout>
		);
	}
}

export const mapState = (state: { todosReducer: { items: ITodoItem[] } }) => {
	const { items } = state.todosReducer;
	return { items };
};

export default connect(mapState)(Home);
