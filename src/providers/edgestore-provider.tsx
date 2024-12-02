"use client";
import { type EdgeStoreRouter } from "@/app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

/**
 * Creates and exports an EdgeStoreProvider component and a custom hook `useEdgeStore`.
 * This is used for providing access to the EdgeStore in a React context.
 *
 * @remarks
 * The `EdgeStoreProvider` component wraps the application, providing the EdgeStore context to its child components.
 * The `useEdgeStore` hook is used to interact with the EdgeStore in components.
 *
 */
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
