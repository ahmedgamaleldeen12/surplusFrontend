/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  Address,
  AddressDto,
  ApiResponse,
  CategoryToReturnDto,
  ConfirmEmailDto,
  CreateCategoryDto,
  CreateProductDto,
  CustomerBasket,
  CustomerBasketDto,
  DeliveryMethod,
  LoginDto,
  MemberAddEditDto,
  MemberViewDto,
  OrderDto,
  OrderToReturnDto,
  ProductCategory,
  ProductToReturnDto,
  ProductToReturnDtoPagination,
  RefreshTokenReq,
  RegisterDto,
  ResetPasswordDto,
  UserDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Account
   * @name AccountRefreshUserTokenCreate
   * @request POST:/api/Account/refresh-user-token
   */
  accountRefreshUserTokenCreate = (data: RefreshTokenReq, params: RequestParams = {}) =>
    this.request<UserDto, any>({
      path: `/api/Account/refresh-user-token`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountLoginCreate
   * @request POST:/api/Account/login
   */
  accountLoginCreate = (data: LoginDto, params: RequestParams = {}) =>
    this.request<UserDto, any>({
      path: `/api/Account/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountRegisterCreate
   * @request POST:/api/Account/register
   */
  accountRegisterCreate = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Account/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountConfirmEmailUpdate
   * @request PUT:/api/Account/confirm-email
   */
  accountConfirmEmailUpdate = (data: ConfirmEmailDto, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Account/confirm-email`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountResendEmailConfirmationLinkCreate
   * @request POST:/api/Account/resend-email-confirmation-link/{email}
   */
  accountResendEmailConfirmationLinkCreate = (email: string, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Account/resend-email-confirmation-link/${email}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountForgotUsernameOrPasswordCreate
   * @request POST:/api/Account/forgot-username-or-password/{email}
   */
  accountForgotUsernameOrPasswordCreate = (email: string, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Account/forgot-username-or-password/${email}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountResetPasswordUpdate
   * @request PUT:/api/Account/reset-password
   */
  accountResetPasswordUpdate = (data: ResetPasswordDto, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Account/reset-password`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountList
   * @request GET:/api/Account
   */
  accountList = (params: RequestParams = {}) =>
    this.request<UserDto, any>({
      path: `/api/Account`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountAddressList
   * @request GET:/api/Account/address
   */
  accountAddressList = (params: RequestParams = {}) =>
    this.request<AddressDto, any>({
      path: `/api/Account/address`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountAddressUpdate
   * @request PUT:/api/Account/address
   */
  accountAddressUpdate = (data: AddressDto, params: RequestParams = {}) =>
    this.request<Address, any>({
      path: `/api/Account/address`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountEmailExistsList
   * @request GET:/api/Account/email-exists
   */
  accountEmailExistsList = (
    query?: {
      email?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<boolean, any>({
      path: `/api/Account/email-exists`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountProfileList
   * @request GET:/api/Account/profile
   */
  accountProfileList = (params: RequestParams = {}) =>
    this.request<UserDto, any>({
      path: `/api/Account/profile`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountAddAddressCreate
   * @request POST:/api/Account/add-address
   */
  accountAddAddressCreate = (data: AddressDto, params: RequestParams = {}) =>
    this.request<AddressDto, any>({
      path: `/api/Account/add-address`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminGetMembersList
   * @request GET:/api/Admin/get-members
   */
  adminGetMembersList = (params: RequestParams = {}) =>
    this.request<MemberViewDto[], any>({
      path: `/api/Admin/get-members`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminGetMemberDetail
   * @request GET:/api/Admin/get-member/{id}
   */
  adminGetMemberDetail = (id: string, params: RequestParams = {}) =>
    this.request<MemberAddEditDto, any>({
      path: `/api/Admin/get-member/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminAddEditMemberCreate
   * @request POST:/api/Admin/add-edit-member
   */
  adminAddEditMemberCreate = (data: MemberAddEditDto, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Admin/add-edit-member`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminLockMemberUpdate
   * @request PUT:/api/Admin/lock-member/{id}
   */
  adminLockMemberUpdate = (id: string, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Admin/lock-member/${id}`,
      method: "PUT",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminUnlockMemberUpdate
   * @request PUT:/api/Admin/unlock-member/{id}
   */
  adminUnlockMemberUpdate = (id: string, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Admin/unlock-member/${id}`,
      method: "PUT",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminDeleteMemberDelete
   * @request DELETE:/api/Admin/delete-member/{id}
   */
  adminDeleteMemberDelete = (id: string, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Admin/delete-member/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminGetApplicationRolesList
   * @request GET:/api/Admin/get-application-roles
   */
  adminGetApplicationRolesList = (params: RequestParams = {}) =>
    this.request<string[], any>({
      path: `/api/Admin/get-application-roles`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Basket
   * @name BasketList
   * @request GET:/api/Basket
   */
  basketList = (
    query?: {
      id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<CustomerBasket, any>({
      path: `/api/Basket`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Basket
   * @name BasketCreate
   * @request POST:/api/Basket
   */
  basketCreate = (data: CustomerBasketDto, params: RequestParams = {}) =>
    this.request<CustomerBasket, any>({
      path: `/api/Basket`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Basket
   * @name BasketDelete
   * @request DELETE:/api/Basket
   */
  basketDelete = (
    query?: {
      id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<boolean, any>({
      path: `/api/Basket`,
      method: "DELETE",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Basket
   * @name BasketCheckoutCreate
   * @request POST:/api/Basket/checkout
   */
  basketCheckoutCreate = (
    query?: {
      id?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<boolean, any>({
      path: `/api/Basket/checkout`,
      method: "POST",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Email
   * @name EmailSendCreate
   * @request POST:/api/Email/send
   */
  emailSendCreate = (
    data: {
      ToEmail?: string;
      Subject?: string;
      Body?: string;
      Attachments?: File[];
    },
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/api/Email/send`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Orders
   * @name OrdersCreate
   * @request POST:/api/Orders
   */
  ordersCreate = (data: OrderDto, params: RequestParams = {}) =>
    this.request<OrderToReturnDto, ApiResponse>({
      path: `/api/Orders`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Orders
   * @name OrdersList
   * @request GET:/api/Orders
   */
  ordersList = (params: RequestParams = {}) =>
    this.request<OrderToReturnDto[], any>({
      path: `/api/Orders`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Orders
   * @name OrdersDetail
   * @request GET:/api/Orders/{id}
   */
  ordersDetail = (id: number, params: RequestParams = {}) =>
    this.request<OrderToReturnDto, ApiResponse>({
      path: `/api/Orders/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Orders
   * @name OrdersDeliveryMethodsList
   * @request GET:/api/Orders/deliveryMethods
   */
  ordersDeliveryMethodsList = (params: RequestParams = {}) =>
    this.request<DeliveryMethod[], any>({
      path: `/api/Orders/deliveryMethods`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Payment
   * @name PaymentCreate
   * @request POST:/api/Payment/{basketId}
   */
  paymentCreate = (basketId: string, params: RequestParams = {}) =>
    this.request<CustomerBasket, ApiResponse>({
      path: `/api/Payment/${basketId}`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductList
   * @request GET:/api/Product
   */
  productList = (
    query?: {
      /** @format int32 */
      PageSize?: number;
      /** @format int32 */
      PageIndex?: number;
      Search?: string;
      Sort?: string;
      /** @format int32 */
      CategoryId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductToReturnDtoPagination, any>({
      path: `/api/Product`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductCreate
   * @request POST:/api/Product
   */
  productCreate = (data: CreateProductDto, params: RequestParams = {}) =>
    this.request<ProductToReturnDto, any>({
      path: `/api/Product`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductDetail
   * @request GET:/api/Product/{id}
   */
  productDetail = (id: number, params: RequestParams = {}) =>
    this.request<ProductToReturnDto, ApiResponse>({
      path: `/api/Product/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductCategoriesList
   * @request GET:/api/Product/categories
   */
  productCategoriesList = (params: RequestParams = {}) =>
    this.request<ProductCategory[], any>({
      path: `/api/Product/categories`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductDeleteProductDelete
   * @request DELETE:/api/Product/delete-product/{id}
   */
  productDeleteProductDelete = (id: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Product/delete-product/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductDeleteCategoryDelete
   * @request DELETE:/api/Product/delete-category/{id}
   */
  productDeleteCategoryDelete = (id: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Product/delete-category/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductPendingList
   * @request GET:/api/Product/pending
   */
  productPendingList = (
    query?: {
      /** @format int32 */
      PageSize?: number;
      /** @format int32 */
      PageIndex?: number;
      Search?: string;
      Sort?: string;
      /** @format int32 */
      CategoryId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProductToReturnDto[], any>({
      path: `/api/Product/pending`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductApproveUpdate
   * @request PUT:/api/Product/approve/{id}
   */
  productApproveUpdate = (id: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Product/approve/${id}`,
      method: "PUT",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductRefuseDelete
   * @request DELETE:/api/Product/refuse/{id}
   */
  productRefuseDelete = (id: number, params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/Product/refuse/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Product
   * @name ProductAddCategoryCreate
   * @request POST:/api/Product/add-category
   */
  productAddCategoryCreate = (data: CreateCategoryDto, params: RequestParams = {}) =>
    this.request<CategoryToReturnDto, any>({
      path: `/api/Product/add-category`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticePublicList
   * @request GET:/api/RCPractice/public
   */
  rcPracticePublicList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/public`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAdminRoleList
   * @request GET:/api/RCPractice/admin-role
   */
  rcPracticeAdminRoleList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/admin-role`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeManagerRoleList
   * @request GET:/api/RCPractice/manager-role
   */
  rcPracticeManagerRoleList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/manager-role`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticePlayerRoleList
   * @request GET:/api/RCPractice/player-role
   */
  rcPracticePlayerRoleList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/player-role`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAdminOrManagerRoleList
   * @request GET:/api/RCPractice/admin-or-manager-role
   */
  rcPracticeAdminOrManagerRoleList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/admin-or-manager-role`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAdminOrPlayerRoleList
   * @request GET:/api/RCPractice/admin-or-player-role
   */
  rcPracticeAdminOrPlayerRoleList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/admin-or-player-role`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAdminPolicyList
   * @request GET:/api/RCPractice/admin-policy
   */
  rcPracticeAdminPolicyList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/admin-policy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeManagerPolicyList
   * @request GET:/api/RCPractice/manager-policy
   */
  rcPracticeManagerPolicyList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/manager-policy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeUserPolicyList
   * @request GET:/api/RCPractice/user-policy
   */
  rcPracticeUserPolicyList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/user-policy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAdminOrManagerPolicyList
   * @request GET:/api/RCPractice/admin-or-manager-policy
   */
  rcPracticeAdminOrManagerPolicyList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/admin-or-manager-policy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAdminAndManagerPolicyList
   * @request GET:/api/RCPractice/admin-and-manager-policy
   */
  rcPracticeAdminAndManagerPolicyList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/admin-and-manager-policy`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags RCPractice
   * @name RcPracticeAllRolePolicyList
   * @request GET:/api/RCPractice/all-role-policy
   */
  rcPracticeAllRolePolicyList = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/api/RCPractice/all-role-policy`,
      method: "GET",
      ...params,
    });
}
