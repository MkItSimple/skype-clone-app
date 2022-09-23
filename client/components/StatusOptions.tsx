import { useApp } from "../context/AppContext";
const StatusOptions = ({ options }: { options: string[] }) => {
  const { user, setUser } = useApp();
  const updateStatusHandler = async (status: string) => {
    try {
      const { data } = await updateStatusApi(status, user.token);
      const newUser = { ...user, status: data.newStatus };
      localStorage.setItem("userInfo", JSON.stringify(newUser));
      setUser(newUser);
      socket.emit("changing status", user._id, data.newStatus);
    } catch (error) {
      toast("Updating status failed!", {
        type: "error",
        position: "top-center", //
      });
    }
  };
  return (
    <OptionsContainer>
      {options.map((status, index) => (
        <>
          <div
            key={`${index}-${status}`}
            onClick={() => updateStatusHandler(status)}
            className="option"
          >
            {status}
          </div>
        </>
      ))}
    </OptionsContainer>
  );
};

export default StatusOptions;
import styled from "styled-components";
import { updateStatusApi } from "../api/auth";
import { socket } from "../utils/ws";
import { toast } from "react-toastify";
const OptionsContainer = styled.div`
  min-width: 200px;
  background-color: white;
  padding: 5px 0px;
  z-index: 20;
  border: 1px solid var(--color300);

  box-shadow: 2px 2px 3px 0px var(--color300);
  position: absolute;

  .option {
    font-size: 11px;
    padding: 0.3em 1em;
    &:hover {
      background-color: var(--color100);
    }
  }
`;
