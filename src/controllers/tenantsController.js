const { prisma } = require('../prisma');

// Controller xử lý các thao tác CRUD cho bảng Tenants
const tenantsController = {
    // Lấy danh sách tất cả tenants
    getAllTenants: async (req, res) => {
        try {
            const tenants = await prisma.tenants.findMany();
            res.json(tenants);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy danh sách tenants' });
        }
    },

    // Lấy tenant theo ID
    getTenantById: async (req, res) => {
        try {
            const { id } = req.params;
            const tenant = await prisma.tenants.findUnique({
                where: { tenantid: parseInt(id) }
            });
            
            if (!tenant) {
                return res.status(404).json({ error: 'Không tìm thấy tenant' });
            }
            
            res.json(tenant);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy thông tin tenant' });
        }
    },

    // Tạo tenant mới
    createTenant: async (req, res) => {
        try {
            const { tenantname, domain, email, phone, address, status } = req.body;
            const newTenant = await prisma.tenants.create({
                data: {
                    tenantname,
                    domain,
                    email,
                    phone,
                    address,
                    status
                }
            });
            
            res.status(201).json(newTenant);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi tạo tenant mới' });
        }
    },

    // Cập nhật tenant
    updateTenant: async (req, res) => {
        try {
            const { id } = req.params;
            const { tenantname, domain, email, phone, address, status } = req.body;
            
            const updatedTenant = await prisma.tenants.update({
                where: { tenantid: parseInt(id) },
                data: {
                    tenantname,
                    domain,
                    email,
                    phone,
                    address,
                    status,
                    updatedat: new Date()
                }
            });
            
            res.json(updatedTenant);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật tenant' });
        }
    },

    // Xóa tenant
    deleteTenant: async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.tenants.delete({
                where: { tenantid: parseInt(id) }
            });
            
            res.json({ message: 'Đã xóa tenant thành công' });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa tenant' });
        }
    }
};

module.exports = tenantsController;