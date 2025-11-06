const { prisma } = require('../prisma');

const plansController = {
    // Lấy danh sách tất cả plans
    getAllPlans: async (req, res) => {
        try {
            const plans = await prisma.plans.findMany({
                include: {
                    subscriptions: true
                }
            });
            res.json(plans);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy danh sách plans' });
        }
    },

    // Lấy plan theo ID
    getPlanById: async (req, res) => {
        try {
            const { id } = req.params;
            const plan = await prisma.plans.findUnique({
                where: { planid: parseInt(id) },
                include: {
                    subscriptions: true
                }
            });
            
            if (!plan) {
                return res.status(404).json({ error: 'Không tìm thấy plan' });
            }
            
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lấy thông tin plan' });
        }
    },

    // Tạo plan mới
    createPlan: async (req, res) => {
        try {
            const { planname, description, price, durationmonths } = req.body;
            const newPlan = await prisma.plans.create({
                data: {
                    planname,
                    description,
                    price: parseFloat(price),
                    durationmonths: parseInt(durationmonths)
                }
            });
            
            res.status(201).json(newPlan);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi tạo plan mới' });
        }
    },

    // Cập nhật plan
    updatePlan: async (req, res) => {
        try {
            const { id } = req.params;
            const { planname, description, price, durationmonths } = req.body;
            
            const updatedPlan = await prisma.plans.update({
                where: { planid: parseInt(id) },
                data: {
                    planname,
                    description,
                    price: parseFloat(price),
                    durationmonths: parseInt(durationmonths),
                    updatedat: new Date()
                }
            });
            
            res.json(updatedPlan);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi cập nhật plan' });
        }
    },

    // Xóa plan
    deletePlan: async (req, res) => {
        try {
            const { id } = req.params;
            await prisma.plans.delete({
                where: { planid: parseInt(id) }
            });
            
            res.json({ message: 'Đã xóa plan thành công' });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi xóa plan' });
        }
    }
};

module.exports = plansController;