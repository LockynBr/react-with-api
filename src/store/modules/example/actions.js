import * as types from '../types';

export function buttonClickedRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

export function buttonClickedSucess() {
  return {
    type: types.BOTAO_CLICADO_SUCESS,
  };
}

export function buttonClickedFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}
