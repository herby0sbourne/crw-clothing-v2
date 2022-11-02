import CategoryItem from '../categoryItem/CategoryItem';
import './directory.scss';

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} {...category} />;
      })}
    </div>
  );
};

export default Directory;
