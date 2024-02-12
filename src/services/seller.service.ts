import CustomerOrder from '../models/CustomerOrder'
import SellerOrder from '../models/SellerOrder'
import User from '../models/User'
import { IUserDataDocument } from '../types/auth.interface'
import {
  IDateRange,
  ISearchSellerByIdQuery,
  ISellerOrderDocument
} from '../types/seller.interface'
import { CREATED_AS } from '../types/shared.interface'

export const findSellersById = async (
  sellerId: string
): Promise<IUserDataDocument[] | []> => {
  const searchedSellers = await User.find({
    _id: sellerId,
    createdAs: CREATED_AS.SELLER
  })
  return searchedSellers
}

export const parseDateFilter = (filter: string): Date => {
  const dateFilter = filter.split(':')[1]
  return new Date(dateFilter)
}

export const getDateRange = (date: Date): IDateRange => {
  const startDate = new Date(date)
  // eslint-disable-next-line no-magic-numbers
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(date)
  // eslint-disable-next-line no-magic-numbers
  endDate.setHours(23, 59, 59, 999)
  return { startDate, endDate }
}

export const getOrdersByQuery = async (
  query: ISearchSellerByIdQuery
): Promise<ISellerOrderDocument[] | []> => {
  const sellerOrders = await SellerOrder.find(query)
  const customerOrders = await CustomerOrder.find(query)
  return [...sellerOrders, ...customerOrders]
}
