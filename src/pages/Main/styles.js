import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${({ theme }) => theme.border_input};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    background-color: ${({ theme }) => theme.background_input};
    color: ${({ theme }) => theme.text_input};

    &::placeholder {
      color: ${({ theme }) => theme.placeholder_input};
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(260deg);
  }
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: 'submit',
  disabled: props.disabled,
}))`
  background: ${({ theme }) => theme.button_input_background};
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.text_color};

    & + li {
      border-top: 1px solid ${({ theme }) => theme.border_color_list};
    }

    a {
      color: ${({ theme }) => theme.link_color};
      text-decoration: none;
    }
  }
`;
