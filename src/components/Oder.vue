<template>
    <h3>Quản lý Đơn Hàng</h3>
    <!-- Form Thêm đơn hàng mới -->
    <form class="mb-4">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="orderId" class="form-label">Mã Đơn Hàng</label>
                <input type="text" class="form-control" id="orderId" placeholder="Nhập mã đơn hàng">
            </div>
            <div class="col-md-6 mb-3">
                <label for="customerName" class="form-label">Tên Khách Hàng</label>
                <input type="text" class="form-control" id="customerName" placeholder="Nhập tên khách hàng">
            </div>
            <div class="col-md-6 mb-3">
                <label for="orderTotal" class="form-label">Tổng Tiền</label>
                <input type="text" class="form-control" id="orderTotal" placeholder="Nhập tổng tiền">
            </div>
            <div class="col-md-6 mb-3">
                <label for="orderDate" class="form-label">Ngày Đặt Hàng</label>
                <input type="datetime-local" class="form-control" id="orderDate">
            </div>
            <div class="col-md-6 mb-3">
                <label for="orderStatus" class="form-label">Trạng Thái Đơn Hàng</label>
                <select class="form-control" id="orderStatus">
                    <option>Đang xử lý</option>
                    <option>Hoàn thành</option>
                    <option>Đã hủy</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="paymentStatus" class="form-label">Trạng Thái Thanh Toán</label>
                <select class="form-control" id="paymentStatus">
                    <option>Chưa thanh toán</option>
                    <option>Đã thanh toán</option>
                </select>
            </div>
            <div class="col-md-6 mb-3">
                <label for="deliveryStatus" class="form-label">Trạng Thái Giao Hàng</label>
                <select class="form-control" id="deliveryStatus">
                    <option>Chưa giao</option>
                    <option>Đã giao</option>
                    <option>Giao thành công</option>
                </select>
            </div>
        </div>
        <button type="button" class="btn btn-primary me-2">Tạo Đơn Hàng</button>
        <button type="submit" class="btn btn-success me-2">Cập nhật Đơn Hàng</button>
        <button type="submit" class="btn btn-danger me-2">Xóa Đơn Hàng</button>
        <button type="button" class="btn btn-warning me-2">Reset Form</button>
        <button type="button" class="btn btn-dark">Load Bảng</button>
    </form>
    
    <!-- Danh sách đơn hàng -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Mã Đơn Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Tổng Tiền</th>
                <th>Ngày Đặt Hàng</th>
                <th>Trạng Thái</th>
                <th>Trạng Thái Thanh Toán</th>
                <th>Trạng Thái Giao Hàng</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <!-- Dữ liệu sẽ được đổ từ server -->
            <tr>
                <td>001</td>
                <td>Nguyễn Văn A</td>
                <td>$200</td>
                <td>2025-02-12 14:30</td>
                <td>Đang xử lý</td>
                <td>Đã thanh toán</td>
                <td>Chưa giao</td>
                <td>
                    <button class="btn btn-warning btn-sm">Edit</button>
                </td>
            </tr>
            <tr>
                <td>002</td>
                <td>Trần Thị B</td>
                <td>$500</td>
                <td>2025-02-11 10:15</td>
                <td>Hoàn thành</td>
                <td>Đã thanh toán</td>
                <td>Giao thành công</td>
                <td>
                    <button class="btn btn-warning btn-sm">Edit</button>
                </td>
            </tr>
        </tbody>
    </table>
    <nav aria-label="Page navigation example">
        <ul class="pagination" id="pageOrder">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>
</template>