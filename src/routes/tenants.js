const express = require('express');
const router = express.Router();
const tenantsController = require('../controllers/tenantsController');

// Định nghĩa các route cho tenant
router.get('/', tenantsController.getAllTenants);           // GET /api/tenants
router.get('/:id', tenantsController.getTenantById);        // GET /api/tenants/:id
router.post('/', tenantsController.createTenant);           // POST /api/tenants
router.put('/:id', tenantsController.updateTenant);         // PUT /api/tenants/:id
router.delete('/:id', tenantsController.deleteTenant);      // DELETE /api/tenants/:id

module.exports = router;