import { useEffect, useState } from "react";
import { Box, Flex, IconButton, Image, Stack } from "@chakra-ui/react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import dashboardIcon from '../../assets/Images/dashboard.svg';
import LeadsIcon from '../../assets/Images/lead-Icon.svg';
import AdminControllIcon from '../../assets/Images/admin-control-icon.svg';
import SupportIcon from '../../assets/Images/support.svg';
import CollapseIcon from "../../assets/Images/CollapseOn.svg";
import Logo from "../../assets/Images/Infusive-Logo.svg";
import CollapseLogo from "../../assets/Images/CollapseLogo.svg";
import * as routesNames from "../../constant/routes";
import MyDiv from "./sidebar.style";
import { useAuth } from "../../hooks/useAuth";
import InfusiveLogo from "../../assets/Images/Infusive-logo (2).svg"
import InfusiveMedia from "../../assets/Images/Infusive Media.svg"

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
  const { hasPermission } = useAuth();
  const Menus: MenuItem[] = [];

  if (hasPermission('Dashboard')) {
    Menus.push({ id: 1, menuName: "Dashboard", menuLogo: dashboardIcon, link: routesNames.DASHBOARD });
  }

  if (hasPermission('LeadLists')) {
    const subMenu: SubMenuItem[] = [];
    if (hasPermission('LeadLists'))
      subMenu.push({ id: 41, label: "Lead Lists", link: routesNames.LEADLIST })
    if (hasPermission('Company'))
      subMenu.push({ id: 42, label: "Company", link: routesNames.COMPANY })
    Menus.push({ id: 4, menuName: "Lead", menuLogo: LeadsIcon, subMenu: subMenu });
  }

  if (hasPermission('Roles') || hasPermission('Users') || hasPermission('Pages')) {
    const subMenu: SubMenuItem[] = [];
    if (hasPermission('Roles'))
      subMenu.push({ id: 31, label: "Roles", link: routesNames.ROLES })
    if (hasPermission('Pages'))
      subMenu.push({ id: 32, label: "Pages", link: routesNames.PAGES })
    if (hasPermission('Users'))
      subMenu.push({ id: 33, label: "Users", link: routesNames.USERS })

    Menus.push({ id: 3, menuName: "Admin Controller", menuLogo: AdminControllIcon, subMenu: subMenu });
  }

  if (hasPermission('RaiseTickets')) {
    const subMenu: SubMenuItem[] = [];
    if (hasPermission('RaiseTickets'))
      subMenu.push({ id: 21, label: "Raise Ticket", link: routesNames.SUPPORT });

    Menus.push({ id: 2, menuName: "Support", menuLogo: SupportIcon, subMenu: subMenu });
  }

  if (hasPermission('IndustryType') || hasPermission('Designation')) {
    const subMenu: SubMenuItem[] = [];
    if (hasPermission('IndustryType'))
      subMenu.push({ id: 51, label: "Industy Type", link: routesNames.INDUSTRYTYPES });
    if (hasPermission('Designation'))
      subMenu.push({ id: 52, label: "Designation", link: routesNames.DESIGNATION });
    if (hasPermission('Country'))
      subMenu.push({ id: 54, label: "Country", link: routesNames.COUNTRY });
    if (hasPermission('City'))
      subMenu.push({ id: 54, label: "City", link: routesNames.CITY });
    if (hasPermission('State'))
      subMenu.push({ id: 55, label: "State", link: routesNames.STATE });

    Menus.push({ id: 5, menuName: "Masters", menuLogo: SupportIcon, subMenu: subMenu });
  }

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
    const selectedItem = Menus.find(item => item.id === itemId);
    if (!selectedItem) return;

    if (selectedItem.link) {
      navigate(selectedItem.link);
      setMenuId(itemId);
      return;
    }

    if (selectedItem.subMenu?.length) {
      setMenuId(itemId);
      const firstSub = selectedItem.subMenu[0];
      if (firstSub) navigate(firstSub.link);
    }
  };

  return (
    <MyDiv>
      <Box className={props.toggleSidebar ? "sidebar_collapse" : "sidebar_wrapper"}>

        {/* COLLAPSE BUTTON */}
        <Box className="collapse-button">
          <IconButton
            className={props.toggleSidebar ? "" : "collpase_icon"}
            onClick={props.handleSidePanel}
            icon={<Image src={CollapseIcon} />}
            aria-label=""
            bg="white"

          />
        </Box>


        {/* LOGO */}
        <Flex className="logo_wrapper" justifyContent={props.toggleSidebar ? "center" : "flex-start"}>

          {/* Always show icon */}
          <Image src={InfusiveLogo} className="logo_icon" boxSize={14}/>

          {/* Show text ONLY when expanded */}
          {!props.toggleSidebar && (
            <Image src={InfusiveMedia} className="logo_text" />
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

    </MyDiv>
  );
};

export default Sidebar;
