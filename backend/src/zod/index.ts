import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','uuid','email','name','password','refresh_token','department_id','deleted','createdAt','updatedAt']);

export const DepartmentScalarFieldEnumSchema = z.enum(['id','name','deleted','createdAt','updatedAt']);

export const PermitScalarFieldEnumSchema = z.enum(['id','full_name','user_id','department_id','type','approved','reason','justification','valid_from','valid_until','deleted','createdAt','updatedAt']);

export const RoleScalarFieldEnumSchema = z.enum(['id','name','deleted','createdAt','updatedAt']);

export const UserRoleScalarFieldEnumSchema = z.enum(['id','user_id','role_id','deleted','createdAt','updatedAt']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','name','deleted','createdAt','updatedAt']);

export const RolePermissionScalarFieldEnumSchema = z.enum(['id','permission_id','role_id','deleted','createdAt','updatedAt']);

export const UserPermissionScalarFieldEnumSchema = z.enum(['id','user_id','permission_id','deleted','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['uuid','email','name','password','refresh_token']);

export const DepartmentOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const PermitOrderByRelevanceFieldEnumSchema = z.enum(['full_name','type','reason','justification']);

export const RoleOrderByRelevanceFieldEnumSchema = z.enum(['name']);

export const PermissionOrderByRelevanceFieldEnumSchema = z.enum(['name']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  uuid: z.string().uuid(),
  email: z.string(),
  name: z.string().nullable(),
  password: z.string(),
  refresh_token: z.string().nullable(),
  department_id: z.number().int(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// DEPARTMENT SCHEMA
/////////////////////////////////////////

export const DepartmentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Department = z.infer<typeof DepartmentSchema>

/////////////////////////////////////////
// PERMIT SCHEMA
/////////////////////////////////////////

export const PermitSchema = z.object({
  id: z.number().int(),
  full_name: z.string(),
  user_id: z.number().int(),
  department_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().nullable(),
  reason: z.string().nullable(),
  justification: z.string().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permit = z.infer<typeof PermitSchema>

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// USER ROLE SCHEMA
/////////////////////////////////////////

export const UserRoleSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  role_id: z.number().int(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserRole = z.infer<typeof UserRoleSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// ROLE PERMISSION SCHEMA
/////////////////////////////////////////

export const RolePermissionSchema = z.object({
  id: z.number().int(),
  permission_id: z.number().int(),
  role_id: z.number().int(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type RolePermission = z.infer<typeof RolePermissionSchema>

/////////////////////////////////////////
// USER PERMISSION SCHEMA
/////////////////////////////////////////

export const UserPermissionSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  permission_id: z.number().int(),
  deleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type UserPermission = z.infer<typeof UserPermissionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  user_permissions: z.union([z.boolean(),z.lazy(() => UserPermissionFindManyArgsSchema)]).optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRoleFindManyArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  user_permissions: z.boolean().optional(),
  user_roles: z.boolean().optional(),
  permits: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  uuid: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  department_id: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user_permissions: z.union([z.boolean(),z.lazy(() => UserPermissionFindManyArgsSchema)]).optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRoleFindManyArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DEPARTMENT
//------------------------------------------------------

export const DepartmentIncludeSchema: z.ZodType<Prisma.DepartmentInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const DepartmentArgsSchema: z.ZodType<Prisma.DepartmentDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentSelectSchema).optional(),
  include: z.lazy(() => DepartmentIncludeSchema).optional(),
}).strict();

export const DepartmentCountOutputTypeArgsSchema: z.ZodType<Prisma.DepartmentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => DepartmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const DepartmentCountOutputTypeSelectSchema: z.ZodType<Prisma.DepartmentCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  permits: z.boolean().optional(),
}).strict();

export const DepartmentSelectSchema: z.ZodType<Prisma.DepartmentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  permits: z.union([z.boolean(),z.lazy(() => PermitFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PERMIT
//------------------------------------------------------

export const PermitIncludeSchema: z.ZodType<Prisma.PermitInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
}).strict()

export const PermitArgsSchema: z.ZodType<Prisma.PermitDefaultArgs> = z.object({
  select: z.lazy(() => PermitSelectSchema).optional(),
  include: z.lazy(() => PermitIncludeSchema).optional(),
}).strict();

export const PermitSelectSchema: z.ZodType<Prisma.PermitSelect> = z.object({
  id: z.boolean().optional(),
  full_name: z.boolean().optional(),
  user_id: z.boolean().optional(),
  department_id: z.boolean().optional(),
  type: z.boolean().optional(),
  approved: z.boolean().optional(),
  reason: z.boolean().optional(),
  justification: z.boolean().optional(),
  valid_from: z.boolean().optional(),
  valid_until: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => DepartmentArgsSchema)]).optional(),
}).strict()

// ROLE
//------------------------------------------------------

export const RoleIncludeSchema: z.ZodType<Prisma.RoleInclude> = z.object({
  user_roles: z.union([z.boolean(),z.lazy(() => UserRoleFindManyArgsSchema)]).optional(),
  role_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const RoleArgsSchema: z.ZodType<Prisma.RoleDefaultArgs> = z.object({
  select: z.lazy(() => RoleSelectSchema).optional(),
  include: z.lazy(() => RoleIncludeSchema).optional(),
}).strict();

export const RoleCountOutputTypeArgsSchema: z.ZodType<Prisma.RoleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => RoleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const RoleCountOutputTypeSelectSchema: z.ZodType<Prisma.RoleCountOutputTypeSelect> = z.object({
  user_roles: z.boolean().optional(),
  role_permissions: z.boolean().optional(),
}).strict();

export const RoleSelectSchema: z.ZodType<Prisma.RoleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user_roles: z.union([z.boolean(),z.lazy(() => UserRoleFindManyArgsSchema)]).optional(),
  role_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RoleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER ROLE
//------------------------------------------------------

export const UserRoleIncludeSchema: z.ZodType<Prisma.UserRoleInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

export const UserRoleArgsSchema: z.ZodType<Prisma.UserRoleDefaultArgs> = z.object({
  select: z.lazy(() => UserRoleSelectSchema).optional(),
  include: z.lazy(() => UserRoleIncludeSchema).optional(),
}).strict();

export const UserRoleSelectSchema: z.ZodType<Prisma.UserRoleSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

// PERMISSION
//------------------------------------------------------

export const PermissionIncludeSchema: z.ZodType<Prisma.PermissionInclude> = z.object({
  user_permissions: z.union([z.boolean(),z.lazy(() => UserPermissionFindManyArgsSchema)]).optional(),
  role_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PermissionArgsSchema: z.ZodType<Prisma.PermissionDefaultArgs> = z.object({
  select: z.lazy(() => PermissionSelectSchema).optional(),
  include: z.lazy(() => PermissionIncludeSchema).optional(),
}).strict();

export const PermissionCountOutputTypeArgsSchema: z.ZodType<Prisma.PermissionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PermissionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PermissionCountOutputTypeSelectSchema: z.ZodType<Prisma.PermissionCountOutputTypeSelect> = z.object({
  user_permissions: z.boolean().optional(),
  role_permissions: z.boolean().optional(),
}).strict();

export const PermissionSelectSchema: z.ZodType<Prisma.PermissionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user_permissions: z.union([z.boolean(),z.lazy(() => UserPermissionFindManyArgsSchema)]).optional(),
  role_permissions: z.union([z.boolean(),z.lazy(() => RolePermissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PermissionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ROLE PERMISSION
//------------------------------------------------------

export const RolePermissionIncludeSchema: z.ZodType<Prisma.RolePermissionInclude> = z.object({
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

export const RolePermissionArgsSchema: z.ZodType<Prisma.RolePermissionDefaultArgs> = z.object({
  select: z.lazy(() => RolePermissionSelectSchema).optional(),
  include: z.lazy(() => RolePermissionIncludeSchema).optional(),
}).strict();

export const RolePermissionSelectSchema: z.ZodType<Prisma.RolePermissionSelect> = z.object({
  id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
  role: z.union([z.boolean(),z.lazy(() => RoleArgsSchema)]).optional(),
}).strict()

// USER PERMISSION
//------------------------------------------------------

export const UserPermissionIncludeSchema: z.ZodType<Prisma.UserPermissionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()

export const UserPermissionArgsSchema: z.ZodType<Prisma.UserPermissionDefaultArgs> = z.object({
  select: z.lazy(() => UserPermissionSelectSchema).optional(),
  include: z.lazy(() => UserPermissionIncludeSchema).optional(),
}).strict();

export const UserPermissionSelectSchema: z.ZodType<Prisma.UserPermissionSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  permission_id: z.boolean().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  permission: z.union([z.boolean(),z.lazy(() => PermissionArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_permissions: z.lazy(() => UserPermissionListRelationFilterSchema).optional(),
  user_roles: z.lazy(() => UserRoleListRelationFilterSchema).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user_permissions: z.lazy(() => UserPermissionOrderByRelationAggregateInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleOrderByRelationAggregateInputSchema).optional(),
  department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  permits: z.lazy(() => PermitOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    uuid: z.string().uuid(),
    email: z.string()
  }),
  z.object({
    id: z.number().int(),
    uuid: z.string().uuid(),
  }),
  z.object({
    id: z.number().int(),
    email: z.string(),
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    uuid: z.string().uuid(),
    email: z.string(),
  }),
  z.object({
    uuid: z.string().uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_permissions: z.lazy(() => UserPermissionListRelationFilterSchema).optional(),
  user_roles: z.lazy(() => UserRoleListRelationFilterSchema).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  department_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DepartmentWhereInputSchema: z.ZodType<Prisma.DepartmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional()
}).strict();

export const DepartmentOrderByWithRelationInputSchema: z.ZodType<Prisma.DepartmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  permits: z.lazy(() => PermitOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => DepartmentOrderByRelevanceInputSchema).optional()
}).strict();

export const DepartmentWhereUniqueInputSchema: z.ZodType<Prisma.DepartmentWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentWhereInputSchema),z.lazy(() => DepartmentWhereInputSchema).array() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  permits: z.lazy(() => PermitListRelationFilterSchema).optional()
}).strict());

export const DepartmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.DepartmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DepartmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => DepartmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DepartmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DepartmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => DepartmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const DepartmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DepartmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema),z.lazy(() => DepartmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermitWhereInputSchema: z.ZodType<Prisma.PermitWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  full_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approved: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  reason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  justification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  valid_from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  valid_until: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
}).strict();

export const PermitOrderByWithRelationInputSchema: z.ZodType<Prisma.PermitOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  approved: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  justification: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  valid_from: z.lazy(() => SortOrderSchema).optional(),
  valid_until: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  department: z.lazy(() => DepartmentOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => PermitOrderByRelevanceInputSchema).optional()
}).strict();

export const PermitWhereUniqueInputSchema: z.ZodType<Prisma.PermitWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitWhereInputSchema),z.lazy(() => PermitWhereInputSchema).array() ]).optional(),
  full_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approved: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  reason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  justification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  valid_from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  valid_until: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  department: z.union([ z.lazy(() => DepartmentScalarRelationFilterSchema),z.lazy(() => DepartmentWhereInputSchema) ]).optional(),
}).strict());

