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
      <Title isGray={false}>
        Login <small>Olá</small>
      </Title>
      <Paragraph>Lorem Ipsum is simply dummy text.</Paragraph>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}
