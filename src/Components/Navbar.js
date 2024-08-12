import React from "react";
import { Link } from "react-scroll"; // Import Link from react-scroll
import styled from "styled-components";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <Nav>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
        <CompanyName>Agni Rakshak</CompanyName>
      </LogoContainer>
      <NavLinks>
        <NavItem>
          <StyledLink
            to="home" // Ensure this matches the ID of your target section
            smooth={true}
            offset={-75}
            duration={500}
          >
            Home
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="noc-application" // Ensure this matches the ID of your target section
            smooth={true}
            offset={-75}
            duration={500}
          >
            NOC Application
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="fire-drill" // Ensure this matches the ID of your target section
            smooth={true}
            offset={-65}
            duration={500}
          >
            Book a Fire-Drill
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="resources" // Ensure this matches the ID of your target section
            smooth={true}
            offset={-75}
            duration={500}
          >
            Resources
          </StyledLink>
        </NavItem>
        <NavItem>
          <StyledLink
            to="contact" // Ensure this matches the ID of your target section
            smooth={true}
            offset={-75}
            duration={500}
          >
            Contact
          </StyledLink>
        </NavItem>
      </NavLinks>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed; /* Make navbar fixed */
  top: 0; /* Align navbar to the top */
  left: 0;
  width: 100%; /* Full width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 0px 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
  margin-right: 10px;
`;

const CompanyName = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 0;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: rgb(0, 183, 255);
  }

  &:hover::after {
    content: "";
    height: 2px;
    width: 100%;
    background-color: rgb(0, 183, 255);
    position: absolute;
    left: 0;
    bottom: -5px;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

export default Navbar;
