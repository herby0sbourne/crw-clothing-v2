import CategoryItem from '../categoryItem/CategoryItem';

const Directory = ({ categroies }) => {
  return (
    <div className="directory-container">
      {categroies.map((category) => {
        return <CategoryItem key={category.id} {...category} />;
      })}
    </div>
  );
};

export default Directory;
