import { ISO8601simple } from './datetime.types';
import { IANA } from './iana.types';
import { ParcelId } from './parcel.types';

export type DeliveryId = string;

export const deliveryStatuses = [
  'pending',
  'shipped',
  'delivered',
  'canceled',
  'failure',
] as const;
export type DeliveryStatus = (typeof deliveryStatuses)[number];

export type DeliveryContructor = {
  parcelId: ParcelId;
  desiredDeliveryDateTime: ISO8601simple;
  timeZone: IANA;
};

export type DeliveryEntity = DeliveryContructor & {
  id: DeliveryId;
  status: DeliveryStatus;
  reason?: string;
};
