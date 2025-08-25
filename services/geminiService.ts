
import { GoogleGenAI, Type } from '@google/genai';
import type { BookingDetails, FareEstimate, CarOption } from '../types';
import { CarType } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fareSchema = {
  type: Type.OBJECT,
  properties: {
    fare: {
      type: Type.NUMBER,
      description: "The estimated fare in Indian Rupees (INR). Should be a plausible number like 850, 1200, 2500."
    },
    distance: {
      type: Type.STRING,
      description: "The estimated travel distance in kilometers, e.g., '25 km'."
    },
    duration: {
      type: Type.STRING,
      description: "The estimated travel duration, e.g., '45 minutes' or '1 hour 15 minutes'."
    },
    description: {
      type: Type.STRING,
      description: "A brief, one-sentence description of the suggested route or journey, mentioning a landmark if possible."
    },
  },
  required: ["fare", "distance", "duration", "description"],
};

export const getFareEstimate = async (details: BookingDetails, carType: CarType, carRates: Record<CarType, CarOption>): Promise<FareEstimate> => {
  const selectedCar = carRates[carType];
  
  const prompt = `
    You are a fare estimation system for "Mussoorie Cab", a premium taxi service in the hill station of Mussoorie, India.
    Your task is to calculate a fare estimate based on a SPECIFIC pricing model and trip details.

    **Pricing Model for ${selectedCar.name}:**
    - Base Fare: ₹${selectedCar.baseFare}
    - Per Kilometer Rate: ₹${selectedCar.perKm} per km

    **Trip Details:**
    - Pickup Location: ${details.pickup}
    - Drop-off Location: ${details.dropoff}
    - Date: ${details.date}
    - Time: ${details.time}

    **Your Calculation Steps:**
    1.  First, estimate the travel distance in kilometers between the pickup and drop-off locations. Consider the winding, mountainous roads of Mussoorie.
    2.  Calculate the total fare using this formula: **Fare = Base Fare + (Estimated Distance * Per Kilometer Rate)**. The final fare should be a whole number (rounded).
    3.  Estimate the travel duration.
    4.  Provide a brief, one-sentence description of the route.

    Return the result in the specified JSON format. The 'fare' property in the JSON must be the result of your calculation using the provided formula.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: fareSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    // Basic validation to ensure the parsed object matches our expected structure
    if (
      typeof parsedResponse.fare === 'number' &&
      typeof parsedResponse.distance === 'string' &&
      typeof parsedResponse.duration === 'string' &&
      typeof parsedResponse.description === 'string'
    ) {
      return parsedResponse as FareEstimate;
    } else {
      throw new Error("Invalid format received from API");
    }

  } catch (error) {
    console.error("Error fetching fare estimate from Gemini API:", error);
    throw new Error("Could not retrieve fare estimate. The AI model may be temporarily unavailable.");
  }
};