import styled from 'styled-components'

export const Container = styled.main`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: space-between;
`
export const Wrapper = styled.main`
    padding: 2rem;
    flex: 1;

    @media (max-width: 920px) {
        padding: 1rem;
    }
`
export const TableActions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    gap: 8px;

    input {
        padding: 8px;
        max-width: 450px;
        width: 100%;
    }

    @media (max-width: 475px) {
        flex-direction: column-reverse;
    }
`
export const FieldContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;

    input:nth-child(2) {
        margin-left: 1rem;
    }

    [data-error='true'] {
        outline-color: red;
        border-color: red;
    }

    input {
        width: 100%;
        padding: 0.3rem;
    }

    textarea {
        width: 100%;
    }
`

export const IconButton = styled.button`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    border: none;
    background: none;
    justify-content: center;
    cursor: pointer;
    border-radius: 18px;

    &:hover {
        background: #f5f5f5;
    }
`

export const ButtonActions = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`

export const TableOverflow = styled.main`
    @media (max-width: 920px) {
        //width: 900px;
        overflow-x: scroll;
    }
`
