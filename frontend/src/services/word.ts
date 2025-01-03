const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || ""

export async function checkGuess(guess: string): Promise<ApiResponse> {
  // TODO: Implement some sort of caching if time allows

  if (!SERVICE_URL) {
    throw new Error("SERVICE_URL is not set")
  }

  try {
    const response = await fetch(`${SERVICE_URL}/api/word?guess=${guess}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const errorData = await response.json()

      throw new Error(errorData.message || "Network error")
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("Unknown error while checking guess")
  }
}

/*
curl 'http://localhost:5000/api/word?guess=ADWWW'
*/
