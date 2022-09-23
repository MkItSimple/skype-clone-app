import Image from 'next/image';
import React from 'react'

const ModalInfo = ({onClickFuntion}: {onClickFuntion?: () => void}) => {
  return (
    <Container onClick={onClickFuntion}>
        <div className="modal">
          <div className='gif__container'><Image src={"https://res.cloudinary.com/dcdwu2zss/image/upload/v1659673352/chat_app/zwd70hokrqjmbb48fho8.gif"} layout='fill' objectFit='cover' alt='' /></div>
          <h2>Not yet implemented.</h2>
        </div>
    </Container>
  )
}

export default ModalInfo
import styled from 'styled-components'; const Container = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;

    .modal {
        min-height: 400px;
        max-height: 500px;
        min-width: 400px;
        max-width: 500px;
        z-index: 10;
        color: var(--color600);
        background-color: white;;
        position: fixed;
        margin: 0 auto;
        border: 1px solid #e8e8e1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        padding-top: 2em;
    }

    .gif__container {
      height: 200px;
      width: 200px;
      position: relative;
    }

    h2 {
      color: var(--color500);
    }
`