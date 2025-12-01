import { useEffect, useState } from "react";
import { Box, Flex, IconButton, Image, Stack } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import dashboardIcon from '../../assets/Images/dashboard.svg';
import LeadsIcon from '../../assets/Images/lead-Icon.svg';
import AdminControllIcon from '../../assets/Images/admin-control-icon.svg';
import SupportIcon from '../../assets/Images/support.svg';
import CollapseIcon from "../../assets/Images/CollapseOn.svg";
import Logo from "../../assets/Images/Infusive-Logo.svg";
import CollapseLogo from "../../assets/Images/CollapseLogo.svg";
import * as routesNames from "../../constant/routes";
import MyDiv from "./sidebar.style";
import { Label } from "recharts";

type SubMenuItem = {
  id: number;
  label: string;
  link: string;
};

type MenuItem = {
  id: number;
  menuName: string;
  menuLogo: string;
  link?: string;
  subMenu?: SubMenuItem[];
};

interface SidebarProps {
  toggleSidebar: boolean;
  handleSidePanel: () => void;
  activePortal: string;
}

const Sidebar = (props: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();


  const Menus: MenuItem[] = [
    {
      id: 1,
      menuName: "Dashboard",
      menuLogo: dashboardIcon,
      link: routesNames.DASHBOARD,
    },
   
    {
      id: 2,
      menuName: "Leads",
      menuLogo: LeadsIcon,
      subMenu: [
        { id: 21, label: "Lead List", link: routesNames.LEADLIST },
        { id: 22, label: "Companies", link: routesNames.COMPANIES },
       
      ],
    },
    {
      id: 3,
      menuName: "Admin Controll",
      menuLogo: AdminControllIcon,
      subMenu: [
        { id: 31, label: "Roles",link: routesNames.ROLES},
        { id: 32, label: "Pages",link: routesNames.PAGES},
        { id: 33, label: "Users", link: routesNames.USERS},
      ]
    },
    {
      id: 4,
      menuName: "Support",
      menuLogo: SupportIcon,
      subMenu: [
        { id: 41, label: "Raise Ticket", link: routesNames.SUPPORT},
      ]
    },
   
  ];

  const [menuId, setMenuId] = useState<number | null>(null);
  const ActiveMenu = Menus;

  useEffect(() => {
    const activeItem = ActiveMenu.find(
      (item) =>
        item.link === location.pathname ||
        item.subMenu?.some((sub) => sub.link === location.pathname)
    );
    if (activeItem) {
      setMenuId(activeItem.id);
    }
  }, [location.pathname]);

  const handleMenu = (itemId: number) => {
    const selectedItem = ActiveMenu.find((item) => item.id === itemId);

    if (!selectedItem) return;

    // If it's a direct menu link (no submenu)
    if (selectedItem.link) {
      navigate(selectedItem.link);
      setMenuId(itemId);
      return;
    }

    // If it has a submenu
    if (selectedItem.subMenu?.length) {
      setMenuId(itemId);
    }
  };

  return (
    <MyDiv>
      <Box className={props.toggleSidebar ? 'sidebar_collapse' : 'sidebar_wrapper'}>
        <Box className="collapse-button" mb={10}>
          <IconButton
            className={props.toggleSidebar ? '' : 'collpase_icon'}
            onClick={props.handleSidePanel}
            icon={<Image src={CollapseIcon} />}
            aria-label={''}
          />
        </Box>
        <Box>
          <Flex
            className="top_header"
            style={{ justifyContent: props.toggleSidebar ? 'center' : '' }}
          >
            {props.toggleSidebar ? (
              <Image src={CollapseLogo} className="col" cursor={'pointer'} />
            ) : (
              <Image src={Logo} className="logo" cursor={'pointer'} />
            )}
          </Flex>
          <Box className={props.toggleSidebar ? 'sidebar_box_toggle' : 'sidebar_box'}>
            <Stack spacing="3" className="menu_box">
              {ActiveMenu.map((item) => {
                const isActiveMenu = item.id === menuId;
                const hasSubMenu = item.subMenu?.length;
                const isExpanded = isActiveMenu && hasSubMenu;
 
                return (
                  <Box key={item.id}>
                    <Flex
                      className={isActiveMenu ? 'active_menu menu_item' : 'menu_item'}
                      onClick={() => handleMenu(item.id)}
                    >
                      <NavLink
                        to={item.link ?? ''}
                        className="font-poppins text_lg font_dark"
                        style={{ justifyContent: props.toggleSidebar ? 'center' : '' }}
                      >
                        <Image src={item.menuLogo} className="icon_size" />
                        {!props.toggleSidebar && item.menuName}
                      </NavLink>
                    </Flex>
 
                    {isExpanded && !props.toggleSidebar && (
                      <Box className="submenu_wrapper">
                        {item.subMenu?.map((subItem) => {
                          const isSubActive = location.pathname === subItem.link;
                          return (
                            <NavLink
                              key={subItem.id}
                              to={subItem.link}
                              className={
                                isSubActive ? 'active_submenu submenu_item' : 'submenu_item'
                              }
                            >
                              • {subItem.label}
                            </NavLink>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
    </MyDiv>
  );
};

export default Sidebar;
