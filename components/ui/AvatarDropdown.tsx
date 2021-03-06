import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function AvatarDropdown({ session }) {
	return (
		<>
			{session && (
				<Menu closeOnSelect={false}>
					<MenuButton
						as={Button}
						rounded={'full'}
						variant={'unstyled'}
						cursor={'pointer'}
					>
						<Avatar size={'sm'} src={session.user.image} />
					</MenuButton>
					<MenuList>
						<MenuItem
							isFocusable={true}
							_hover={{ bgColor: 'transparent' }}
							_focus={{ bgColor: 'transparent' }}
						>
							<Box>
								<Text fontSize={'sm'}>Logget inn som</Text>
								<Text fontWeight={'bold'} isTruncated>
									{session.user.name}
								</Text>
							</Box>
						</MenuItem>
						<MenuDivider />
						<MenuItem
							onClick={(e) => {
								e.preventDefault();
								return signOut();
							}}
						>
							Logg ut
						</MenuItem>
					</MenuList>
				</Menu>
			)}
		</>
	);
}
