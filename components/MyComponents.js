import styled from 'styled-components';

const MyStyledComponent = styled.div`
  color: ${(props) => props.theme.text};
`;

const MyComponent = () => {
  return <MyStyledComponent>محتوى المكون</MyStyledComponent>;
};

export default MyComponent;