export const PermitOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermitOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  approved: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  reason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  justification: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  valid_from: z.lazy(() => SortOrderSchema).optional(),
  valid_until: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermitCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PermitAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermitMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermitMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PermitSumOrderByAggregateInputSchema).optional()
}).strict();

export const PermitScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermitScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermitScalarWhereWithAggregatesInputSchema),z.lazy(() => PermitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitScalarWhereWithAggregatesInputSchema),z.lazy(() => PermitScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  full_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  department_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  approved: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  reason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  justification: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  valid_from: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  valid_until: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RoleWhereInputSchema: z.ZodType<Prisma.RoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_roles: z.lazy(() => UserRoleListRelationFilterSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict();

export const RoleOrderByWithRelationInputSchema: z.ZodType<Prisma.RoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user_roles: z.lazy(() => UserRoleOrderByRelationAggregateInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => RoleOrderByRelevanceInputSchema).optional()
}).strict();

export const RoleWhereUniqueInputSchema: z.ZodType<Prisma.RoleWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleWhereInputSchema),z.lazy(() => RoleWhereInputSchema).array() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_roles: z.lazy(() => UserRoleListRelationFilterSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict());

export const RoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.RoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RoleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RoleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RoleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RoleSumOrderByAggregateInputSchema).optional()
}).strict();

export const RoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RoleScalarWhereWithAggregatesInputSchema),z.lazy(() => RoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserRoleWhereInputSchema: z.ZodType<Prisma.UserRoleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserRoleWhereInputSchema),z.lazy(() => UserRoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRoleWhereInputSchema),z.lazy(() => UserRoleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict();

export const UserRoleOrderByWithRelationInputSchema: z.ZodType<Prisma.UserRoleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional()
}).strict();

export const UserRoleWhereUniqueInputSchema: z.ZodType<Prisma.UserRoleWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserRoleWhereInputSchema),z.lazy(() => UserRoleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRoleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRoleWhereInputSchema),z.lazy(() => UserRoleWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict());

export const UserRoleOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserRoleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserRoleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserRoleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserRoleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserRoleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserRoleSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserRoleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserRoleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserRoleScalarWhereWithAggregatesInputSchema),z.lazy(() => UserRoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRoleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRoleScalarWhereWithAggregatesInputSchema),z.lazy(() => UserRoleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermissionWhereInputSchema: z.ZodType<Prisma.PermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_permissions: z.lazy(() => UserPermissionListRelationFilterSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict();

export const PermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.PermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user_permissions: z.lazy(() => UserPermissionOrderByRelationAggregateInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => PermissionOrderByRelevanceInputSchema).optional()
}).strict();

export const PermissionWhereUniqueInputSchema: z.ZodType<Prisma.PermissionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionWhereInputSchema),z.lazy(() => PermissionWhereInputSchema).array() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user_permissions: z.lazy(() => UserPermissionListRelationFilterSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionListRelationFilterSchema).optional()
}).strict());

export const PermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.PermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PermissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PermissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PermissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PermissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const PermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => PermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const RolePermissionWhereInputSchema: z.ZodType<Prisma.RolePermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict();

export const RolePermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.RolePermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional(),
  role: z.lazy(() => RoleOrderByWithRelationInputSchema).optional()
}).strict();

export const RolePermissionWhereUniqueInputSchema: z.ZodType<Prisma.RolePermissionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionWhereInputSchema),z.lazy(() => RolePermissionWhereInputSchema).array() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleScalarRelationFilterSchema),z.lazy(() => RoleWhereInputSchema) ]).optional(),
}).strict());

export const RolePermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.RolePermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RolePermissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RolePermissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RolePermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RolePermissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RolePermissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const RolePermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RolePermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => RolePermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserPermissionWhereInputSchema: z.ZodType<Prisma.UserPermissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPermissionWhereInputSchema),z.lazy(() => UserPermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPermissionWhereInputSchema),z.lazy(() => UserPermissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict();

export const UserPermissionOrderByWithRelationInputSchema: z.ZodType<Prisma.UserPermissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  permission: z.lazy(() => PermissionOrderByWithRelationInputSchema).optional()
}).strict();

export const UserPermissionWhereUniqueInputSchema: z.ZodType<Prisma.UserPermissionWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserPermissionWhereInputSchema),z.lazy(() => UserPermissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPermissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPermissionWhereInputSchema),z.lazy(() => UserPermissionWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  permission: z.union([ z.lazy(() => PermissionScalarRelationFilterSchema),z.lazy(() => PermissionWhereInputSchema) ]).optional(),
}).strict());

export const UserPermissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserPermissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserPermissionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserPermissionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserPermissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserPermissionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserPermissionSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserPermissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserPermissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserPermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPermissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPermissionScalarWhereWithAggregatesInputSchema),z.lazy(() => UserPermissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleCreateNestedManyWithoutUserInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutUsersInputSchema),
  permits: z.lazy(() => PermitCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  department_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUpdateManyWithoutUserNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  department_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentCreateInputSchema: z.ZodType<Prisma.DepartmentCreateInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutDepartmentInputSchema).optional(),
  permits: z.lazy(() => PermitCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUpdateInputSchema: z.ZodType<Prisma.DepartmentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentCreateManyInputSchema: z.ZodType<Prisma.DepartmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const DepartmentUpdateManyMutationInputSchema: z.ZodType<Prisma.DepartmentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DepartmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitCreateInputSchema: z.ZodType<Prisma.PermitCreateInput> = z.object({
  full_name: z.string(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPermitsInputSchema),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPermitsInputSchema)
}).strict();

export const PermitUncheckedCreateInputSchema: z.ZodType<Prisma.PermitUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  full_name: z.string(),
  user_id: z.number().int(),
  department_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitUpdateInputSchema: z.ZodType<Prisma.PermitUpdateInput> = z.object({
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPermitsNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPermitsNestedInputSchema).optional()
}).strict();

export const PermitUncheckedUpdateInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitCreateManyInputSchema: z.ZodType<Prisma.PermitCreateManyInput> = z.object({
  id: z.number().int().optional(),
  full_name: z.string(),
  user_id: z.number().int(),
  department_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitUpdateManyMutationInputSchema: z.ZodType<Prisma.PermitUpdateManyMutationInput> = z.object({
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleCreateInputSchema: z.ZodType<Prisma.RoleCreateInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_roles: z.lazy(() => UserRoleCreateNestedManyWithoutRoleInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateInputSchema: z.ZodType<Prisma.RoleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_roles: z.lazy(() => UserRoleUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUpdateInputSchema: z.ZodType<Prisma.RoleUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRoleUpdateManyWithoutRoleNestedInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleCreateManyInputSchema: z.ZodType<Prisma.RoleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RoleUpdateManyMutationInputSchema: z.ZodType<Prisma.RoleUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleCreateInputSchema: z.ZodType<Prisma.UserRoleCreateInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_rolesInputSchema),
  role: z.lazy(() => RoleCreateNestedOneWithoutUser_rolesInputSchema)
}).strict();

export const UserRoleUncheckedCreateInputSchema: z.ZodType<Prisma.UserRoleUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRoleUpdateInputSchema: z.ZodType<Prisma.UserRoleUpdateInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional()
}).strict();

export const UserRoleUncheckedUpdateInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleCreateManyInputSchema: z.ZodType<Prisma.UserRoleCreateManyInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRoleUpdateManyMutationInputSchema: z.ZodType<Prisma.UserRoleUpdateManyMutationInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionCreateInputSchema: z.ZodType<Prisma.PermissionCreateInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionCreateNestedManyWithoutPermissionInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedCreateNestedManyWithoutPermissionInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUpdateInputSchema: z.ZodType<Prisma.PermissionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUpdateManyWithoutPermissionNestedInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionCreateManyInputSchema: z.ZodType<Prisma.PermissionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.PermissionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionCreateInputSchema: z.ZodType<Prisma.RolePermissionCreateInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRole_permissionsInputSchema),
  role: z.lazy(() => RoleCreateNestedOneWithoutRole_permissionsInputSchema)
}).strict();

export const RolePermissionUncheckedCreateInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  permission_id: z.number().int(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionUpdateInputSchema: z.ZodType<Prisma.RolePermissionUpdateInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRole_permissionsNestedInputSchema).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutRole_permissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionCreateManyInputSchema: z.ZodType<Prisma.RolePermissionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  permission_id: z.number().int(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyMutationInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPermissionCreateInputSchema: z.ZodType<Prisma.UserPermissionCreateInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_permissionsInputSchema),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutUser_permissionsInputSchema)
}).strict();

export const UserPermissionUncheckedCreateInputSchema: z.ZodType<Prisma.UserPermissionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  permission_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPermissionUpdateInputSchema: z.ZodType<Prisma.UserPermissionUpdateInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_permissionsNestedInputSchema).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutUser_permissionsNestedInputSchema).optional()
}).strict();

export const UserPermissionUncheckedUpdateInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPermissionCreateManyInputSchema: z.ZodType<Prisma.UserPermissionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  permission_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPermissionUpdateManyMutationInputSchema: z.ZodType<Prisma.UserPermissionUpdateManyMutationInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPermissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserPermissionListRelationFilterSchema: z.ZodType<Prisma.UserPermissionListRelationFilter> = z.object({
  every: z.lazy(() => UserPermissionWhereInputSchema).optional(),
  some: z.lazy(() => UserPermissionWhereInputSchema).optional(),
  none: z.lazy(() => UserPermissionWhereInputSchema).optional()
}).strict();

export const UserRoleListRelationFilterSchema: z.ZodType<Prisma.UserRoleListRelationFilter> = z.object({
  every: z.lazy(() => UserRoleWhereInputSchema).optional(),
  some: z.lazy(() => UserRoleWhereInputSchema).optional(),
  none: z.lazy(() => UserRoleWhereInputSchema).optional()
}).strict();

export const DepartmentScalarRelationFilterSchema: z.ZodType<Prisma.DepartmentScalarRelationFilter> = z.object({
  is: z.lazy(() => DepartmentWhereInputSchema).optional(),
  isNot: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const PermitListRelationFilterSchema: z.ZodType<Prisma.PermitListRelationFilter> = z.object({
  every: z.lazy(() => PermitWhereInputSchema).optional(),
  some: z.lazy(() => PermitWhereInputSchema).optional(),
  none: z.lazy(() => PermitWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const UserPermissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserPermissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRoleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserRoleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PermitOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  uuid: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentOrderByRelevanceInputSchema: z.ZodType<Prisma.DepartmentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => DepartmentOrderByRelevanceFieldEnumSchema),z.lazy(() => DepartmentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const DepartmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DepartmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.DepartmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PermitOrderByRelevanceInputSchema: z.ZodType<Prisma.PermitOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => PermitOrderByRelevanceFieldEnumSchema),z.lazy(() => PermitOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const PermitCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermitCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  justification: z.lazy(() => SortOrderSchema).optional(),
  valid_from: z.lazy(() => SortOrderSchema).optional(),
  valid_until: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PermitAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermitMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  justification: z.lazy(() => SortOrderSchema).optional(),
  valid_from: z.lazy(() => SortOrderSchema).optional(),
  valid_until: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermitMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  approved: z.lazy(() => SortOrderSchema).optional(),
  reason: z.lazy(() => SortOrderSchema).optional(),
  justification: z.lazy(() => SortOrderSchema).optional(),
  valid_from: z.lazy(() => SortOrderSchema).optional(),
  valid_until: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermitSumOrderByAggregateInputSchema: z.ZodType<Prisma.PermitSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const RolePermissionListRelationFilterSchema: z.ZodType<Prisma.RolePermissionListRelationFilter> = z.object({
  every: z.lazy(() => RolePermissionWhereInputSchema).optional(),
  some: z.lazy(() => RolePermissionWhereInputSchema).optional(),
  none: z.lazy(() => RolePermissionWhereInputSchema).optional()
}).strict();

export const RolePermissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RolePermissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleOrderByRelevanceInputSchema: z.ZodType<Prisma.RoleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => RoleOrderByRelevanceFieldEnumSchema),z.lazy(() => RoleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const RoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.RoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RoleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.RoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleSumOrderByAggregateInputSchema: z.ZodType<Prisma.RoleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RoleScalarRelationFilterSchema: z.ZodType<Prisma.RoleScalarRelationFilter> = z.object({
  is: z.lazy(() => RoleWhereInputSchema).optional(),
  isNot: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const UserRoleCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserRoleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRoleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserRoleAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRoleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserRoleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRoleMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserRoleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRoleSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserRoleSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionOrderByRelevanceInputSchema: z.ZodType<Prisma.PermissionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => PermissionOrderByRelevanceFieldEnumSchema),z.lazy(() => PermissionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const PermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.PermissionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PermissionScalarRelationFilterSchema: z.ZodType<Prisma.PermissionScalarRelationFilter> = z.object({
  is: z.lazy(() => PermissionWhereInputSchema).optional(),
  isNot: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const RolePermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RolePermissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.RolePermissionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPermissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserPermissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPermissionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserPermissionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPermissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserPermissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPermissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserPermissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPermissionSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserPermissionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  permission_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserPermissionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutUserInputSchema),z.lazy(() => UserPermissionCreateWithoutUserInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRoleCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserRoleCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutUserInputSchema),z.lazy(() => UserRoleCreateWithoutUserInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DepartmentCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const PermitCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PermitCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutUserInputSchema),z.lazy(() => PermitCreateWithoutUserInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema),z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPermissionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutUserInputSchema),z.lazy(() => UserPermissionCreateWithoutUserInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRoleUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutUserInputSchema),z.lazy(() => UserRoleCreateWithoutUserInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PermitUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutUserInputSchema),z.lazy(() => PermitCreateWithoutUserInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema),z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserPermissionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserPermissionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutUserInputSchema),z.lazy(() => UserPermissionCreateWithoutUserInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPermissionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserPermissionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPermissionScalarWhereInputSchema),z.lazy(() => UserPermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRoleUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserRoleUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutUserInputSchema),z.lazy(() => UserRoleCreateWithoutUserInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRoleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserRoleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRoleScalarWhereInputSchema),z.lazy(() => UserRoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DepartmentUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => DepartmentUpdateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const PermitUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PermitUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutUserInputSchema),z.lazy(() => PermitCreateWithoutUserInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema),z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserPermissionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutUserInputSchema),z.lazy(() => UserPermissionCreateWithoutUserInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPermissionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserPermissionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPermissionScalarWhereInputSchema),z.lazy(() => UserPermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRoleUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutUserInputSchema),z.lazy(() => UserRoleCreateWithoutUserInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRoleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserRoleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRoleScalarWhereInputSchema),z.lazy(() => UserRoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutUserInputSchema),z.lazy(() => PermitCreateWithoutUserInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema),z.lazy(() => PermitCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDepartmentInputSchema),z.lazy(() => UserCreateWithoutDepartmentInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermitCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutDepartmentInputSchema),z.lazy(() => PermitCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDepartmentInputSchema),z.lazy(() => UserCreateWithoutDepartmentInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutDepartmentInputSchema),z.lazy(() => PermitCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDepartmentInputSchema),z.lazy(() => UserCreateWithoutDepartmentInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermitUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.PermitUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutDepartmentInputSchema),z.lazy(() => PermitCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDepartmentInputSchema),z.lazy(() => UserCreateWithoutDepartmentInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => UserCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermitCreateWithoutDepartmentInputSchema),z.lazy(() => PermitCreateWithoutDepartmentInputSchema).array(),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => PermitCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PermitUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PermitUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PermitCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PermitWhereUniqueInputSchema),z.lazy(() => PermitWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PermitUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => PermitUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PermitUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => PermitUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPermitsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPermitsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DepartmentCreateNestedOneWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentCreateNestedOneWithoutPermitsInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutPermitsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPermitsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPermitsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPermitsInputSchema),z.lazy(() => UserUpdateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermitsInputSchema) ]).optional(),
}).strict();

