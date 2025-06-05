export type StrapiResponse<T> = {
  data: Array<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type StrapiSingleResponse<T> = {
  data: T;
  meta: {};
};

// Fetch options interface
export interface StrapiFetchOptions {
  cache?: RequestCache;
  revalidate?: number;
  populate?: string;
  fields?: string;
  filters?: Record<string, any>;
  sort?: string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

// Base fetch function for Strapi
export async function fetchFromStrapi<T>(
  endpoint: string,
  options: StrapiFetchOptions = {},
): Promise<T | null> {
  try {
    const strapiUrl =
      process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

    if (!strapiUrl) {
      console.error("STRAPI_URL environment variable is not set");
      return null;
    }

    // Build query parameters
    const params = new URLSearchParams();

    if (options.populate) params.append("populate", options.populate);
    if (options.fields) params.append("fields", options.fields);
    if (options.sort) params.append("sort", options.sort);

    // Handle filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (typeof value === "object") {
          Object.entries(value).forEach(([operator, val]) => {
            params.append(`filters[${key}][${operator}]`, String(val));
          });
        } else {
          params.append(`filters[${key}]`, String(value));
        }
      });
    }

    // Handle pagination
    if (options.pagination) {
      if (options.pagination.page) {
        params.append("pagination[page]", String(options.pagination.page));
      }
      if (options.pagination.pageSize) {
        params.append(
          "pagination[pageSize]",
          String(options.pagination.pageSize),
        );
      }
    }

    const queryString = params.toString();
    const url = `${strapiUrl}/api/${endpoint}${queryString ? `?${queryString}` : ""}`;

    const fetchOptions: RequestInit = {
      cache: options.cache || "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_TOKEN && {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        }),
      },
    };

    if (options.revalidate) {
      fetchOptions.next = { revalidate: options.revalidate };
    }

    console.log(`Fetching from Strapi: ${url}`);

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      console.error(
        `Failed to fetch from Strapi: ${res.status} ${res.statusText}`,
      );
      console.error(`URL: ${url}`);
      return null;
    }

    const json = await res.json();
    console.log(
      `Strapi response for ${endpoint}:`,
      JSON.stringify(json, null, 2),
    );

    return json as T;
  } catch (error) {
    console.error(`Error fetching from Strapi (${endpoint}):`, error);
    return null;
  }
}

// Utility function to get multiple entries
export async function getStrapiEntries<T>(
  contentType: string,
  options: StrapiFetchOptions = {},
): Promise<T[]> {
  const response = await fetchFromStrapi<StrapiResponse<T>>(
    contentType,
    options,
  );

  if (!response || !response.data || response.data.length === 0) {
    console.warn(`No ${contentType} data found`);
    return [];
  }

  return response.data;
}

// Utility function to get a single entry
export async function getStrapiEntry<T>(
  contentType: string,
  options: StrapiFetchOptions = {},
): Promise<T | null> {
  const response = await fetchFromStrapi<StrapiResponse<T>>(
    contentType,
    options,
  );

  if (!response || !response.data || response.data.length === 0) {
    console.warn(`No ${contentType} data found`);
    return null;
  }

  return response.data[0];
}

// Utility function to get entry by ID
export async function getStrapiEntryById<T>(
  contentType: string,
  id: number,
  options: StrapiFetchOptions = {},
): Promise<T | null> {
  const response = await fetchFromStrapi<StrapiSingleResponse<T>>(
    `${contentType}/${id}`,
    options,
  );

  if (!response || !response.data) {
    console.warn(`No ${contentType} with ID ${id} found`);
    return null;
  }

  return response.data;
}

// Utility function for search
export async function searchStrapiEntries<T>(
  contentType: string,
  searchTerm: string,
  searchFields: string[] = ["title", "name"],
  options: StrapiFetchOptions = {},
): Promise<T[]> {
  const filters: Record<string, any> = {
    $or: searchFields.map((field) => ({
      [field]: { $containsi: searchTerm },
    })),
  };

  return getStrapiEntries<T>(contentType, {
    ...options,
    filters: { ...options.filters, ...filters },
  });
}
