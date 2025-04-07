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

export interface Address {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  street?: string | null;
  city?: string | null;
  country?: string | null;
  appUserId?: string | null;
  user?: User;
}

export interface AddressDto {
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  street: string;
  /** @minLength 1 */
  city: string;
  /** @minLength 1 */
  country: string;
}

export interface ApiResponse {
  /** @format int32 */
  statusCode?: number;
  message?: string | null;
}

export interface BasketItem {
  /** @format int32 */
  id?: number;
  productName?: string | null;
  pictureUrl?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
  category?: string | null;
}

export interface BasketItemDto {
  /** @format int32 */
  id: number;
  /** @minLength 1 */
  productName: string;
  /** @minLength 1 */
  pictureUrl: string;
  /**
   * @format double
   * @min 0.1
   */
  price: number;
  /**
   * @format int32
   * @min 1
   * @max 2147483647
   */
  quantity: number;
  /** @minLength 1 */
  category: string;
}

export interface CategoryToReturnDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

export interface ConfirmEmailDto {
  /**
   * @minLength 1
   * @pattern ^[0-9]{4}$
   */
  code: string;
  /**
   * @minLength 1
   * @pattern ^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$
   */
  email: string;
}

export interface CreateProductDto {
  name?: string | null;
  description?: string | null;
  pictureUrl?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  categoryId?: number;
}

export interface CustomerBasket {
  id?: string | null;
  items?: BasketItem[] | null;
  paymentIntentId?: string | null;
  clientSecret?: string | null;
  /** @format int32 */
  deliveryMethodId?: number | null;
  /** @format double */
  shippingPrice?: number;
}

export interface CustomerBasketDto {
  /** @minLength 1 */
  id: string;
  items: BasketItemDto[];
  paymentIntentId?: string | null;
  clientSecret?: string | null;
  /** @format int32 */
  deliveryMethodId?: number | null;
  /** @format double */
  shippingPrice?: number;
}

export interface DeliveryMethod {
  /** @format int32 */
  id?: number;
  shortName?: string | null;
  description?: string | null;
  /** @format double */
  cost?: number;
  deliveryTime?: string | null;
}

export interface LoginDto {
  /** @minLength 1 */
  userName: string;
  /** @minLength 1 */
  password: string;
}

export interface MemberAddEditDto {
  id?: string | null;
  /** @minLength 1 */
  userName: string;
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  password: string;
  /** @minLength 1 */
  roles: string;
}

export interface MemberViewDto {
  id?: string | null;
  userName?: string | null;
  firstName?: string | null;
  isLocked?: boolean;
  /** @format date-time */
  dateCreated?: string;
  roles?: string[] | null;
}

export interface OrderAddress {
  firstName?: string | null;
  street?: string | null;
  city?: string | null;
  country?: string | null;
}

export interface OrderDto {
  /** @minLength 1 */
  basketId: string;
  /** @format int32 */
  deliveryMethodId: number;
  shippingAddress?: AddressDto;
}

export interface OrderItemDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  productId?: number;
  productName?: string | null;
  pictureUrl?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  quantity?: number;
}

export interface OrderToReturnDto {
  /** @format int32 */
  id?: number;
  buyerEmail?: string | null;
  /** @format date-time */
  orderDate?: string;
  status?: string | null;
  shippingAddress?: OrderAddress;
  deliveryMethod?: string | null;
  /** @format double */
  deliveryMethodCost?: number;
  items?: OrderItemDto[] | null;
  /** @format double */
  subtotal?: number;
  /** @format double */
  total?: number;
  paymentIntentId?: string | null;
}

export interface ProductCategory {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

/** @format int32 */
export enum ProductStatus {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

export interface ProductToReturnDto {
  /** @format int32 */
  id?: number;
  name?: string | null;
  description?: string | null;
  pictureUrl?: string | null;
  /** @format double */
  price?: number;
  /** @format int32 */
  categoryId?: number;
  category?: string | null;
  status?: ProductStatus;
}

export interface ProductToReturnDtoPagination {
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  pageIndex?: number;
  /** @format int32 */
  count?: number;
  data?: ProductToReturnDto[] | null;
}

export interface RefreshTokenReq {
  email?: string | null;
  refreshToken?: string | null;
}

export interface RegisterDto {
  /**
   * @minLength 3
   * @maxLength 15
   */
  firstName: string;
  /**
   * @minLength 1
   * @pattern ^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$
   */
  email: string;
  /**
   * @minLength 6
   * @maxLength 15
   */
  password: string;
  role?: string | null;
}

export interface ResetPasswordDto {
  /** @minLength 1 */
  token: string;
  /**
   * @minLength 1
   * @pattern ^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$
   */
  email: string;
  /**
   * @minLength 6
   * @maxLength 15
   */
  newPassword: string;
}

export interface User {
  id?: string | null;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  /** @format date-time */
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  /** @format int32 */
  accessFailedCount?: number;
  /** @minLength 1 */
  firstName: string;
  /** @format date-time */
  dateOfCreation?: string;
  provider?: string | null;
  emailConfirmationCode?: string | null;
  address?: Address;
  refreshToken?: string | null;
  /** @format date-time */
  refreshTokenExpiryTime?: string;
}

export interface UserDto {
  firstName?: string | null;
  jwt?: string | null;
  refreshToken?: string | null;
}

export interface CreateCategoryDto {
  name?: string | null;
}
