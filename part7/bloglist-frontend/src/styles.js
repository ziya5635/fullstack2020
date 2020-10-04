import styled from 'styled-components'
import {createGlobalStyle} from "styled-components"

export const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

export const Input = styled.input`
  margin: 0.25em;
`

export const GlobalStyle = createGlobalStyle`
	:root{
		background-color: #9ab3f5;
		font-size: 18px;
	}
`




