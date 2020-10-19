export async function getForexRatesApi() {
  const response = await fetch("https://api.exchangeratesapi.io/latest", {
    method: "GET",
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


