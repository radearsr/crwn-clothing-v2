import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../spinner/spinner.component";
import "./categories-preview.styles.scss";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? <Spinner /> :  (
        Object.keys(categoriesMap).map((title) => {
          const product = categoriesMap[title];
          return (
            <CategoryPreview title={title} key={title} products={product} />
          )
        }))
      }
    </Fragment>
  );
};

export default CategoriesPreview;
