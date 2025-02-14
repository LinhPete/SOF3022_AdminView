<template>
    <h3 class="text-center mb-4">Quản Lý Đăng Ký Người Dùng</h3>
  
    <!-- Form Thêm người dùng mới -->
    <form
      @submit.prevent="xuLyDangKy"
      class="mb-4 p-3 border rounded shadow-sm bg-light"
    >
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="tenNguoiDung" class="form-label">Tên Người Dùng</label>
          <input
            type="text"
            class="form-control"
            v-model="nguoiDungMoi.tenNguoiDung"
            required
          />
          <label for="soDienThoai" class="form-label">Số Điện Thoại</label>
          <input
            type="tel"
            class="form-control"
            v-model="nguoiDungMoi.soDienThoai"
            required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label for="matKhau" class="form-label">Mật Khẩu</label>
          <input
            type="password"
            class="form-control"
            :class="{'read-only-password': !coTheChinhSuaMatKhau}" 
            :readonly="!coTheChinhSuaMatKhau"
            v-model="nguoiDungMoi.matKhau"
            required
          />
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="nguoiDungMoi.email"
            required
          />
        </div>
        <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
          <input
            type="file"
            id="hinhAnh" 
            class="d-none"
            @change="xuLyHinhAnh"
            accept="image/*"
          />
          <label for="hinhAnh" class="btn btn-outline-primary btn-sm mb-2"
            >Chọn Hình</label
          >
          <div class="image-preview border rounded" v-if="hinhAnhNguoiDung">
            <img :src="hinhAnhNguoiDung" alt="Hình Ảnh Người Dùng" class="img-thumbnail" />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="soDonHang" class="form-label">Số Đơn Hàng Đã Mua</label>
          <input
            type="number"
            class="form-control read-only-input"
            v-model.number="nguoiDungMoi.soDonHang"
            min="0"
          />
        </div>
        <div class="col-md-4">
          <label for="tongSoTien" class="form-label">Số Tiền Đã Thanh Toán</label>
          <input
            type="number"
            class="form-control read-only-input"
            v-model.number="nguoiDungMoi.tongSoTien"
            min="0"
          />
        </div>
      </div>
      <div class="d-flex justify-content-end mt-2">
        <button type="submit" class="btn btn-primary me-2">Đăng Ký</button>
        <button type="button" class="btn btn-success me-2" @click="chinhSuaNguoiDung">
          Cập Nhật
        </button>
        <button type="button" class="btn btn-danger me-2" @click="xoaNguoiDung">
          Xóa
        </button>
        <button type="reset" class="btn btn-warning" @click="datLaiForm">Đặt Lại</button>
      </div>
    </form>
  
    <!-- Tìm kiếm Người Dùng -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Tìm kiếm người dùng theo tên hoặc số điện thoại..."
        v-model="tuKhoaTimKiem"
      />
    </div>
  
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên Người Dùng</th>
          <th>Email</th>
          <th>Số Điện Thoại</th>
          <th>Vai Trò</th>
          <th>Trạng Thái</th>
          <th>Số Đơn Hàng</th>
          <th>Số Tiền</th>
          <th>Hành Động</th>
          <th>Hình Ảnh</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(nguoiDung, index) in danhSachNguoiDungLoc"
          :key="nguoiDung.id"
          @click="xemDonHang(nguoiDung)"
        >
          <td>{{ nguoiDung.id }}</td>
          <td>{{ nguoiDung.tenNguoiDung }}</td>
          <td>{{ nguoiDung.email }}</td>
          <td>{{ nguoiDung.soDienThoai }}</td>
          <td>Người Dùng</td>
          <td>
            <span :class="layLopStatus(nguoiDung.trangThai)"> {{ nguoiDung.trangThai }} </span>
          </td>
          <td>{{ nguoiDung.soDonHang }}</td>
          <td>{{ nguoiDung.tongSoTien }} đ</td>
          <td>
            <button
              class="btn btn-warning btn-sm me-2"
              @click.stop="chinhSuaNguoiDung(nguoiDung)"
            >
              Sửa
            </button>
            <button class="btn btn-danger btn-sm" @click.stop="xoaNguoiDung(nguoiDung)">
              Xóa
            </button>
          </td>
          <td>
            <img
              :src="nguoiDung.hinhAnh"
              alt="Hình Ảnh Người Dùng"
              class="img-thumbnail"
              style="width: 50px; height: 50px"
            />
          </td>
        </tr>
      </tbody>
    </table>
  
    <!-- Modal hiển thị đơn hàng -->
    <div
      v-if="nguoiDungDaChon"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Đơn Hàng của {{ nguoiDungDaChon.tenNguoiDung }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="nguoiDungDaChon = null"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Đơn hàng #</th>
                  <th>Số tiền</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Trạng thái giao hàng</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(donHang, index) in nguoiDungDaChon.donHangs" :key="index">
                  <td>{{ donHang.id }}</td>
                  <td>{{ donHang.soTien }} đ</td>
                  <td>
                    <span :class="layLopStatusDonHang(donHang.trangThaiThanhToan)">{{
                      donHang.trangThaiThanhToan
                    }}</span>
                  </td>
                  <td>
                    <span :class="layLopStatusDonHang(donHang.trangThaiGiaoHang)">{{
                      donHang.trangThaiGiaoHang
                    }}</span>
                  </td>
                  <td>
                    <button
                      class="btn btn-info btn-sm"
                      @click.stop="xemChiTietDonHang(donHang)"
                    >
                      Xem Chi Tiết
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="nguoiDungDaChon = null"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal cho chi tiết đơn hàng -->
    <div
      v-if="donHangDaChon"
      class="modal fade show"
      style="display: block; background: rgba(0, 0, 0, 0.5)"
      tabindex="-1"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi Tiết Đơn Hàng #{{ donHangDaChon.id }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="donHangDaChon = null"
            ></button>
          </div>
          <div class="modal-body">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th>Tổng số tiền</th>
                  <td>{{ donHangDaChon.soTien }} đ</td>
                </tr>
                <tr>
                  <th>Trạng thái thanh toán</th>
                  <td>
                    <span
                      :class="layLopStatusDonHang(donHangDaChon.trangThaiThanhToan)"
                      >{{ donHangDaChon.trangThaiThanhToan }}</span
                    >
                  </td>
                </tr>
                <tr>
                  <th>Trạng thái giao hàng</th>
                  <td>
                    <span
                      :class="layLopStatusDonHang(donHangDaChon.trangThaiGiaoHang)"
                      >{{ donHangDaChon.trangThaiGiaoHang }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
  
            <h6>Sản phẩm:</h6>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(matHang, indexMatHang) in donHangDaChon.matHangs"
                  :key="indexMatHang"
                >
                  <td>{{ matHang.ten }}</td>
                  <td>{{ matHang.gia }} đ</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="donHangDaChon = null"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from "vue";

// Khai báo các biến
const hinhAnhNguoiDung = ref(null); // Hình ảnh người dùng
const nguoiDungMoi = ref({
    tenNguoiDung: "",
    matKhau: "",
    email: "",
    soDienThoai: "",
    soDonHang: 0,
    tongSoTien: 0,
});
const danhSachNguoiDung = ref([]); // Danh sách người dùng
const nguoiDungDaChon = ref(null); // Người dùng đã chọn
const donHangDaChon = ref(null); // Đơn hàng đã chọn
const tuKhoaTimKiem = ref(""); // Từ khóa tìm kiếm

// Dữ liệu mẫu cho danh sách người dùng
danhSachNguoiDung.value = [
    {
        id: 1,
        tenNguoiDung: "john_doe",
        email: "john@example.com",
        soDienThoai: "0123456789",
        trangThai: "Member",
        soDonHang: 2,
        tongSoTien: 2500000,
        hinhAnh: "/src/assets/img/HinhDaiDien.png",
        donHangs: [
            {
                id: 1,
                soTien: 1000000,
                trangThaiThanhToan: "Đã thanh toán",
                trangThaiGiaoHang: "Đang giao",
                matHangs: [{ ten: "Áo thun", gia: 500000 }, { ten: "Quần jeans", gia: 500000 }]
            },
            {
                id: 2,
                soTien: 1500000,
                trangThaiThanhToan: "Đã thanh toán",
                trangThaiGiaoHang: "Đã giao thành công",
                matHangs: [{ ten: "Giày thể thao", gia: 1500000 }]
            },
        ],
    },
    // Thêm các người dùng khác...
];

// Hàm xử lý hình ảnh khi người dùng chọn
const xuLyHinhAnh = (event) => {
    const file = event.target.files[0];
    if (file) {
        hinhAnhNguoiDung.value = URL.createObjectURL(file);
    }
};
  
// Hàm xử lý khi người dùng đăng ký
const xuLyDangKy = () => {
    alert("Người dùng đã đăng ký thành công!");
    danhSachNguoiDung.value.push({
        id: danhSachNguoiDung.value.length + 1,
        tenNguoiDung: nguoiDungMoi.value.tenNguoiDung,
        email: nguoiDungMoi.value.email,
        soDienThoai: nguoiDungMoi.value.soDienThoai,
        trangThai: "Member",
        soDonHang: nguoiDungMoi.value.soDonHang,
        tongSoTien: nguoiDungMoi.value.tongSoTien,
        hinhAnh: hinhAnhNguoiDung.value || "/src/assets/img/HinhDaiDien.png",
        donHangs: [],
    });
    datLaiForm();
};

// Hàm đặt lại form
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
    coTheChinhSuaMatKhau.value = true; // Đặt lại trạng thái cho phép chỉnh sửa mật khẩu
};

// Lấy lớp trạng thái cho người dùng
const layLopStatus = (trangThai) => {
    switch (trangThai) {
        case "VIP":
            return "text-danger";
        case "Diamond":
            return "text-primary";
        case "Gold":
            return "text-warning";
        case "Silver":
            return "text-secondary";
        case "Member":
            return "text-success";
        default:
            return "";
    }
};

// Tính toán danh sách người dùng dựa trên từ khóa tìm kiếm
const danhSachNguoiDungLoc = computed(() => {
    return danhSachNguoiDung.value.filter(
        (nguoiDung) =>
            nguoiDung.tenNguoiDung.toLowerCase().includes(tuKhoaTimKiem.value.toLowerCase()) ||
            nguoiDung.email.toLowerCase().includes(tuKhoaTimKiem.value.toLowerCase()) ||
            nguoiDung.soDienThoai.includes(tuKhoaTimKiem.value)
    );
});

// Hàm xem đơn hàng của người dùng đã chọn
const xemDonHang = (nguoiDung) => {
    nguoiDungDaChon.value = nguoiDung;
};

// Biến kiểm soát khả năng chỉnh sửa mật khẩu
const coTheChinhSuaMatKhau = ref(true);

// Hàm chỉnh sửa thông tin người dùng
const chinhSuaNguoiDung = (nguoiDung) => {
    nguoiDungMoi.value = { ...nguoiDung }; // Điền dữ liệu vào form
    coTheChinhSuaMatKhau.value = false; // Không cho phép chỉnh sửa mật khẩu
};

// Hàm xóa người dùng
const xoaNguoiDung = (nguoiDung) => {
    danhSachNguoiDung.value = danhSachNguoiDung.value.filter((u) => u.id !== nguoiDung.id);
    if (nguoiDungDaChon.value && nguoiDungDaChon.value.id === nguoiDung.id) {
        nguoiDungDaChon.value = null; // Bỏ chọn nếu người dùng bị xóa
    }
};

// Lấy lớp trạng thái cho đơn hàng
const layLopStatusDonHang = (trangThai) => {
    switch (trangThai) {
        case "Đã thanh toán":
            return "text-success";
        case "Đang giao":
            return "text-warning";
        case "Đã giao thành công":
            return "text-primary";
        case "Đang chờ thanh toán":
            return "text-danger";
        default:
            return "";
    }
};

// Hàm xem chi tiết đơn hàng
const xemChiTietDonHang = (donHang) => {
    donHangDaChon.value = donHang;
};
</script>

<style>
.image-preview {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    overflow: hidden;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

.image-preview img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

.btn {
    margin-left: 5px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1050;
    overflow: hidden;
}

.read-only-input {
    background-color: #f0f0f0; /* Nền xám nhạt */
    color: #6c757d; /* Màu chữ tối */
}

.read-only-password {
    background-color: #e9ecef; /* Nền xám nhạt */
    color: #6c757d; /* Màu chữ tối */
}

.form-control {
    background-color: #ffffff; /* Nền trắng cho trạng thái bình thường */
    color: #212529; /* Màu chữ tối */
}
</style>