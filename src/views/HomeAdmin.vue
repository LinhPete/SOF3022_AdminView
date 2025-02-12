<template>

<div class="container-fluid">
    <div class="row">
        <!-- Vertical Sidebar -->
        <div class="col-md-2 bg-dark text-light vh-100 p-3 d-flex flex-column">
            <h5><span><i class="fa-solid fa-bars"></i></span> Admin Panel</h5>
            <h6><span><i class="fa-solid fa-user"></i></span> Xin chào: <span class="text-warning">Admin</span></h6>
            <nav class="nav flex-column nav-pills">
                <a class="nav-link active" data-bs-toggle="pill" href="#tab1"><span>
                        </span> Dashboard</a>
                <a class="nav-link" data-bs-toggle="pill" href="#tab2"><span>
                        </span> Đơn hàng</a>
                <a class="nav-link" data-bs-toggle="pill" href="#tab3"><span>
                        </span> Users</a>
                <a class="nav-link" data-bs-toggle="pill" href="#tab4"><span>
                        </span> Tồn kho</a>
                        <a class="nav-link" data-bs-toggle="pill" href="#tab5"><span>
                        </span> Map</a>
            </nav>
            <button class="btn btn-primary mt-auto"><span><i class="fa-solid fa-right-from-bracket"></i></span> Đăng
                xuất
            </button>
        </div>

        <!-- Content Area -->
        <div class="col-md-10 p-4 bg-dark bg-opacity-10">
            <div class="tab-content">
                <!-- Tab 1 Content -->
                <div class="tab-pane fade show active" id="tab1">
                    <Dashoard></Dashoard>
                </div>

                <!-- Tab 2 Content: Videos -->
                <div class="tab-pane fade" id="tab2">
                    <Oder></Oder>
                </div>

                <!-- Tab 3 Content: Users -->
                <div class="tab-pane fade" id="tab3">
                    <User></User>
                </div>

                <!-- Tab 4 Content: Tồn kho -->
                <div class="tab-pane fade" id="tab4">
                    <Inventory></Inventory>
                </div>

                 <!-- Tab 4 Content: Map -->
                <div class="tab-pane fade" id="tab5">
                    <!-- <Map></Map> -->
                </div>
               
            </div>
        </div>
    </div>
</div>




</template>

<script setup>
    import Dashoard from '@/components/Dashoard.vue';
    import Oder from '@/components/Oder.vue';
   import User from '@/components/User.vue'
   import Inventory from '@/components/Inventory.vue';
//    import Map from '@/components/Map.vue';
</script>

<style>

</style>