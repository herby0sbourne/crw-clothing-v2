import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ title, imageUrl, route }) => {
    const navigate = useNavigate();
    return (
        <DirectoryItemContainer onClick={() => navigate(route)}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
