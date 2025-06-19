async function fetchAPIData(endpoint: string) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Error when trying to fetch the data from the API.");
        }

        const json = await response.json();
        if (!json) {
            throw new Error("No data returned from API.");
        }

        return json;
    } catch (error: any) {
        throw new Error(error.message ?? "Unknown error occured during data fetching.");
    }
}

export default fetchAPIData;