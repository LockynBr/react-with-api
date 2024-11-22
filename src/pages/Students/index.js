import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { Container } from '../../styles/GlobalStyles';
import { StudentContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Students() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const newStudents = [...alunos];
      newStudents.splice(index, 1);
      setAlunos(newStudents);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.data.errors', 0);

      if (status === 401) {
        toast.error('Login required!');
      } else {
        toast.error('An error occurred while deleting student');
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Students</h1>
      <StudentContainer>
        {alunos.map((aluno, index) => (
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

            <Link to={`/student/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/student/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </StudentContainer>
    </Container>
  );
}
