/*
  Warnings:

  - A unique constraint covering the columns `[cartId,wishlistId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_wishlistId_key" ON "CartItem"("cartId", "wishlistId");
