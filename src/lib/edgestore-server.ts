import { initEdgeStoreClient } from "@edgestore/server/core";
import { initEdgeStore } from "@edgestore/server";

const es = initEdgeStore.create();
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    /**
     * return `true` to allow delete
     * This function must be defined if you want to delete files directly from the client.
     */
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log("beforeDelete", ctx, fileInfo);
      return true; // allow delete
    }),
});
export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
});

export const getFiles = async (page: number) => {
  try {
    const response = await backendClient.publicFiles.listFiles({
      pagination: {
        currentPage: page,
        pageSize: 25,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};
