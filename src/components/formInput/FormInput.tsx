import { FC, InputHTMLAttributes } from 'react';
import { FromInputLabel, Group, Input } from './forminput.styles';

type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...props }) => {
    return (
        <Group>
            <Input {...props} />
            {label && (
                <FromInputLabel shrink={Boolean(typeof props.value === 'string' && props.value?.length)}>
                    {label}
                </FromInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
