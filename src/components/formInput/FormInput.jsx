import { FromInputLabel, Group, Input } from './forminput.styles';

const FormInput = ({ label, ...props }) => {
    return (
        <Group>
            <Input {...props} />
            {label && <FromInputLabel shrink={props.value.length}>{label}</FromInputLabel>}
        </Group>
    );
};

export default FormInput;
