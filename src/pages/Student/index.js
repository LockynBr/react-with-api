import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import history from '../../services/history';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [photo, setPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Photo = get(data, 'Photos[0].url', '');

        setPhoto(Photo);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.errors', []);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErros = false;

    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error('Name must be between 3 and 255 characters');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErros = true;
      toast.error('Surname must be between 3 and 255 characters');
    }

    if (!isEmail(email)) {
      formErros = true;
      toast.error('Invalid email');
    }

    if (!isInt(String(idade))) {
      formErros = true;
      toast.error('Invalid age');
    }

    if (!isFloat(String(peso))) {
      formErros = true;
      toast.error('Invalid weight');
    }

    if (!isFloat(String(altura))) {
      formErros = true;
      toast.error('Invalid height');
    }

    if (formErros) return;

    try {
      setIsLoading(true);
      if (id) {
        // Editando
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Student edited successfully!');
      } else {
        // Criando
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Student created successfully!');
        history.push(`/student/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Unknown error');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Edit student' : 'New student'}</Title>

      {id && (
        <ProfilePicture>
          {photo ? <img src={photo} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <label htmlFor="Name">
          Name:
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
            placeholder="Name"
          />
        </label>

        <label htmlFor="Surname">
          Surname:
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => {
              setSobrenome(e.target.value);
            }}
            placeholder="Surname"
          />
        </label>

        <label htmlFor="Email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail"
          />
        </label>

        <label htmlFor="Age">
          Age:
          <input
            type="number"
            value={idade}
            onChange={(e) => {
              setIdade(e.target.value);
            }}
            placeholder="Age"
          />
        </label>

        <label htmlFor="Weight">
          Weight:
          <input
            type="text"
            value={peso}
            onChange={(e) => {
              setPeso(e.target.value);
            }}
            placeholder="Weight"
          />
        </label>

        <label htmlFor="Height">
          Height:
          <input
            type="text"
            value={altura}
            onChange={(e) => {
              setAltura(e.target.value);
            }}
            placeholder="Height"
          />
        </label>

        <button type="submit">{id ? 'Save' : 'Create'}</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
