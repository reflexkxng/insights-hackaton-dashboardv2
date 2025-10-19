import mockData from '../public/mockData.json';

export async function fetchMockInsights(location: string) {
  return {
    ...mockData,
    location,
    timestamp: new Date().toISOString(),
    dataSource: "local-mock",
  };
}