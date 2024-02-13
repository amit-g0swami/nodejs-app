import CustomerOrder from '../models/CustomerOrder'
import SellerOrder from '../models/SellerOrder'
import User from '../models/User'
import { IUserDataDocument } from '../types/auth.interface'
import {
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

export const parseDateFilter = (filter: string): [Date, Date] | null => {
  const dateFilter = filter.split(':')[1]
  const [startDateStr, endDateStr] = dateFilter.split('|')
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return null
  }
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(23, 59, 59, 999)
  return [startDate, endDate]
}

export const validateGetOrderByDatePayload = (
  id: string | undefined,
  filters: string | undefined
): boolean => {
  return !!(id && filters)
}

export const getOrdersByQuery = async (
  query: ISearchSellerByIdQuery
): Promise<ISellerOrderDocument[] | []> => {
  const [sellerOrders, customerOrders] = await Promise.all([
    SellerOrder.find(query),
    CustomerOrder.find(query)
  ])
  return [...sellerOrders, ...customerOrders]
}
