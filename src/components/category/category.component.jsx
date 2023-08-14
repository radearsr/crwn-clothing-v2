import { useEffect, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import Spinner from "../spinner/spinner.component";
import "./category.styles.scss";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h1 className="category-title">{category.toUpperCase()}</h1>
      {isLoading ? <Spinner /> : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
      ) }
    </Fragment>
  )
};

export default Category;
