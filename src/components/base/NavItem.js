import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { utils, theme } from 'styles'

const StyledDiv = styled.div`
  color: ${ props => props.theme.color.disabled };
  margin: 0 10px;
  padding: 0 8px;
`

// style object for NavLink
const activeStyle = {
  opacity: 1,
  fontWeight: '900',
  color: 'black',
  borderBottom: `2px solid ${ theme.color.primary }`,
  padding: '0 2px',
  transition: `${ utils.transitMap(['color', 'border-bottom']) }`
}

const NavItem = ({ to, children, exact }) => {
  // is no 'to', then return plain div.
  return to ? (
    <StyledDiv>
      <NavLink to={ to } activeStyle={ activeStyle } exact={ exact }>
        { children }
      </NavLink>
    </StyledDiv>
  ) : (
    <StyledDiv>
      { children }
    </StyledDiv>
  )
}

NavItem.defaultProps = {
  children: 'No NavName here',
}

NavItem.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string,
  exact: PropTypes.bool,
}

export default NavItem
