<template>
    <!-- Form Thêm/Sửa Người Dùng -->
    <form @submit.prevent="emit('submit', user)" class="mb-4 p-3 border rounded shadow-sm bg-light">
        <div class="row">
            <!-- Cột 1: Thông tin cá nhân -->
            <div class="col-md-4">
                <label class="form-label">Tên Người Dùng</label>
                <input type="text" class="form-control mb-2" v-model="user.fullname" required />

                <label class="form-label">Số Điện Thoại</label>
                <input type="tel" class="form-control mb-2" v-model="user.phone" required />

                <label class="form-label">Email</label>
                <input type="email" class="form-control mb-2" v-model="user.email" required />
            </div>

            <!-- Cột 2: Hình ảnh -->
            <div class="col-md-4 text-center">
                <label class="form-label d-block">Hình Ảnh</label>
                <input type="file" id="hinhAnh" class="d-none" @change="xuLyHinhAnh" accept="image/*" />
                <label for="hinhAnh" class="btn btn-outline-primary btn-sm mb-2">Chọn Hình</label>
                <div class="image-preview " v-if="user.avatar">
                    <img :src="user.avatar" alt="Hình Ảnh Người Dùng" class="img-thumbnail" style="max-width: 150px;" />
                </div>
            </div>

            <!-- Cột 3: Thông tin đơn hàng -->
            <div class="col-md-4">
                <label class="form-label">Số Đơn Hàng Đã Mua</label>
                <input type="number" class="form-control mb-2" v-model.number="user.soDonHang" min="0" readonly />

                <label class="form-label">Số Tiền Đã Thanh Toán</label>
                <input type="number" class="form-control mb-2" v-model.number="user.tongSoTien" min="0" readonly />
            </div>
        </div>

        <!-- Nút hành động -->
        <div class="d-flex justify-content-center mt-3">
            <button type="submit" class="btn btn-primary me-2">Đăng Ký</button>
            <button type="button" class="btn btn-success me-2" @click="emit('update', user)">Cập Nhật</button>
            <button type="button" class="btn btn-danger me-2" @click="emit('delete', user.id)">Xóa</button>
            <button type="reset" class="btn btn-warning" @click="emit('reset')">Đặt Lại</button>
        </div>
    </form>
</template>

<script setup>
import { computed, ref } from "vue";

// Nhận props từ component cha
const props = defineProps({
    user: Object, // Đối tượng người dùng
});

// Khởi tạo dữ liệu của form từ props

// Nhận emit từ component cha
const emit = defineEmits([
    "submit",
    "update",
    "delete",
    "reset",
    "uploadAvatar",
]);

// Ảnh xem trước
const hinhAnhNguoiDung = computed(() => props.user.avatar);

// Xử lý hình ảnh tải lên
const xuLyHinhAnh = (event) => {
    const file = event.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append("avatar", file);

        // Gửi emit để xử lý upload ở component cha
        emit("uploadAvatar", props.user.id, formData);
    }
};

const submitForm = () => {
    emit("submit", { ...userData.value });
};
</script>

<style scoped>
.read-only-password {
    background-color: #f8f9fa;
}
</style>