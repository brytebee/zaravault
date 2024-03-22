export const path = {
  home() {
    return "/";
  },
  categories() {
    return "/categories";
  },
  categoryCreate() {
    return "/categories/new";
  },
  categoryShow(catName: string) {
    return `/categories/${catName}`;
  },
  products(catName: string) {
    return `/categories/${catName}/products`;
  },
  productCreate(catName: string) {
    return `/categories/${catName}/products/new`;
  },
  productShow(catName: string, prodId: string) {
    return `/categories/${catName}/products/${prodId}`;
  },
};

export default path;
