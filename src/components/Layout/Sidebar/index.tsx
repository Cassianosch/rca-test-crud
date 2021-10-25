import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { sidebarMenus } from './data';

interface SidebarProps {
    isOpen: boolean;
    onClose(): void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps): JSX.Element => {
    const { pathname } = useLocation();

    const isMobile = useBreakpointValue({
        base: true,
        xs: true,
        xl: false,
    });

    const Menus = useCallback(
        () => (
            <Flex direction="column" bgColor="white" borderWidth="0">
                {sidebarMenus.map((menu) => {
                    const isActive = pathname === menu.to;

                    return (
                        <Link key={`/menu-${menu.id}`} to={menu.to}>
                            <Flex
                                alignItems="center"
                                gridColumnGap="4"
                                px="4"
                                py="4"
                                color={
                                    isActive
                                        ? 'crud.variants.darkGrey'
                                        : 'crud.variants.grey'
                                }
                                borderLeft={isActive && '4px solid'}
                                borderLeftColor="crud.primary.500"
                                boxShadow={
                                    isActive &&
                                    'inset 19px 0 30px -22px #FFBD59'
                                }
                                _hover={{
                                    color: 'crud.variants.darkGrey',
                                }}>
                                <Icon
                                    as={menu.icon}
                                    w="6"
                                    h="6"
                                    fill={
                                        isActive
                                            ? 'crud.primary.500'
                                            : 'crud.variants.iconGrey'
                                    }
                                />
                                <Text
                                    fontSize="xs"
                                    textTransform="uppercase"
                                    fontWeight="bold">
                                    {menu.label}
                                </Text>
                            </Flex>
                        </Link>
                    );
                })}
            </Flex>
        ),
        [pathname],
    );

    if (isMobile) {
        return (
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                placement="left"
                size="xs">
                {isMobile && <DrawerOverlay />}
                <DrawerContent>
                    {isMobile && <DrawerCloseButton />}
                    <DrawerBody p="0">
                        <Menus />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Flex
            direction="column"
            w="320px"
            bgColor="white"
            position="fixed"
            top="0"
            height="100vh"
            boxShadow="lg"
            borderWidth="0">
            <Menus />
        </Flex>
    );
};
