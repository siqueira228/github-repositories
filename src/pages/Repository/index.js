import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';

import { Owner, Loading, IssueList } from './styles';

export default function Repository(props) {
  // eslint-disable-next-line
  Repository.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepository() {
      const { match } = props;

      const repoName = decodeURIComponent(match.params.repository);

      // eslint-disable-next-line no-shadow
      const [repository, issues] = await Promise.all([
        await api.get(`repos/${repoName}`),
        await api.get(`repos/${repoName}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          },
        }),
      ]);

      setRepository(repository.data);
      setIssues(issues.data);
      setLoading(false);
    }
    getRepository();
  }, [props]);

  if (loading) {
    return (
      <Loading>
        <FaSpinner color="#FFFFFF" size={30} />
      </Loading>
    );
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login} />
        <h1>
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repository.name}
          </a>
        </h1>
        <p>{repository.description}</p>
      </Owner>

      <IssueList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {issue.title}
                </a>
                {issue.labels.map((label) => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>
  );
}
