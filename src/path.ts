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
  products(catId: string) {
    return `/categories/${catId}/products`;
  },
  productCreate(catId: string) {
    return `/categories/${catId}/products/new`;
  },
  productShow(catId: string, prodId: string) {
    return `/categories/${catId}/products/${prodId}`;
  },
};

export default path;
