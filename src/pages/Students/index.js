import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { StudentContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

export default function Students() {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get('/alunos');
      setAlunos(response.data);
    }

    getData();
  }, []);

  return (
    <Container>
      <h1>Students</h1>
      <StudentContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Photos[0].url', false) ? (
                <img src={aluno.Photos[0].url} alt={`Foto de ${aluno.nome}`} />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={'/student/${aluno.id}/edit'}>
              <FaEdit size={16} />
            </Link>
            <Link to={'/student/${aluno.id}/delete'}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