export const DepartmentUpdateOneRequiredWithoutPermitsNestedInputSchema: z.ZodType<Prisma.DepartmentUpdateOneRequiredWithoutPermitsNestedInput> = z.object({
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPermitsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => DepartmentCreateOrConnectWithoutPermitsInputSchema).optional(),
  upsert: z.lazy(() => DepartmentUpsertWithoutPermitsInputSchema).optional(),
  connect: z.lazy(() => DepartmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => DepartmentUpdateToOneWithWhereWithoutPermitsInputSchema),z.lazy(() => DepartmentUpdateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPermitsInputSchema) ]).optional(),
}).strict();

export const UserRoleCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutRoleInputSchema),z.lazy(() => UserRoleCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRoleUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutRoleInputSchema),z.lazy(() => UserRoleCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserRoleUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserRoleUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutRoleInputSchema),z.lazy(() => UserRoleCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRoleUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserRoleUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRoleScalarWhereInputSchema),z.lazy(() => UserRoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserRoleUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserRoleCreateWithoutRoleInputSchema),z.lazy(() => UserRoleCreateWithoutRoleInputSchema).array(),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => UserRoleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRoleUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserRoleCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserRoleWhereUniqueInputSchema),z.lazy(() => UserRoleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => UserRoleUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserRoleUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => UserRoleUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserRoleScalarWhereInputSchema),z.lazy(() => UserRoleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateWithoutRoleInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUser_rolesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const RoleCreateNestedOneWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutUser_rolesInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUser_rolesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUser_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUser_rolesInputSchema),z.lazy(() => UserUpdateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_rolesInputSchema) ]).optional(),
}).strict();

export const RoleUpdateOneRequiredWithoutUser_rolesNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutUser_rolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutUser_rolesInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutUser_rolesInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutUser_rolesInputSchema),z.lazy(() => RoleUpdateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUser_rolesInputSchema) ]).optional(),
}).strict();

export const UserPermissionCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPermissionUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedCreateNestedManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateNestedManyWithoutPermissionInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserPermissionUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.UserPermissionUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPermissionUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => UserPermissionUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPermissionScalarWhereInputSchema),z.lazy(() => UserPermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserPermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => UserPermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UserPermissionUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserPermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserPermissionWhereUniqueInputSchema),z.lazy(() => UserPermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => UserPermissionUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserPermissionUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => UserPermissionUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserPermissionScalarWhereInputSchema),z.lazy(() => UserPermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutPermissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema).array(),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema),z.lazy(() => RolePermissionCreateOrConnectWithoutPermissionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RolePermissionCreateManyPermissionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RolePermissionWhereUniqueInputSchema),z.lazy(() => RolePermissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema),z.lazy(() => RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PermissionCreateNestedOneWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutRole_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRole_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRole_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const RoleCreateNestedOneWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleCreateNestedOneWithoutRole_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutRole_permissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional()
}).strict();

export const PermissionUpdateOneRequiredWithoutRole_permissionsNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutRole_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRole_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutRole_permissionsInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutRole_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUpdateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRole_permissionsInputSchema) ]).optional(),
}).strict();

export const RoleUpdateOneRequiredWithoutRole_permissionsNestedInputSchema: z.ZodType<Prisma.RoleUpdateOneRequiredWithoutRole_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => RoleCreateOrConnectWithoutRole_permissionsInputSchema).optional(),
  upsert: z.lazy(() => RoleUpsertWithoutRole_permissionsInputSchema).optional(),
  connect: z.lazy(() => RoleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => RoleUpdateToOneWithWhereWithoutRole_permissionsInputSchema),z.lazy(() => RoleUpdateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutRole_permissionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUser_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_permissionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PermissionCreateNestedOneWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateNestedOneWithoutUser_permissionsInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUser_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutUser_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUser_permissionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUser_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_permissionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUser_permissionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUser_permissionsInputSchema),z.lazy(() => UserUpdateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_permissionsInputSchema) ]).optional(),
}).strict();

export const PermissionUpdateOneRequiredWithoutUser_permissionsNestedInputSchema: z.ZodType<Prisma.PermissionUpdateOneRequiredWithoutUser_permissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PermissionCreateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUser_permissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PermissionCreateOrConnectWithoutUser_permissionsInputSchema).optional(),
  upsert: z.lazy(() => PermissionUpsertWithoutUser_permissionsInputSchema).optional(),
  connect: z.lazy(() => PermissionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PermissionUpdateToOneWithWhereWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUpdateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUser_permissionsInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const UserPermissionCreateWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionCreateWithoutUserInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutUser_permissionsInputSchema)
}).strict();

export const UserPermissionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  permission_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPermissionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserPermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserPermissionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserPermissionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserPermissionCreateManyUserInputSchema),z.lazy(() => UserPermissionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserRoleCreateWithoutUserInputSchema: z.ZodType<Prisma.UserRoleCreateWithoutUserInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutUser_rolesInputSchema)
}).strict();

