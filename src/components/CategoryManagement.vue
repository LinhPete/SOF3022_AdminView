<script setup>
import { ref, onMounted, computed } from "vue";
import { useCategories } from "@/stores/CategoryStore";

const categoryStore = useCategories();
const categoryName = ref("");
const searchQuery = ref("");
const message = ref("");
const messageType = ref("");
const editingCategoryId = ref(null);

const currentPage = ref(1);
const totalPages = ref(1);

onMounted(async () => {
  await loadCategories();
});

const changePage = async (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    await loadCategories();
  }
};

const loadCategories = async () => {
  const success = await categoryStore.retrieveCategories(currentPage.value);
  if (success) {
    totalPages.value = categoryStore.totalPages;
  }
};

const getCategory = async () => {
  if (!searchQuery.value.trim()) {
    await loadCategories(); // Nếu rỗng, load lại danh sách
    return;
  }

  const categoryId = parseInt(searchQuery.value);
  if (isNaN(categoryId)) {
    message.value = "Vui lòng nhập ID hợp lệ!";
    messageType.value = "danger";
    return;
  }

  const category = await categoryStore.getCategoryById(categoryId);
  if (category) {
    categoryStore.categories = [category]; // Hiển thị chỉ danh mục tìm được
  } else {
    message.value = "Không tìm thấy danh mục!";
    messageType.value = "danger";
  }

  setTimeout(() => (message.value = ""), 3000);
};



const addCategory = async () => {
  if (categoryName.value.trim() === "") return;

  const data = categoryName.value;
  let success;

  if (editingCategoryId.value) {
    console.log("Dữ liệu gửi đi:", data);
    success = await categoryStore.updateCategory(editingCategoryId.value, data);
    if (success) {
      message.value = "Cập nhật danh mục thành công!";
    } else {
      message.value = "Lỗi khi cập nhật danh mục!";
    }
  } else {
    success = await categoryStore.createCategories(data);
    if (success) {
      message.value = "Thêm danh mục thành công!";
    } else {
      message.value = "Lỗi khi thêm danh mục!";
    }
  }

  messageType.value = success ? "success" : "danger";
  await loadCategories(); // Load lại danh sách sau khi cập nhật/thêm
  categoryName.value = "";
  editingCategoryId.value = null;
  setTimeout(() => (message.value = ""), 3000);
};


const editCategory = async (categoryId) => {
  editingCategoryId.value = categoryId; // Đúng ra chỉ cần ID
  console.log(editingCategoryId.value);
  const categoryFinded = await categoryStore.getCategoryById(categoryId);

  if (categoryFinded) {
    categoryName.value = categoryFinded.name; // Hiển thị lên input
  }
};

</script>

<template>
  <h3 class="">Quản Lý Danh Mục</h3>

  <div v-if="message" :class="`alert alert-${messageType}`" role="alert">
    {{ message }}
  </div>

  <!-- Tìm kiếm danh mục theo ID -->
  <div class="mb-3 d-flex gap-2">
    <input v-model="searchQuery" type="text" class="form-control" placeholder="Nhập ID danh mục..." />
    <button class="btn btn-primary" @click="getCategory">Tìm theo ID</button>
    <button type="reset" class="btn btn-secondary" @click="searchQuery = ''; getCategory()">Đặt Lại</button>
  </div>


  <!-- Form Thêm / Sửa danh mục -->
  <form class="mb-3 p-3 border rounded shadow-sm bg-light" @submit.prevent="addCategory">
    <div class="mb-2">
      <label for="categoryName" class="form-label">Tên Danh Mục</label>
      <input v-model="categoryName" type="text" class="form-control" id="categoryName" required />
    </div>
    <div class="d-flex justify-content-end mt-2 gap-2">
      <button type="reset" class="btn btn-warning" @click="categoryName = ''; editingCategoryId = null">Đặt Lại</button>
      <button type="submit" class="btn btn-primary">
        {{ editingCategoryId ? 'Cập Nhật' : 'Thêm Danh Mục' }}
      </button>
    </div>
  </form>

  <!-- Danh sách danh mục -->
  <div class="category-list">
    <h4 class="mb-3">Danh Sách Danh Mục</h4>
    <table class="table table-bordered text-center">
      <thead>
      <tr>
        <th>ID</th>
        <th>Tên</th>
        <th>Hành Động</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categoryStore.categories" :key="category.id">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td>
          <button class="btn btn-sm btn-primary me-1" @click="editCategory(category.id)">Sửa</button>
          <button class="btn btn-sm btn-danger">Xóa</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Phân trang -->
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-outline-primary mx-1" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        Trước
      </button>
      <span class="mx-2">Trang {{ currentPage }} / {{ totalPages }}</span>
      <button class="btn btn-outline-primary mx-1" @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">
        Sau
      </button>
    </div>

  </div>

</template>

<style>
.category-list {
  margin-top: 20px;
}
</style>
