import React, { useState, useEffect } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default function Main() {
  const [repo, setRepo] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    async function getRepositories() {
      const response = localStorage.getItem('repositories');
      setRepositories(JSON.parse(response));
    }
    getRepositories();
  }, []);

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.get(`/repos/${repo}`);

      const data = {
        name: response.data.full_name,
      };

      const repositoryExists = repositories.filter(
        (repository) => repository.name === data.name
      );
      if (repositoryExists.length === 0) {
        setRepositories([...repositories, data]);
        setRepo('');
        setLoading(false);
      } else {
        alert('Repository has already been added');
        setRepo('');
        setLoading(false);
      }
    } catch (err) {
      setRepo('');
      setLoading(false);
      alert('Repository not found.');
    }
  }

  function handleInputChange(value) {
    setRepo(value);
    if (value !== '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={repo}
          onChange={(e) => handleInputChange(e.target.value)}
        />

        <SubmitButton disabled={disabled} loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFFFFF" size={14} />
          ) : (
            <FaPlus color="#FFFFFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositories.map((repository) => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
