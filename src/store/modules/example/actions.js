import * as types from '../types';

export function buttonClickedRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

export function buttonClickedSuccess() {
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}

export function buttonClickedFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}
