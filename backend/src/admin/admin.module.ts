import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './repository/admin.repository';

export const adminModule = new DependencyModule();

adminModule.bind(TOKENS.adminController).toInstance(AdminController).inTransientScope();
adminModule.bind(TOKENS.adminService).toInstance(AdminService).inTransientScope();
adminModule.bind(TOKENS.adminRepository).toInstance(AdminRepository).inTransientScope();

injected(AdminController, TOKENS.loggerService, TOKENS.adminService);
injected(AdminService, TOKENS.adminRepository, TOKENS.loggerService);
injected(AdminRepository, TOKENS.ormService);
