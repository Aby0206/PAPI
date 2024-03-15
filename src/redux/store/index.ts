// Store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducer/authSlice';
import contractorReducer from '../reducer/contractorSlice';
import { LoginApi } from '../services/LoginApi';
import { PeopleApi } from '../services/Peoples';
import { ProjectApi } from '../services/Project';
import { EmployeeDetailsApi } from '../services/EmployeeDetailsApi';
import { ContractorApi } from '../services/Contractors';
import { ZohoApi } from '../services/Zoho';
import { SkillApi } from '../services/Skill';
import { ProficiencyApi } from '../services/Proficiency';
import { ProjectStatusApi } from '../services/Project/status';
import { ProjectDomainApi } from '../services/Project/domain';
import {TechnologyStackApi} from '../services/Project/stack'
import { CurrencyApi } from '../services/Project/currency';
import { BusinessUnitApi } from '../services/Project/bu';
import { ProjectTypeApi } from '../services/Project/type';
import BillingType from 'src/components/People-Master/Billing-type';
import { BillingTypeApi } from '../services/Project/billing';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    contractor:contractorReducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [PeopleApi.reducerPath]: PeopleApi.reducer,
    [ProjectApi.reducerPath]: ProjectApi.reducer,
    [EmployeeDetailsApi.reducerPath]: EmployeeDetailsApi.reducer,
    [ContractorApi.reducerPath]: ContractorApi.reducer,
    [ZohoApi.reducerPath]: ZohoApi.reducer,
    [SkillApi.reducerPath]: SkillApi.reducer,
    [ProficiencyApi.reducerPath]: ProficiencyApi.reducer,
    [ProjectStatusApi.reducerPath]:ProjectStatusApi.reducer,
    [ProjectDomainApi.reducerPath]:ProjectDomainApi.reducer,
    [TechnologyStackApi.reducerPath]:TechnologyStackApi.reducer,
    [CurrencyApi.reducerPath]:CurrencyApi.reducer,
    [BusinessUnitApi.reducerPath]:BusinessUnitApi.reducer,
    [ProjectTypeApi.reducerPath]:ProjectTypeApi.reducer,
    [BillingTypeApi.reducerPath]:BillingTypeApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(LoginApi.middleware)
      .concat(PeopleApi.middleware)
      .concat(EmployeeDetailsApi.middleware)
      .concat(ContractorApi.middleware)
      .concat(ZohoApi.middleware)
      .concat(SkillApi.middleware)
      .concat(ProficiencyApi.middleware)
      .concat(ProjectStatusApi.middleware)
      .concat(ProjectDomainApi.middleware)
      .concat(TechnologyStackApi.middleware)
      .concat(CurrencyApi.middleware)
      .concat(BusinessUnitApi.middleware)
      .concat(ProjectTypeApi.middleware)
      .concat(BillingTypeApi.middleware)
      .concat(ProjectApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;