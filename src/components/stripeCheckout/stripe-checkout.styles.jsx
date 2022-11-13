import styled from 'styled-components';
import CustomBtn from '../customBtn/CustomBtn';

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px;
`;

export const PaymentButton = styled(CustomBtn)`
    margin-left: auto;
    margin-top: 30px;
`;
