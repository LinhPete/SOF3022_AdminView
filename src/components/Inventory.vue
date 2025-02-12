<template>
    <h3 class="">Quản Lý Hàng Hóa</h3>

    <!-- Form Thêm sản phẩm -->
    <form @submit.prevent="handleSubmit" class="mb-3 p-3 border rounded shadow-sm bg-light">
        <div class="row g-2">
            <!-- Khu vực xem trước ảnh bên trái -->
            <div class="col-md-4 d-flex flex-column align-items-center">
                <div class="image-preview-large border rounded mb-2">
                    <img :src="product.images.length > 0 ? product.images[0] : defaultImage" 
                        alt="Product Preview" class="preview-large-img" />
                </div>
                <input type="file" id="fileUpload" class="d-none" @change="handleFileUpload" multiple />
                <label for="fileUpload" class="btn btn-outline-primary btn-sm mb-2">Chọn Hình</label>

                <!-- Danh sách ảnh nhỏ -->
                <div class="image-list d-flex mt-1 mb-2">
                    <div v-for="(img, index) in product.images" :key="index" class="image-thumbnail">
                        <img :src="img" @click="setPreview(img)" />
                        <button type="button" class="btn-close" @click="removeImage(index)"></button>
                    </div>
                </div>
            </div>

            <div class="col-md-8">
                <div class="row g-2">
                    <div class="mb-2">
                        <label for="productName" class="form-label">Tên Sản Phẩm</label>
                        <input type="text" class="form-control" v-model.trim="product.name" id="productName" required />
                    </div>
                    <div class="mb-2">
                        <label for="productPrice" class="form-label">Giá Sản Phẩm</label>
                        <input type="number" class="form-control" v-model.number="product.price" id="productPrice" required min="0" />
                    </div>
                    <div class="mb-2">
                        <label for="productCategory" class="form-label">Danh Mục</label>
                        <select class="form-select" v-model="product.category" id="productCategory" required>
                            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label for="productStatus" class="form-label">Trạng Thái</label>
                        <select class="form-select" v-model="product.status" id="productStatus">
                            <option value="Còn hàng">Còn hàng</option>
                            <option value="Hết hàng">Hết hàng</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label for="productRestock" class="form-label">Nhập Hàng</label>
                        <select class="form-select" v-model="product.restock" id="productRestock">
                            <option value="Có">Đang nhập hàng</option>
                            <option value="Không">Không nhập hàng</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-end mt-2 gap-2">
            <button type="reset" class="btn btn-warning" @click="clearFields">Đặt Lại</button>
            <button type="submit" class="btn btn-primary">
                {{ editIndex === -1 ? "Thêm Sản Phẩm" : "Cập Nhật Sản Phẩm" }}
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct" v-if="editIndex !== -1">
                Xóa
            </button>
        </div>
    </form>

    <!-- Danh sách sản phẩm -->
    <div v-if="products.length" class="product-list">
        <h4 class="mb-3">Danh Sách Sản Phẩm</h4>
        <table class="table table-bordered text-center">
            <thead>
                <tr>
                    <th>Hình</th>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Danh Mục</th>
                    <th>Trạng Thái</th>
                    <th>Nhập Hàng</th>
                    <th>Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in products" :key="item.id">
                    <td><img :src="item.images[0] || defaultImage" class="table-img" /></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}đ</td>
                    <td>{{ item.category }}</td>
                    <td :class="getStatusClass(item.status)">{{ item.status }}</td>
                    <td :class="getRestockClass(item.restock)">{{ item.restock }}</td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" @click="editProduct(index)">Sửa</button>
                        <button class="btn btn-sm btn-danger" @click="deleteProduct(index)">Xóa</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from "vue";
import img1 from "@/assets/image/anh1.png";
const defaultImage = img1;

const products = ref([]);
const product = ref({
    id: null,
    name: "",
    price: 0,
    category: "",
    status: "Còn hàng",
    restock: "Có",
    images: [],
});
const editIndex = ref(-1);

// Sample categories
const categories = ref(["Electronics", "Clothing", "Home & Garden", "Sports", "Toys"]);

const handleSubmit = () => {
    if (!product.value.name || product.value.price <= 0 || !product.value.category) {
        alert("Vui lòng nhập thông tin hợp lệ!");
        return;
    }

    if (editIndex.value === -1) {
        products.value.push({ ...product.value, id: Date.now() });
    } else {
        products.value[editIndex.value] = { ...product.value };
        editIndex.value = -1;
    }
    clearFields();
};

const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    product.value.images = files.map(file => URL.createObjectURL(file));
};

const removeImage = (index) => {
    product.value.images.splice(index, 1);
};

const clearFields = () => {
    product.value = { id: null, name: "", price: 0, category: "", status: "Còn hàng", restock: "Có", images: [] };
    editIndex.value = -1;
};

const editProduct = (index) => {
    product.value = { ...products.value[index] };
    editIndex.value = index;
};

const deleteProduct = (index) => {
    products.value.splice(index, 1);
};

// Method to get status class
const getStatusClass = (status) => {
    return status === "Còn hàng" ? "text-success" : "text-danger";
};

// Method to get restock class
const getRestockClass = (restock) => {
    return restock === "Có" ? "text-warning" : "text-success";
};
</script>

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

.image-list {
    display: flex;
    gap: 5px;
    flex-wrap: wrap; /* Allow wrapping for thumbnails */
}

.image-thumbnail {
    position: relative;
    width: 50px;
    height: 50px;
}

.image-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
}

.btn-close {
    position: absolute;
    top: -5px;
    right: -5px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
}

.table-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

/* Color classes for status */
.text-success {
    color: green;
}

.text-danger {
    color: red;
}

.text-warning {
    color: orange;
}
</style>