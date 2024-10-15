import { Prettify } from './common.types';
import { ISO8601simple } from './datetime.types';
import { IANA } from './iana.types';
import { UserId } from './user.types';

export type PhoneNumber = string;
export type EmailAddress = string;
export type TelegramUserId = string;

export const channels = ['sms', 'telegram', 'email'] as const;
export type Channels = (typeof channels)[number];

export type ParcelId = string;

export type Parcel = {
  from: UserId;
  price: number;
  message: string;
};

type ParcelEmailConstructor = Prettify<
  Parcel & {
    type: Extract<Channels, 'email'>;
    to: EmailAddress;
  }
>;

type ParcelSMSConstructor = Prettify<
  Parcel & {
    type: Extract<Channels, 'sms'>;
    to: PhoneNumber;
  }
>;

type ParcelTelegramConstructor = Prettify<
  Parcel & {
    type: Extract<Channels, 'telegram'>;
    to: PhoneNumber;
  }
>;

export type ParcelConstructor =
  | ParcelEmailConstructor
  | ParcelSMSConstructor
  | ParcelTelegramConstructor;

export type ParcelEntity = ParcelConstructor & {
  id: ParcelId;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateParcelDto = ParcelConstructor & {
  desiredDeliveryDateTime: ISO8601simple;
  timeZone: IANA;
};
