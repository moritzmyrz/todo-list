import React from "react";
import Layout from "../components/Layout";
import ItemList from "../components/ui/ItemList";
import TodoInput from "../components/ui/TodoInput";
import { Text, Stack, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { ITodoItem } from "../interfaces";
import { connect } from "react-redux";

interface HomeProps {
  items: ITodoItem[]
}
class Home extends React.Component<HomeProps> {
  render() {
    const completedItems = this.props.items.filter(item => item.completed);
    const uncompletedItems = this.props.items.filter(item => !item.completed);
    const handleText = (text: string) => this.props.items.length ? text : "You have no tasks, would you like to add one?";
    return (
      <Layout>
        <Stack textAlign={"center"} mt={5} mb={10} spacing={5}>
          <Text as={"h1"} fontSize={{ base: "md", md: "lg" }} fontWeight={"bold"}>Todo List App</Text>
          <Text>
            A todo list app created using Next.js and NextAuth.js styled with chakra-ui and written in typescript
          </Text>
          <TodoInput />
        </Stack>
        <Stack mb={10}>
          <Tabs isFitted variant={"enclosed"} colorScheme={"teal"}>
            <TabList>
              <Tab>All</Tab>
              <Tab>Completed</Tab>
              <Tab>Uncompleted</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ItemList data={this.props.items} text={handleText("You have no tasks, would you like to add one?")} />
              </TabPanel>
              <TabPanel>
                <ItemList data={completedItems} text={handleText("You haven't completed any task!")} />
              </TabPanel>
              <TabPanel>
                <ItemList data={uncompletedItems} text={handleText("Congratulations, all tasks have been completed!")} />
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
}

export default connect(mapState)(Home);