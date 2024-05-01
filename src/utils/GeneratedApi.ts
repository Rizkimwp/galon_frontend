/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateContohDto {
  /**
   * Contoh Hello World
   * @example "contoh1"
   */
  nama: string
}

export interface Customers {
  nama: string
  nomor_telepon: string
  alamat: string
}

export interface CourierDto {
  id: number
  nama: string
  nomor_telepon: string
}

export interface Courier {
  nama: string
  nomor_telepon: string
}

/**
 * The delivery status
 * @default "proses"
 */
export enum StatusPengiriman {
  Dikirim = 'dikirim',
  Proses = 'proses',
  Gagal = 'gagal',
}

export interface DeliveryDto {
  /** The delivery status */
  status: StatusPengiriman
  itemsId: number
  qty: number
  kurirId: number
  customersId: number
}

export interface TransactionDto {
  customerId: number
  itemId: number
  qty: number
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys.map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key))).join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob ? property : typeof property === 'object' && property !== null ? JSON.stringify(property) : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Rizky Cendani
 * @version 1.0
 * @contact
 *
 * Melakukan transaksi Untuk Pembelian Galon
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  contoh = {
    /**
     * No description
     *
     * @tags contoh
     * @name AppControllerGetHello
     * @request GET:/contoh
     */
    appControllerGetHello: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/contoh`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags contoh
     * @name AppControllerAddContoh
     * @request POST:/contoh
     */
    appControllerAddContoh: (data: CreateContohDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/contoh`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  customers = {
    /**
     * No description
     *
     * @tags customers
     * @name CustomerControllerFindAll
     * @request GET:/api/customers
     */
    customerControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/customers`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags customers
     * @name CustomerControllerCreate
     * @request POST:/api/customers
     */
    customerControllerCreate: (data: Customers, params: RequestParams = {}) =>
      this.request<Customers, void>({
        path: `/api/customers`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags customers
     * @name CustomerControllerFindOne
     * @request GET:/api/customers/{id}
     */
    customerControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/customers/${id}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags customers
     * @name CustomerControllerUpdate
     * @request PUT:/api/customers/{id}
     */
    customerControllerUpdate: (id: number, data: Customers, params: RequestParams = {}) =>
      this.request<Customers, void>({
        path: `/api/customers/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags customers
     * @name CustomerControllerRemove
     * @request DELETE:/api/customers/{id}
     */
    customerControllerRemove: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/customers/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  courier = {
    /**
     * No description
     *
     * @tags courier
     * @name CourierControllerFindAll
     * @request GET:/api/courier
     */
    courierControllerFindAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/courier`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courier
     * @name CourierControllerCreate
     * @request POST:/api/courier
     */
    courierControllerCreate: (data: CourierDto, params: RequestParams = {}) =>
      this.request<Courier, void>({
        path: `/api/courier`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courier
     * @name CourierControllerFindOne
     * @request GET:/api/courier/{id}
     */
    courierControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<Courier, void>({
        path: `/api/courier/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courier
     * @name CourierControllerUpdate
     * @request PUT:/api/courier/{id}
     */
    courierControllerUpdate: (id: number, data: CourierDto, params: RequestParams = {}) =>
      this.request<Courier, void>({
        path: `/api/courier/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courier
     * @name CourierControllerRemove
     * @request DELETE:/api/courier/{id}
     */
    courierControllerRemove: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/courier/${id}`,
        method: 'DELETE',
        ...params,
      }),
  }
  delivery = {
    /**
     * No description
     *
     * @tags Delivery
     * @name DeliveryControllerGetAll
     * @request GET:/api/delivery
     */
    deliveryControllerGetAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/delivery`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Delivery
     * @name DeliveryControllerCreate
     * @request POST:/api/delivery
     */
    deliveryControllerCreate: (data?: DeliveryDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/delivery`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Delivery
     * @name DeliveryControllerGetDeliveriesByCourierIdAndDate
     * @request GET:/api/delivery/{kurirId}/{tanggal}
     */
    deliveryControllerGetDeliveriesByCourierIdAndDate: (kurirId: number, tanggal: string, params: RequestParams = {}) =>
      this.request<any, void>({
        path: `/api/delivery/${kurirId}/${tanggal}`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Delivery
     * @name DeliveryControllerGetDeliveriesForToday
     * @request GET:/api/delivery/kurirId
     */
    deliveryControllerGetDeliveriesForToday: (
      query?: {
        kurirId?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/delivery/kurirId`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Delivery
     * @name DeliveryControllerUpdate
     * @request PUT:/api/delivery/{id}
     */
    deliveryControllerUpdate: (id: number, data: DeliveryDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/delivery/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  items = {
    /**
     * No description
     *
     * @tags Items
     * @name ItemsControllerGetItems
     * @request GET:/api/items
     */
    itemsControllerGetItems: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/items`,
        method: 'GET',
        ...params,
      }),
  }
  payment = {
    /**
     * No description
     *
     * @tags Payment
     * @name PaymentControllerGetAll
     * @request GET:/api/payment
     */
    paymentControllerGetAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/payment`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Payment
     * @name PaymentControllerCreate
     * @request POST:/api/payment
     */
    paymentControllerCreate: (data: TransactionDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/payment`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  }
  report = {
    /**
     * No description
     *
     * @tags Report
     * @name ReportControllerGetTotalPriceWithQty
     * @request GET:/api/report/laporan-pendapatan
     */
    reportControllerGetTotalPriceWithQty: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/report/laporan-pendapatan`,
        method: 'GET',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Report
     * @name ReportControllerGetTotalPriceByDate
     * @request GET:/api/report/total-price-by-date
     */
    reportControllerGetTotalPriceByDate: (
      query: {
        /** @format date-time */
        startDate: string
        /** @format date-time */
        endDate: string
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/report/total-price-by-date`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Report
     * @name ReportControllerGetTotalPricePerYear
     * @request GET:/api/report/total-price-per-year
     */
    reportControllerGetTotalPricePerYear: (
      query: {
        year: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/report/total-price-per-year`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Report
     * @name ReportControllerGetTotalPricePerMonth
     * @request GET:/api/report/total-price-per-month
     */
    reportControllerGetTotalPricePerMonth: (
      query: {
        year: number
        month: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/report/total-price-per-month`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Report
     * @name ReportControllerGetTotalPricePerDay
     * @request GET:/api/report/total-price-per-day
     */
    reportControllerGetTotalPricePerDay: (
      query: {
        year: number
        month: number
        day: number
      },
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/report/total-price-per-day`,
        method: 'GET',
        query: query,
        ...params,
      }),
  }
}
