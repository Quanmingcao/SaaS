const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma');
const { JWT_SECRET } = require('../middleware/auth');
const { validationResult } = require('express-validator');

const authController = {
    // Đăng nhập chung cho cả Super Admin và Tenant Admin
    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            // Thử tìm trong bảng SuperAdmin trước
            let user = await prisma.superAdmin.findUnique({ 
                where: { email } 
            });

            let isSuperAdmin = true;

            // Nếu không có trong SuperAdmin, tìm trong TenantAccounts (kèm tenant data)
            if (!user) {
                user = await prisma.tenantAccounts.findUnique({
                    where: { email },
                    include: { tenant: true }
                });
                isSuperAdmin = false;
            }

            if (!user) {
                return res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác' });
            }

            // Kiểm tra password
            const isMatch = await bcrypt.compare(password, user.passwordhash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Email hoặc mật khẩu không chính xác' });
            }

            // Tạo JWT token (bao gồm tenantid nếu là tenant account)
            const payload = isSuperAdmin
                ? { id: user.adminid, role: 'superadmin', email: user.email }
                : { id: user.accountid, role: 'admin', email: user.email, tenantid: user.tenantid };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

            // Trả về thông tin user (kèm tenant info nếu có)
            const responseUser = isSuperAdmin
                ? { id: user.adminid, username: user.username, email: user.email, role: 'superadmin' }
                : { id: user.accountid, username: user.username, email: user.email, role: user.role || 'admin', tenantid: user.tenantid, tenantname: user.tenant?.tenantname };

            res.json({ token, user: responseUser });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Lỗi server' });
        }
    },

    // Đăng ký tài khoản mới
    register: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, email, password, role = 'admin' } = req.body;

            // Kiểm tra email đã tồn tại
            const existingSuperAdmin = await prisma.superAdmin.findUnique({
                where: { email }
            });

            const existingTenantAdmin = await prisma.tenantAccounts.findUnique({
                where: { email }
            });

            if (existingSuperAdmin || existingTenantAdmin) {
                return res.status(400).json({ error: 'Email đã được sử dụng' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const passwordhash = await bcrypt.hash(password, salt);

            let user;

            // Tạo tài khoản dựa vào role
            if (role === 'superadmin') {
                user = await prisma.superAdmin.create({
                    data: {
                        username,
                        email,
                        passwordhash,
                        role: 'superadmin'
                    }
                });
            } else {
                // Tạo một tenant mới cho tenant admin
                const tenant = await prisma.tenants.create({
                    data: {
                        tenantname: `${username}'s Tenant`,
                        email: email,
                        status: 'active'
                    }
                });

                user = await prisma.tenantAccounts.create({
                    data: {
                        tenantid: tenant.tenantid,
                        username,
                        email,
                        passwordhash,
                        role: 'admin'
                    }
                });
            }

            res.status(201).json({
                message: 'Đăng ký thành công',
                user: {
                    id: role === 'superadmin' ? user.adminid : user.accountid,
                    username: user.username,
                    email: user.email,
                    role: role
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Lỗi khi tạo tài khoản' });
        }
    }
};

module.exports = authController;