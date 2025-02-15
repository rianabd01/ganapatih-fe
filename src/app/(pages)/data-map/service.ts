import { api } from "@/utils/axios";

export const fetchTrips = async ({
  queryKey,
}: {
  queryKey: [
    string,
    { limit: number; page: number; sortBy: string; paymentType: string }
  ];
}) => {
  const [, query] = queryKey;
  const response = await api.get(
    `trips?limit=${query.limit}&page=${query.page}&sortBy=${query.sortBy}&paymentType=${query.paymentType}`
  );
  return response.data;
};
