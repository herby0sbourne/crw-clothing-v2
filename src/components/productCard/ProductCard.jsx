import CustomBtn from '../customBtn/CustomBtn';

import './productcard.scss';

const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    return (
        <div className={'product-card-container'}>
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomBtn buttonType={'inverted'}>Add to cart</CustomBtn>
        </div>
    );
};

export default ProductCard;
