from pathlib import Path
import time
import requests
from openai import OpenAI, RateLimitError

# Set your OpenAI API key here
api_key = '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'

# Initialize OpenAI with API key
openai = OpenAI(api_key=api_key)

# Configure the OpenAI client with error handling options
openai.api_retry = 2  # Number of retries (0 to disable)
openai.timeout = 600  # Timeout in seconds (default is 600)

def main() -> None:
    # Define the directory for the audio files
    audio_directory = Path(__file__).parent / "audio_files"
    audio_directory.mkdir(parents=True, exist_ok=True)


    # Your game data dictionary
    gameData = {
        "Beginner": {
        "1": [
            {"words": ["Amiable", "Arduous", "Complex", "fuss",  "Kind", "Luxurious", "nun", "Opaque", "Selfish","Spotless",  "Virtuous",   ]}
        ],
        }
    }


    # Extracting unique words from the dictionary
    unique_words = set()
    for level in gameData.values():
        for sublevel in level.values():
            for item in sublevel:
                unique_words.update(item["words"])

    # Convert the set to a list
    words = sorted(list(unique_words))


    # Initial delay
    delay_seconds = 1.2


    print("Audio database creation complete.")
    for word in words:
        attempt = 0  # Counter for the number of attempts
        max_attempts = 500  # Maximum number of retries

        while attempt < max_attempts:
            try:
                print(f"Processing word: {word}")
                speech_file_path = audio_directory / f"{word}.mp3"

                # Create text-to-speech audio file
                response = openai.audio.speech.create(
                    model="tts-1",
                    voice="shimmer",
                    input=f"{word}",
                )

                response.stream_to_file(speech_file_path)

                break  # Break the loop if successful

            except RateLimitError as e:
                print("Rate limit reached. Waiting for 20 seconds before retrying...")
                time.sleep(20)  # Wait for 20 seconds
                attempt += 1

            except Exception as e:
                print(f"An error occurred: {str(e)}")
                break  # Exit the loop on other errors

        time.sleep(10)  # Wait before processing the next word

    print("Audio database creation complete.")

if __name__ == "__main__":
    main()