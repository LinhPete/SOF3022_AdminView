<template>
  <h3 class="text-center mb-4">Quản Lý Đăng Ký Người Dùng</h3>

  <!-- Component Form nhập thông tin người dùng -->
  <UserForm 
    :user="nguoiDungMoi" 
    @update="capNhatNguoiDung"
    @submit="themNguoiDung"
    @reset="datLaiForm"
  />

  <!-- Tìm kiếm Người Dùng -->
  <div class="mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="Tìm kiếm người dùng theo tên hoặc số điện thoại..."
      v-model="tuKhoaTimKiem"
    />
  </div>

  <!-- Component Bảng danh sách người dùng -->
  <UserList 
    :danhSachNguoiDung="danhSachNguoiDungLoc" 
    @editUser="chinhSuaNguoiDung"
    @deleteUser="xoaNguoiDung"
  />

  <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-outline-primary mx-1" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
        Trước
      </button>
      <span class="mx-2">Trang {{ currentPage }} / {{ totalPages }}</span>
      <button class="btn btn-outline-primary mx-1" @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">
        Sau
      </button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUsers } from "@/stores/UserStore";
import UserForm from "@/components/user/UserForm.vue";
import UserList from "@/components/user/UserList.vue";

const userStore = useUsers(); 

const nguoiDungMoi = ref({
  email: "",
  avatar: null,
});

const hinhAnhNguoiDung = ref(null);
const tuKhoaTimKiem = ref("");
const currentPage = ref(1);
const totalPages = ref(1);

// Lọc danh sách người dùng theo từ khóa tìm kiếm
const danhSachNguoiDungLoc = computed(() => {
  if (!tuKhoaTimKiem.value) {
    return userStore.users; 
  }
  return userStore.users.filter((nguoiDung) =>
    nguoiDung.email.toLowerCase().includes(tuKhoaTimKiem.value.toLowerCase())
  );
});

// Thêm người dùng mới vào store
const themNguoiDung = async (nguoiDung) => {
  const result = await userStore.createUsers(nguoiDung);
  if (result.success) {
    await userStore.getUsers(); // Cập nhật danh sách sau khi thêm
    datLaiForm();
  } else {
    alert(result.message);
  }
};

// Cập nhật thông tin người dùng trong store
const capNhatNguoiDung = (nguoiDung) => {

  const index = userStore.users.findIndex(u => u.id === nguoiDung.id);
  if (index !== -1) {
    userStore.users[index] = { ...nguoiDung };
  }
};

// Chỉnh sửa người dùng
const chinhSuaNguoiDung = (nguoiDung) => {
  nguoiDungMoi.value = { ...nguoiDung }; // Cập nhật người dùng vào form
};

// Xóa người dùng (cần thêm action `deleteUser` vào store)
const xoaNguoiDung = async (nguoiDung) => {
  await userStore.deleteUser(nguoiDung.id);
  await userStore.getUsers();
};

// Đặt lại form
const datLaiForm = () => {
  nguoiDungMoi.value = {
    tenNguoiDung: "",
    matKhau: "",
    email: "",
    soDienThoai: "",
    soDonHang: 0,
    tongSoTien: 0,
  };
  hinhAnhNguoiDung.value = null;
};

const changePage = async (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    await loadUser();
  }
};

const loadUser = async () => {
  const success = await userStore.getUsers(currentPage.value);
  if (success) {
    totalPages.value = userStore.totalPages;
  }
};

// Lấy danh sách người dùng từ store
onMounted(async () => {
  await loadUser();
});

</script>
