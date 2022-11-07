import './directory-item.scss';

const DirectoryItem = ({ id, title, imageUrl }) => {
    return (
        <div className="directory-item-container" key={id}>
            <div className="background-image" style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default DirectoryItem;
