<template>
  <h3 class="">Quản Lý Hàng Hóa</h3>

  <!-- Form Thêm / Sửa sản phẩm -->
  <form class="mb-3 p-3 border rounded shadow-sm bg-light">
    <div class="row g-2">
      <div class="col-md-4 d-flex flex-column align-items-center">
        <div class="image-preview-large border rounded mb-2">
          <img src="" alt="Product Preview" class="preview-large-img" />
        </div>
        <input type="file" id="fileUpload" class="d-none" />
        <label for="fileUpload" class="btn btn-outline-primary btn-sm mb-2">Chọn Hình</label>
      </div>

      <div class="col-md-8">
        <div class="mb-2">
          <label for="productName" class="form-label">Tên Sản Phẩm</label>
          <input type="text" class="form-control" id="productName" required />
        </div>
        <div class="mb-2">
          <label for="productPrice" class="form-label">Giá Sản Phẩm</label>
          <input type="number" class="form-control" id="productPrice" required min="0" />
        </div>
        <div class="mb-2">
          <label for="productCategory" class="form-label">Danh Mục</label>
          <input type="text" class="form-control" id="productCategory" required />
        </div>
        <div class="mb-2">
          <label for="productCategory" class="form-label">Size</label>

        </div>
        <div class="mb-2">
          <label for="productDescription" class="form-label">Mô Tả</label>
          <textarea class="form-control" id="productDescription"></textarea>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-2 gap-2">
      <button type="reset" class="btn btn-warning">Đặt Lại</button>
      <button type="submit" class="btn btn-primary">Thêm Sản Phẩm</button>
    </div>
  </form>

  <!-- Danh sách sản phẩm -->
  <div class="product-list">
    <h4 class="mb-3">Danh Sách Sản Phẩm</h4>
    <table class="table table-bordered text-center">
      <thead>
      <tr>
        <th>Hình</th>
        <th>Tên</th>
        <th>Mô Tả</th>
        <th>Giá</th>
        <th>Danh Mục</th>
        <th>Hành Động</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><img src="" class="table-img" /></td>
        <td>Tên Sản Phẩm</td>
        <td>Mô Tả</td>
        <td>Giá đ</td>
        <td>Danh Mục</td>
        <td>
          <button class="btn btn-sm btn-primary me-1">Sửa</button>
          <button class="btn btn-sm btn-danger">Xóa</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.image-preview-large {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  overflow: hidden;
}

.preview-large-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.table-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
<script setup lang="ts">
</script>