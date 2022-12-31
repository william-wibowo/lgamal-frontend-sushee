import { IRes } from "../../entity";
import { apiSlices } from "../../app/api/apiSlice";
import { ICartLists, ICartPostReq } from "../../entity/Carts";
import { IOrderReqBody, IPaymentOptionResBody } from "../../entity/Order";

export const orderApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        postOrders: builder.mutation<any, IOrderReqBody>({
            query: (payload) => ({
                url: "/orders",
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Cart']
        }),
        getPaymentOption: builder.query<IRes<IPaymentOptionResBody>, void>({
            query: () => ({
                url: "/orders/payment",
                method: 'GET',
            }),
        })
    })
})

export const {
    usePostOrdersMutation,
    useGetPaymentOptionQuery,
} = orderApiSlice