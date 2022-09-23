type PropType = {
  text: string;
  clickFunction?: () => void;
  handleFileInputChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
};

const Options = ({ options }: { options: PropType[] }) => {
  return (
    <OptionsContainer>
      {options.map((option, index) => (
        <>
          {option.text === "Upload Photo" ? (
            <label key={`o-${option}`} className="option">
              {option.text}
              <input
                type="file"
                multiple
                hidden
                accept="images/*"
                onChange={() => {}}
              />
            </label>
          ) : (
            <div
              key={`o-${option}`}
              className="option"
              onClick={option.clickFunction}
            >
              {option.text}
            </div>
          )}
        </>
      ))}
    </OptionsContainer>
  );
};

export default Options;
import styled from "styled-components";
const OptionsContainer = styled.div`
  min-width: 200px;
  background-color: white;
  padding: 5px 0px;
  z-index: 20;
  border: 1px solid var(--gray500);
  position: absolute;

  .option {
    font-size: 11px;
    padding: 0.3em 1em;
    &:hover {
      background-color: var(--color100);
      cursor: pointer;
    }
  }

  label {
    display: block;
    width: 100%;
  }
`;