export const UserRoleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRoleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserRoleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserRoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserRoleCreateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRoleCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserRoleCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserRoleCreateManyUserInputSchema),z.lazy(() => UserRoleCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DepartmentCreateWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutUsersInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutUsersInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const PermitCreateWithoutUserInputSchema: z.ZodType<Prisma.PermitCreateWithoutUserInput> = z.object({
  full_name: z.string(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutPermitsInputSchema)
}).strict();

export const PermitUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PermitUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  full_name: z.string(),
  department_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PermitCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermitCreateWithoutUserInputSchema),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PermitCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PermitCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermitCreateManyUserInputSchema),z.lazy(() => PermitCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserPermissionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserPermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserPermissionUpdateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserPermissionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserPermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserPermissionUpdateWithoutUserInputSchema),z.lazy(() => UserPermissionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserPermissionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserPermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserPermissionUpdateManyMutationInputSchema),z.lazy(() => UserPermissionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserPermissionScalarWhereInputSchema: z.ZodType<Prisma.UserPermissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserPermissionScalarWhereInputSchema),z.lazy(() => UserPermissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserPermissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserPermissionScalarWhereInputSchema),z.lazy(() => UserPermissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserRoleUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserRoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserRoleUpdateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserRoleCreateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserRoleUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserRoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserRoleUpdateWithoutUserInputSchema),z.lazy(() => UserRoleUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserRoleUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserRoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserRoleUpdateManyMutationInputSchema),z.lazy(() => UserRoleUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserRoleScalarWhereInputSchema: z.ZodType<Prisma.UserRoleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserRoleScalarWhereInputSchema),z.lazy(() => UserRoleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserRoleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserRoleScalarWhereInputSchema),z.lazy(() => UserRoleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const DepartmentUpsertWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => DepartmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutUsersInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const DepartmentUpdateWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutUsersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const PermitUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PermitUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermitUpdateWithoutUserInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => PermitCreateWithoutUserInputSchema),z.lazy(() => PermitUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const PermitUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PermitUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateWithoutUserInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const PermitUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PermitUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => PermitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateManyMutationInputSchema),z.lazy(() => PermitUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const PermitScalarWhereInputSchema: z.ZodType<Prisma.PermitScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PermitScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PermitScalarWhereInputSchema),z.lazy(() => PermitScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  full_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  approved: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  reason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  justification: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  valid_from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  valid_until: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.UserCreateWithoutDepartmentInput> = z.object({
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleCreateNestedManyWithoutUserInputSchema).optional(),
  permits: z.lazy(() => PermitCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDepartmentInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const UserCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyDepartmentInputSchema),z.lazy(() => UserCreateManyDepartmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PermitCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitCreateWithoutDepartmentInput> = z.object({
  full_name: z.string(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPermitsInputSchema)
}).strict();

export const PermitUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUncheckedCreateWithoutDepartmentInput> = z.object({
  id: z.number().int().optional(),
  full_name: z.string(),
  user_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermitCreateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const PermitCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.PermitCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PermitCreateManyDepartmentInputSchema),z.lazy(() => PermitCreateManyDepartmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutDepartmentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  uuid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PermitUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PermitUpdateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => PermitCreateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const PermitUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PermitWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateWithoutDepartmentInputSchema),z.lazy(() => PermitUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const PermitUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => PermitScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PermitUpdateManyMutationInputSchema),z.lazy(() => PermitUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const UserCreateWithoutPermitsInputSchema: z.ZodType<Prisma.UserCreateWithoutPermitsInput> = z.object({
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleCreateNestedManyWithoutUserInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const UserUncheckedCreateWithoutPermitsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPermitsInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  department_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPermitsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPermitsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]),
}).strict();

export const DepartmentCreateWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentCreateWithoutPermitsInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentUncheckedCreateWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentUncheckedCreateWithoutPermitsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const DepartmentCreateOrConnectWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentCreateOrConnectWithoutPermitsInput> = z.object({
  where: z.lazy(() => DepartmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPermitsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPermitsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPermitsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermitsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPermitsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPermitsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPermitsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPermitsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPermitsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPermitsInput> = z.object({
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUpdateManyWithoutUserNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPermitsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const DepartmentUpsertWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentUpsertWithoutPermitsInput> = z.object({
  update: z.union([ z.lazy(() => DepartmentUpdateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPermitsInputSchema) ]),
  create: z.union([ z.lazy(() => DepartmentCreateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedCreateWithoutPermitsInputSchema) ]),
  where: z.lazy(() => DepartmentWhereInputSchema).optional()
}).strict();

export const DepartmentUpdateToOneWithWhereWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentUpdateToOneWithWhereWithoutPermitsInput> = z.object({
  where: z.lazy(() => DepartmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => DepartmentUpdateWithoutPermitsInputSchema),z.lazy(() => DepartmentUncheckedUpdateWithoutPermitsInputSchema) ]),
}).strict();

export const DepartmentUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentUpdateWithoutPermitsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const DepartmentUncheckedUpdateWithoutPermitsInputSchema: z.ZodType<Prisma.DepartmentUncheckedUpdateWithoutPermitsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const UserRoleCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleCreateWithoutRoleInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_rolesInputSchema)
}).strict();

export const UserRoleUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUncheckedCreateWithoutRoleInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRoleCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserRoleCreateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserRoleCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.UserRoleCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserRoleCreateManyRoleInputSchema),z.lazy(() => UserRoleCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolePermissionCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateWithoutRoleInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  permission: z.lazy(() => PermissionCreateNestedOneWithoutRole_permissionsInputSchema)
}).strict();

export const RolePermissionUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateWithoutRoleInput> = z.object({
  id: z.number().int().optional(),
  permission_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionCreateManyRoleInputSchema),z.lazy(() => RolePermissionCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserRoleUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRoleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserRoleUpdateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => UserRoleCreateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const UserRoleUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRoleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserRoleUpdateWithoutRoleInputSchema),z.lazy(() => UserRoleUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const UserRoleUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => UserRoleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserRoleUpdateManyMutationInputSchema),z.lazy(() => UserRoleUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateWithoutRoleInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => RolePermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateManyMutationInputSchema),z.lazy(() => RolePermissionUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const RolePermissionScalarWhereInputSchema: z.ZodType<Prisma.RolePermissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RolePermissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RolePermissionScalarWhereInputSchema),z.lazy(() => RolePermissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  permission_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserCreateWithoutUser_rolesInput> = z.object({
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionCreateNestedManyWithoutUserInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutUsersInputSchema),
  permits: z.lazy(() => PermitCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUser_rolesInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  department_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]),
}).strict();

export const RoleCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleCreateWithoutUser_rolesInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role_permissions: z.lazy(() => RolePermissionCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutUser_rolesInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]),
}).strict();

export const UserUpsertWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUpsertWithoutUser_rolesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_rolesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUser_rolesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_rolesInputSchema) ]),
}).strict();

export const UserUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUpdateWithoutUser_rolesInput> = z.object({
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUpdateManyWithoutUserNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUser_rolesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const RoleUpsertWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUpsertWithoutUser_rolesInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUser_rolesInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedCreateWithoutUser_rolesInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutUser_rolesInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutUser_rolesInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutUser_rolesInputSchema) ]),
}).strict();

export const RoleUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUpdateWithoutUser_rolesInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutUser_rolesInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutUser_rolesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const UserPermissionCreateWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionCreateWithoutPermissionInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_permissionsInputSchema)
}).strict();

export const UserPermissionUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUncheckedCreateWithoutPermissionInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPermissionCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => UserPermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const UserPermissionCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.UserPermissionCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserPermissionCreateManyPermissionInputSchema),z.lazy(() => UserPermissionCreateManyPermissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const RolePermissionCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateWithoutPermissionInput> = z.object({
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role: z.lazy(() => RoleCreateNestedOneWithoutRole_permissionsInputSchema)
}).strict();

export const RolePermissionUncheckedCreateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedCreateWithoutPermissionInput> = z.object({
  id: z.number().int().optional(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionCreateOrConnectWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateOrConnectWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionCreateManyPermissionInputEnvelopeSchema: z.ZodType<Prisma.RolePermissionCreateManyPermissionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RolePermissionCreateManyPermissionInputSchema),z.lazy(() => RolePermissionCreateManyPermissionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserPermissionUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => UserPermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserPermissionUpdateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => UserPermissionCreateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const UserPermissionUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => UserPermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserPermissionUpdateWithoutPermissionInputSchema),z.lazy(() => UserPermissionUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const UserPermissionUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => UserPermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserPermissionUpdateManyMutationInputSchema),z.lazy(() => UserPermissionUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionUpsertWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpsertWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RolePermissionUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutPermissionInputSchema) ]),
  create: z.union([ z.lazy(() => RolePermissionCreateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedCreateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionUpdateWithWhereUniqueWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithWhereUniqueWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateWithoutPermissionInputSchema),z.lazy(() => RolePermissionUncheckedUpdateWithoutPermissionInputSchema) ]),
}).strict();

export const RolePermissionUpdateManyWithWhereWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpdateManyWithWhereWithoutPermissionInput> = z.object({
  where: z.lazy(() => RolePermissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RolePermissionUpdateManyMutationInputSchema),z.lazy(() => RolePermissionUncheckedUpdateManyWithoutPermissionInputSchema) ]),
}).strict();

export const PermissionCreateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateWithoutRole_permissionsInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutRole_permissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutRole_permissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRole_permissionsInputSchema) ]),
}).strict();

export const RoleCreateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleCreateWithoutRole_permissionsInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_roles: z.lazy(() => UserRoleCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleUncheckedCreateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUncheckedCreateWithoutRole_permissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_roles: z.lazy(() => UserRoleUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const RoleCreateOrConnectWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleCreateOrConnectWithoutRole_permissionsInput> = z.object({
  where: z.lazy(() => RoleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]),
}).strict();

export const PermissionUpsertWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutRole_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRole_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutRole_permissionsInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutRole_permissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutRole_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutRole_permissionsInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutRole_permissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutRole_permissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const RoleUpsertWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUpsertWithoutRole_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => RoleUpdateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutRole_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => RoleCreateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedCreateWithoutRole_permissionsInputSchema) ]),
  where: z.lazy(() => RoleWhereInputSchema).optional()
}).strict();

export const RoleUpdateToOneWithWhereWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUpdateToOneWithWhereWithoutRole_permissionsInput> = z.object({
  where: z.lazy(() => RoleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => RoleUpdateWithoutRole_permissionsInputSchema),z.lazy(() => RoleUncheckedUpdateWithoutRole_permissionsInputSchema) ]),
}).strict();

export const RoleUpdateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUpdateWithoutRole_permissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRoleUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const RoleUncheckedUpdateWithoutRole_permissionsInputSchema: z.ZodType<Prisma.RoleUncheckedUpdateWithoutRole_permissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserCreateWithoutUser_permissionsInput> = z.object({
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_roles: z.lazy(() => UserRoleCreateNestedManyWithoutUserInputSchema).optional(),
  department: z.lazy(() => DepartmentCreateNestedOneWithoutUsersInputSchema),
  permits: z.lazy(() => PermitCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUser_permissionsInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  department_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user_roles: z.lazy(() => UserRoleUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUser_permissionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_permissionsInputSchema) ]),
}).strict();

export const PermissionCreateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateWithoutUser_permissionsInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role_permissions: z.lazy(() => RolePermissionCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionUncheckedCreateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedCreateWithoutUser_permissionsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedCreateNestedManyWithoutPermissionInputSchema).optional()
}).strict();

export const PermissionCreateOrConnectWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionCreateOrConnectWithoutUser_permissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUser_permissionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUser_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_permissionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUser_permissionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUser_permissionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_permissionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUser_permissionsInput> = z.object({
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRoleUpdateManyWithoutUserNestedInputSchema).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUser_permissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const PermissionUpsertWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionUpsertWithoutUser_permissionsInput> = z.object({
  update: z.union([ z.lazy(() => PermissionUpdateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUser_permissionsInputSchema) ]),
  create: z.union([ z.lazy(() => PermissionCreateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedCreateWithoutUser_permissionsInputSchema) ]),
  where: z.lazy(() => PermissionWhereInputSchema).optional()
}).strict();

export const PermissionUpdateToOneWithWhereWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionUpdateToOneWithWhereWithoutUser_permissionsInput> = z.object({
  where: z.lazy(() => PermissionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PermissionUpdateWithoutUser_permissionsInputSchema),z.lazy(() => PermissionUncheckedUpdateWithoutUser_permissionsInputSchema) ]),
}).strict();

export const PermissionUpdateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionUpdateWithoutUser_permissionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const PermissionUncheckedUpdateWithoutUser_permissionsInputSchema: z.ZodType<Prisma.PermissionUncheckedUpdateWithoutUser_permissionsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role_permissions: z.lazy(() => RolePermissionUncheckedUpdateManyWithoutPermissionNestedInputSchema).optional()
}).strict();

export const UserPermissionCreateManyUserInputSchema: z.ZodType<Prisma.UserPermissionCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  permission_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRoleCreateManyUserInputSchema: z.ZodType<Prisma.UserRoleCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitCreateManyUserInputSchema: z.ZodType<Prisma.PermitCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  full_name: z.string(),
  department_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPermissionUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUpdateWithoutUserInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutUser_permissionsNestedInputSchema).optional()
}).strict();

export const UserPermissionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPermissionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUpdateWithoutUserInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional()
}).strict();

export const UserRoleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUpdateWithoutUserInputSchema: z.ZodType<Prisma.PermitUpdateWithoutUserInput> = z.object({
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.lazy(() => DepartmentUpdateOneRequiredWithoutPermitsNestedInputSchema).optional()
}).strict();

