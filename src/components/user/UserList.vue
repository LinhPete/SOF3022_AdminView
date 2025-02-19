<template>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Người Dùng</th>
          <th>Email</th>
          <th>Số Điện Thoại</th>
          <th>Vai Trò</th>
          <!-- <th>Trạng Thái</th> -->
          <th>Số Đơn Hàng</th>
          <th>Số Tiền</th>
          <th>Hành Động</th>
          <th>Hình Ảnh</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(nguoiDung) in danhSachNguoiDungLoc"
          :key="nguoiDung.id"
        >
          <td>{{ nguoiDung.id }}</td>
          <td>{{ nguoiDung.fullname }}</td>
          <td>{{ nguoiDung.email }}</td>
          <td>{{ nguoiDung.phone }}</td>
          <td>Người Dùng</td>
          <!-- <td>
            <span :class="layLopStatus(nguoiDung.trangThai)">
              {{ nguoiDung.trangThai }}
            </span>
          </td> -->
          <td>{{ nguoiDung.soDonHang }}</td>
          <td>{{ nguoiDung.tongSoTien }} đ</td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="chinhSuaNguoiDung(nguoiDung)">
              Sửa
            </button>
            <button class="btn btn-danger btn-sm" @click="xoaNguoiDung(nguoiDung)">
              Xóa
            </button>
          </td>
          <td>
            <img
              :src="nguoiDung.avatar"
              alt="Hình Ảnh Người Dùng"
              class="img-thumbnail"
              style="width: 50px; height: 50px"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, computed } from "vue";
  
  // Nhận danh sách người dùng từ component cha
  const props = defineProps({
    danhSachNguoiDung: Array, // Danh sách người dùng truyền vào từ cha
  });
  
  // Emit để gửi dữ liệu về component cha
  const emit = defineEmits(["editUser", "deleteUser"]);
  
  // Lọc danh sách người dùng nếu cần
  const danhSachNguoiDungLoc = computed(() => {
    return props.danhSachNguoiDung || [];
  });
  
  // Xử lý khi nhấn "Sửa"
  const chinhSuaNguoiDung = (nguoiDung) => {
    emit("editUser", nguoiDung);
  };
  
  // Xử lý khi nhấn "Xóa"
  const xoaNguoiDung = (nguoiDung) => {
    emit("deleteUser", nguoiDung.id);
  };
  
  // Định dạng class cho trạng thái
//   const layLopStatus = (trangThai) => {
//     return trangThai === "Hoạt động" ? "text-success" : "text-danger";
//   };
  </script>
  
  <style scoped>
  .text-success {
    color: green;
    font-weight: bold;
  }
  .text-danger {
    color: red;
    font-weight: bold;
  }
  </style>
  