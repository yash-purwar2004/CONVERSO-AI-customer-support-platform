import { apiClient } from "@/app/lib/api";
import { IngestionRequest } from "./ingestionTypes";

export const IngestionApi = {
  ingestWebsite: (data: IngestionRequest) =>
    apiClient("/api/ingestion/website", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};