import * as types from '../types';

const initState = {
  botaoClicado: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('Requisição feita com sucesso!');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('Erro na requisição.');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('Estou fazendo a requisição.');
      return state;
    }

    default: {
      return state;
    }
  }
}
