import { DeliveryContructor } from '../types/delivery.types';
import { CreateParcelDto, ParcelConstructor } from '../types/parcel.types';

export const makeParcel = ({
  from,
  to,
  price,
  message,
  type,
}: CreateParcelDto): ParcelConstructor => {
  return {
    type,
    from,
    to,
    price,
    message,
  };
};

export const makeDelivery = ({
  parcelId,
  desiredDeliveryDateTime,
  timeZone,
}: DeliveryContructor) => {
  return {
    parcelId,
    desiredDeliveryDateTime,
    timeZone,
  };
};

interface ConversationCosts {
  perConversation: number; // Цена за разговор
  perMessage: number; // Цена за сообщение
  totalFreeCost: number; // Общая стоимость за бесплатные разговоры и сообщения
}

export function calculateCosts(
  usdToKgs: number,
): Record<string, ConversationCosts> {
  const costsInUSD: Record<string, ConversationCosts> = {
    Utility: {
      perConversation: 0.0077, // $0.0077 за разговор
      perMessage: 0.005, // $0.005 за сообщение
      totalFreeCost: 5.0, // $5.00 за первые 1000 сообщений
    },
    Authentication: {
      perConversation: 0.0304, // $0.0304 за разговор
      perMessage: 0.005, // $0.005 за сообщение
      totalFreeCost: 0.0, // $0.00 за бесплатные разговоры
    },
    Marketing: {
      perConversation: 0.0604, // $0.0604 за разговор
      perMessage: 0.005, // $0.005 за сообщение
      totalFreeCost: 0.0, // $0.00 за бесплатные разговоры
    },
    Service: {
      perConversation: 0.0145, // $0.0145 за разговор
      perMessage: 0.005, // $0.005 за сообщение
      totalFreeCost: 0.0, // $0.00 за бесплатные разговоры
    },
  };

  return Object.fromEntries(
    Object.entries(costsInUSD).map(([key, value]) => [
      key,
      {
        perConversation: Number((value.perConversation * usdToKgs).toFixed(2)), // Расчет стоимости в KGS
        perMessage: Number((value.perMessage * usdToKgs).toFixed(2)), // Расчет стоимости в KGS
        totalFreeCost: Number((value.totalFreeCost * usdToKgs).toFixed(2)), // Расчет стоимости в KGS
      },
    ]),
  );
}