export const PermitUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyDepartmentInputSchema: z.ZodType<Prisma.UserCreateManyDepartmentInput> = z.object({
  id: z.number().int().optional(),
  uuid: z.string().uuid().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  refresh_token: z.string().optional().nullable(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PermitCreateManyDepartmentInputSchema: z.ZodType<Prisma.PermitCreateManyDepartmentInput> = z.object({
  id: z.number().int().optional(),
  full_name: z.string(),
  user_id: z.number().int(),
  type: z.string(),
  approved: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  justification: z.string().optional().nullable(),
  valid_from: z.coerce.date(),
  valid_until: z.coerce.date(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUpdateWithoutDepartmentInput> = z.object({
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUpdateManyWithoutUserNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user_permissions: z.lazy(() => UserPermissionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  user_roles: z.lazy(() => UserRoleUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  permits: z.lazy(() => PermitUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  uuid: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUpdateWithoutDepartmentInput> = z.object({
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPermitsNestedInputSchema).optional()
}).strict();

export const PermitUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PermitUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.PermitUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  approved: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  reason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  justification: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  valid_from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  valid_until: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleCreateManyRoleInputSchema: z.ZodType<Prisma.UserRoleCreateManyRoleInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionCreateManyRoleInputSchema: z.ZodType<Prisma.RolePermissionCreateManyRoleInput> = z.object({
  id: z.number().int().optional(),
  permission_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserRoleUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUpdateWithoutRoleInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_rolesNestedInputSchema).optional()
}).strict();

export const UserRoleUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserRoleUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.UserRoleUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithoutRoleInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permission: z.lazy(() => PermissionUpdateOneRequiredWithoutRole_permissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  permission_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPermissionCreateManyPermissionInputSchema: z.ZodType<Prisma.UserPermissionCreateManyPermissionInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const RolePermissionCreateManyPermissionInputSchema: z.ZodType<Prisma.RolePermissionCreateManyPermissionInput> = z.object({
  id: z.number().int().optional(),
  role_id: z.number().int(),
  deleted: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserPermissionUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUpdateWithoutPermissionInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_permissionsNestedInputSchema).optional()
}).strict();

export const UserPermissionUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateWithoutPermissionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserPermissionUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.UserPermissionUncheckedUpdateManyWithoutPermissionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUpdateWithoutPermissionInput> = z.object({
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => RoleUpdateOneRequiredWithoutRole_permissionsNestedInputSchema).optional()
}).strict();

export const RolePermissionUncheckedUpdateWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateWithoutPermissionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const RolePermissionUncheckedUpdateManyWithoutPermissionInputSchema: z.ZodType<Prisma.RolePermissionUncheckedUpdateManyWithoutPermissionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const DepartmentFindFirstArgsSchema: z.ZodType<Prisma.DepartmentFindFirstArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DepartmentFindFirstOrThrowArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentFindManyArgsSchema: z.ZodType<Prisma.DepartmentFindManyArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const DepartmentAggregateArgsSchema: z.ZodType<Prisma.DepartmentAggregateArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithRelationInputSchema.array(),DepartmentOrderByWithRelationInputSchema ]).optional(),
  cursor: DepartmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentGroupByArgsSchema: z.ZodType<Prisma.DepartmentGroupByArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  orderBy: z.union([ DepartmentOrderByWithAggregationInputSchema.array(),DepartmentOrderByWithAggregationInputSchema ]).optional(),
  by: DepartmentScalarFieldEnumSchema.array(),
  having: DepartmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const DepartmentFindUniqueArgsSchema: z.ZodType<Prisma.DepartmentFindUniqueArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DepartmentFindUniqueOrThrowArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const PermitFindFirstArgsSchema: z.ZodType<Prisma.PermitFindFirstArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermitScalarFieldEnumSchema,PermitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermitFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermitFindFirstOrThrowArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermitScalarFieldEnumSchema,PermitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermitFindManyArgsSchema: z.ZodType<Prisma.PermitFindManyArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermitScalarFieldEnumSchema,PermitScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermitAggregateArgsSchema: z.ZodType<Prisma.PermitAggregateArgs> = z.object({
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithRelationInputSchema.array(),PermitOrderByWithRelationInputSchema ]).optional(),
  cursor: PermitWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermitGroupByArgsSchema: z.ZodType<Prisma.PermitGroupByArgs> = z.object({
  where: PermitWhereInputSchema.optional(),
  orderBy: z.union([ PermitOrderByWithAggregationInputSchema.array(),PermitOrderByWithAggregationInputSchema ]).optional(),
  by: PermitScalarFieldEnumSchema.array(),
  having: PermitScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermitFindUniqueArgsSchema: z.ZodType<Prisma.PermitFindUniqueArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const PermitFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermitFindUniqueOrThrowArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const RoleFindFirstArgsSchema: z.ZodType<Prisma.RoleFindFirstArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RoleFindFirstOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleFindManyArgsSchema: z.ZodType<Prisma.RoleFindManyArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RoleScalarFieldEnumSchema,RoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RoleAggregateArgsSchema: z.ZodType<Prisma.RoleAggregateArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithRelationInputSchema.array(),RoleOrderByWithRelationInputSchema ]).optional(),
  cursor: RoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoleGroupByArgsSchema: z.ZodType<Prisma.RoleGroupByArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  orderBy: z.union([ RoleOrderByWithAggregationInputSchema.array(),RoleOrderByWithAggregationInputSchema ]).optional(),
  by: RoleScalarFieldEnumSchema.array(),
  having: RoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RoleFindUniqueArgsSchema: z.ZodType<Prisma.RoleFindUniqueArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RoleFindUniqueOrThrowArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const UserRoleFindFirstArgsSchema: z.ZodType<Prisma.UserRoleFindFirstArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereInputSchema.optional(),
  orderBy: z.union([ UserRoleOrderByWithRelationInputSchema.array(),UserRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRoleScalarFieldEnumSchema,UserRoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRoleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserRoleFindFirstOrThrowArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereInputSchema.optional(),
  orderBy: z.union([ UserRoleOrderByWithRelationInputSchema.array(),UserRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRoleScalarFieldEnumSchema,UserRoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRoleFindManyArgsSchema: z.ZodType<Prisma.UserRoleFindManyArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereInputSchema.optional(),
  orderBy: z.union([ UserRoleOrderByWithRelationInputSchema.array(),UserRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserRoleScalarFieldEnumSchema,UserRoleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserRoleAggregateArgsSchema: z.ZodType<Prisma.UserRoleAggregateArgs> = z.object({
  where: UserRoleWhereInputSchema.optional(),
  orderBy: z.union([ UserRoleOrderByWithRelationInputSchema.array(),UserRoleOrderByWithRelationInputSchema ]).optional(),
  cursor: UserRoleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserRoleGroupByArgsSchema: z.ZodType<Prisma.UserRoleGroupByArgs> = z.object({
  where: UserRoleWhereInputSchema.optional(),
  orderBy: z.union([ UserRoleOrderByWithAggregationInputSchema.array(),UserRoleOrderByWithAggregationInputSchema ]).optional(),
  by: UserRoleScalarFieldEnumSchema.array(),
  having: UserRoleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserRoleFindUniqueArgsSchema: z.ZodType<Prisma.UserRoleFindUniqueArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereUniqueInputSchema,
}).strict() ;

export const UserRoleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserRoleFindUniqueOrThrowArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindFirstArgsSchema: z.ZodType<Prisma.PermissionFindFirstArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindFirstOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionFindManyArgsSchema: z.ZodType<Prisma.PermissionFindManyArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PermissionScalarFieldEnumSchema,PermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PermissionAggregateArgsSchema: z.ZodType<Prisma.PermissionAggregateArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithRelationInputSchema.array(),PermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: PermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionGroupByArgsSchema: z.ZodType<Prisma.PermissionGroupByArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  orderBy: z.union([ PermissionOrderByWithAggregationInputSchema.array(),PermissionOrderByWithAggregationInputSchema ]).optional(),
  by: PermissionScalarFieldEnumSchema.array(),
  having: PermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PermissionFindUniqueArgsSchema: z.ZodType<Prisma.PermissionFindUniqueArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PermissionFindUniqueOrThrowArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionFindFirstArgsSchema: z.ZodType<Prisma.RolePermissionFindFirstArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionScalarFieldEnumSchema,RolePermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionFindFirstOrThrowArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionScalarFieldEnumSchema,RolePermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionFindManyArgsSchema: z.ZodType<Prisma.RolePermissionFindManyArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RolePermissionScalarFieldEnumSchema,RolePermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const RolePermissionAggregateArgsSchema: z.ZodType<Prisma.RolePermissionAggregateArgs> = z.object({
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithRelationInputSchema.array(),RolePermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: RolePermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionGroupByArgsSchema: z.ZodType<Prisma.RolePermissionGroupByArgs> = z.object({
  where: RolePermissionWhereInputSchema.optional(),
  orderBy: z.union([ RolePermissionOrderByWithAggregationInputSchema.array(),RolePermissionOrderByWithAggregationInputSchema ]).optional(),
  by: RolePermissionScalarFieldEnumSchema.array(),
  having: RolePermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const RolePermissionFindUniqueArgsSchema: z.ZodType<Prisma.RolePermissionFindUniqueArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RolePermissionFindUniqueOrThrowArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const UserPermissionFindFirstArgsSchema: z.ZodType<Prisma.UserPermissionFindFirstArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereInputSchema.optional(),
  orderBy: z.union([ UserPermissionOrderByWithRelationInputSchema.array(),UserPermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPermissionScalarFieldEnumSchema,UserPermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPermissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserPermissionFindFirstOrThrowArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereInputSchema.optional(),
  orderBy: z.union([ UserPermissionOrderByWithRelationInputSchema.array(),UserPermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPermissionScalarFieldEnumSchema,UserPermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPermissionFindManyArgsSchema: z.ZodType<Prisma.UserPermissionFindManyArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereInputSchema.optional(),
  orderBy: z.union([ UserPermissionOrderByWithRelationInputSchema.array(),UserPermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserPermissionScalarFieldEnumSchema,UserPermissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserPermissionAggregateArgsSchema: z.ZodType<Prisma.UserPermissionAggregateArgs> = z.object({
  where: UserPermissionWhereInputSchema.optional(),
  orderBy: z.union([ UserPermissionOrderByWithRelationInputSchema.array(),UserPermissionOrderByWithRelationInputSchema ]).optional(),
  cursor: UserPermissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPermissionGroupByArgsSchema: z.ZodType<Prisma.UserPermissionGroupByArgs> = z.object({
  where: UserPermissionWhereInputSchema.optional(),
  orderBy: z.union([ UserPermissionOrderByWithAggregationInputSchema.array(),UserPermissionOrderByWithAggregationInputSchema ]).optional(),
  by: UserPermissionScalarFieldEnumSchema.array(),
  having: UserPermissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserPermissionFindUniqueArgsSchema: z.ZodType<Prisma.UserPermissionFindUniqueArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereUniqueInputSchema,
}).strict() ;

export const UserPermissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserPermissionFindUniqueOrThrowArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentCreateArgsSchema: z.ZodType<Prisma.DepartmentCreateArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  data: z.union([ DepartmentCreateInputSchema,DepartmentUncheckedCreateInputSchema ]),
}).strict() ;

export const DepartmentUpsertArgsSchema: z.ZodType<Prisma.DepartmentUpsertArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
  create: z.union([ DepartmentCreateInputSchema,DepartmentUncheckedCreateInputSchema ]),
  update: z.union([ DepartmentUpdateInputSchema,DepartmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const DepartmentCreateManyArgsSchema: z.ZodType<Prisma.DepartmentCreateManyArgs> = z.object({
  data: z.union([ DepartmentCreateManyInputSchema,DepartmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const DepartmentDeleteArgsSchema: z.ZodType<Prisma.DepartmentDeleteArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentUpdateArgsSchema: z.ZodType<Prisma.DepartmentUpdateArgs> = z.object({
  select: DepartmentSelectSchema.optional(),
  include: DepartmentIncludeSchema.optional(),
  data: z.union([ DepartmentUpdateInputSchema,DepartmentUncheckedUpdateInputSchema ]),
  where: DepartmentWhereUniqueInputSchema,
}).strict() ;

export const DepartmentUpdateManyArgsSchema: z.ZodType<Prisma.DepartmentUpdateManyArgs> = z.object({
  data: z.union([ DepartmentUpdateManyMutationInputSchema,DepartmentUncheckedUpdateManyInputSchema ]),
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const DepartmentDeleteManyArgsSchema: z.ZodType<Prisma.DepartmentDeleteManyArgs> = z.object({
  where: DepartmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermitCreateArgsSchema: z.ZodType<Prisma.PermitCreateArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  data: z.union([ PermitCreateInputSchema,PermitUncheckedCreateInputSchema ]),
}).strict() ;

export const PermitUpsertArgsSchema: z.ZodType<Prisma.PermitUpsertArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
  create: z.union([ PermitCreateInputSchema,PermitUncheckedCreateInputSchema ]),
  update: z.union([ PermitUpdateInputSchema,PermitUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermitCreateManyArgsSchema: z.ZodType<Prisma.PermitCreateManyArgs> = z.object({
  data: z.union([ PermitCreateManyInputSchema,PermitCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PermitDeleteArgsSchema: z.ZodType<Prisma.PermitDeleteArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const PermitUpdateArgsSchema: z.ZodType<Prisma.PermitUpdateArgs> = z.object({
  select: PermitSelectSchema.optional(),
  include: PermitIncludeSchema.optional(),
  data: z.union([ PermitUpdateInputSchema,PermitUncheckedUpdateInputSchema ]),
  where: PermitWhereUniqueInputSchema,
}).strict() ;

export const PermitUpdateManyArgsSchema: z.ZodType<Prisma.PermitUpdateManyArgs> = z.object({
  data: z.union([ PermitUpdateManyMutationInputSchema,PermitUncheckedUpdateManyInputSchema ]),
  where: PermitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermitDeleteManyArgsSchema: z.ZodType<Prisma.PermitDeleteManyArgs> = z.object({
  where: PermitWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoleCreateArgsSchema: z.ZodType<Prisma.RoleCreateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
}).strict() ;

export const RoleUpsertArgsSchema: z.ZodType<Prisma.RoleUpsertArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
  create: z.union([ RoleCreateInputSchema,RoleUncheckedCreateInputSchema ]),
  update: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
}).strict() ;

export const RoleCreateManyArgsSchema: z.ZodType<Prisma.RoleCreateManyArgs> = z.object({
  data: z.union([ RoleCreateManyInputSchema,RoleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RoleDeleteArgsSchema: z.ZodType<Prisma.RoleDeleteArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleUpdateArgsSchema: z.ZodType<Prisma.RoleUpdateArgs> = z.object({
  select: RoleSelectSchema.optional(),
  include: RoleIncludeSchema.optional(),
  data: z.union([ RoleUpdateInputSchema,RoleUncheckedUpdateInputSchema ]),
  where: RoleWhereUniqueInputSchema,
}).strict() ;

export const RoleUpdateManyArgsSchema: z.ZodType<Prisma.RoleUpdateManyArgs> = z.object({
  data: z.union([ RoleUpdateManyMutationInputSchema,RoleUncheckedUpdateManyInputSchema ]),
  where: RoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RoleDeleteManyArgsSchema: z.ZodType<Prisma.RoleDeleteManyArgs> = z.object({
  where: RoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserRoleCreateArgsSchema: z.ZodType<Prisma.UserRoleCreateArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  data: z.union([ UserRoleCreateInputSchema,UserRoleUncheckedCreateInputSchema ]),
}).strict() ;

export const UserRoleUpsertArgsSchema: z.ZodType<Prisma.UserRoleUpsertArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereUniqueInputSchema,
  create: z.union([ UserRoleCreateInputSchema,UserRoleUncheckedCreateInputSchema ]),
  update: z.union([ UserRoleUpdateInputSchema,UserRoleUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserRoleCreateManyArgsSchema: z.ZodType<Prisma.UserRoleCreateManyArgs> = z.object({
  data: z.union([ UserRoleCreateManyInputSchema,UserRoleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserRoleDeleteArgsSchema: z.ZodType<Prisma.UserRoleDeleteArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  where: UserRoleWhereUniqueInputSchema,
}).strict() ;

export const UserRoleUpdateArgsSchema: z.ZodType<Prisma.UserRoleUpdateArgs> = z.object({
  select: UserRoleSelectSchema.optional(),
  include: UserRoleIncludeSchema.optional(),
  data: z.union([ UserRoleUpdateInputSchema,UserRoleUncheckedUpdateInputSchema ]),
  where: UserRoleWhereUniqueInputSchema,
}).strict() ;

export const UserRoleUpdateManyArgsSchema: z.ZodType<Prisma.UserRoleUpdateManyArgs> = z.object({
  data: z.union([ UserRoleUpdateManyMutationInputSchema,UserRoleUncheckedUpdateManyInputSchema ]),
  where: UserRoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserRoleDeleteManyArgsSchema: z.ZodType<Prisma.UserRoleDeleteManyArgs> = z.object({
  where: UserRoleWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionCreateArgsSchema: z.ZodType<Prisma.PermissionCreateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const PermissionUpsertArgsSchema: z.ZodType<Prisma.PermissionUpsertArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
  create: z.union([ PermissionCreateInputSchema,PermissionUncheckedCreateInputSchema ]),
  update: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const PermissionCreateManyArgsSchema: z.ZodType<Prisma.PermissionCreateManyArgs> = z.object({
  data: z.union([ PermissionCreateManyInputSchema,PermissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PermissionDeleteArgsSchema: z.ZodType<Prisma.PermissionDeleteArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateArgsSchema: z.ZodType<Prisma.PermissionUpdateArgs> = z.object({
  select: PermissionSelectSchema.optional(),
  include: PermissionIncludeSchema.optional(),
  data: z.union([ PermissionUpdateInputSchema,PermissionUncheckedUpdateInputSchema ]),
  where: PermissionWhereUniqueInputSchema,
}).strict() ;

export const PermissionUpdateManyArgsSchema: z.ZodType<Prisma.PermissionUpdateManyArgs> = z.object({
  data: z.union([ PermissionUpdateManyMutationInputSchema,PermissionUncheckedUpdateManyInputSchema ]),
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PermissionDeleteManyArgsSchema: z.ZodType<Prisma.PermissionDeleteManyArgs> = z.object({
  where: PermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionCreateArgsSchema: z.ZodType<Prisma.RolePermissionCreateArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  data: z.union([ RolePermissionCreateInputSchema,RolePermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const RolePermissionUpsertArgsSchema: z.ZodType<Prisma.RolePermissionUpsertArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
  create: z.union([ RolePermissionCreateInputSchema,RolePermissionUncheckedCreateInputSchema ]),
  update: z.union([ RolePermissionUpdateInputSchema,RolePermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const RolePermissionCreateManyArgsSchema: z.ZodType<Prisma.RolePermissionCreateManyArgs> = z.object({
  data: z.union([ RolePermissionCreateManyInputSchema,RolePermissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const RolePermissionDeleteArgsSchema: z.ZodType<Prisma.RolePermissionDeleteArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionUpdateArgsSchema: z.ZodType<Prisma.RolePermissionUpdateArgs> = z.object({
  select: RolePermissionSelectSchema.optional(),
  include: RolePermissionIncludeSchema.optional(),
  data: z.union([ RolePermissionUpdateInputSchema,RolePermissionUncheckedUpdateInputSchema ]),
  where: RolePermissionWhereUniqueInputSchema,
}).strict() ;

export const RolePermissionUpdateManyArgsSchema: z.ZodType<Prisma.RolePermissionUpdateManyArgs> = z.object({
  data: z.union([ RolePermissionUpdateManyMutationInputSchema,RolePermissionUncheckedUpdateManyInputSchema ]),
  where: RolePermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const RolePermissionDeleteManyArgsSchema: z.ZodType<Prisma.RolePermissionDeleteManyArgs> = z.object({
  where: RolePermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPermissionCreateArgsSchema: z.ZodType<Prisma.UserPermissionCreateArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  data: z.union([ UserPermissionCreateInputSchema,UserPermissionUncheckedCreateInputSchema ]),
}).strict() ;

export const UserPermissionUpsertArgsSchema: z.ZodType<Prisma.UserPermissionUpsertArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereUniqueInputSchema,
  create: z.union([ UserPermissionCreateInputSchema,UserPermissionUncheckedCreateInputSchema ]),
  update: z.union([ UserPermissionUpdateInputSchema,UserPermissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserPermissionCreateManyArgsSchema: z.ZodType<Prisma.UserPermissionCreateManyArgs> = z.object({
  data: z.union([ UserPermissionCreateManyInputSchema,UserPermissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserPermissionDeleteArgsSchema: z.ZodType<Prisma.UserPermissionDeleteArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  where: UserPermissionWhereUniqueInputSchema,
}).strict() ;

export const UserPermissionUpdateArgsSchema: z.ZodType<Prisma.UserPermissionUpdateArgs> = z.object({
  select: UserPermissionSelectSchema.optional(),
  include: UserPermissionIncludeSchema.optional(),
  data: z.union([ UserPermissionUpdateInputSchema,UserPermissionUncheckedUpdateInputSchema ]),
  where: UserPermissionWhereUniqueInputSchema,
}).strict() ;

export const UserPermissionUpdateManyArgsSchema: z.ZodType<Prisma.UserPermissionUpdateManyArgs> = z.object({
  data: z.union([ UserPermissionUpdateManyMutationInputSchema,UserPermissionUncheckedUpdateManyInputSchema ]),
  where: UserPermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserPermissionDeleteManyArgsSchema: z.ZodType<Prisma.UserPermissionDeleteManyArgs> = z.object({
  where: UserPermissionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;