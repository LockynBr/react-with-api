import React from 'react';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragraph } from './styled';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.buttonClickedRequest());
  }

  return (
    <Container>
      <h1>Login</h1>
    </Container>
  );
}
