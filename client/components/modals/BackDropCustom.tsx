const BackDropCustom = ({
  onClickFuntion,
}: {
  onClickFuntion?: () => void;
}) => {
  return <BackDropContainer onClick={onClickFuntion}></BackDropContainer>;
};

export default BackDropCustom;
import styled from "styled-components";
import { BackDropMixins } from "../../public/GlobalStyles";
const BackDropContainer = styled.div`
  ${BackDropMixins}
`;
