import DirectoryItem from '../directoryItem/DirectoryItem';
import './directory.scss';

const Directory = ({ categories }) => {
    return (
        <div className="directory-container">
            {categories.map((category) => {
                return <DirectoryItem key={category.id} {...category} />;
            })}
        </div>
    );
};

export default Directory;
