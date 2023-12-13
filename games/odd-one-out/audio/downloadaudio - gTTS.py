from pathlib import Path
import time
from gtts import gTTS

def main() -> None:
    # Define the directory for the audio files
    audio_directory = Path(__file__).parent / "audio_files"
    audio_directory.mkdir(parents=True, exist_ok=True)

    # Your game data dictionary
    gameData = {
        "Beginner": {
            "1": [
                {"words": ["Amiable", "Arduous", "Complex", "fuss", "Kind", "Luxurious", "nun", "Opaque", "Selfish", "Spotless", "Virtuous"]}
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

    for word in words:
        print(f"Processing word: {word}")
        speech_file_path = audio_directory / f"{word}.mp3"

        # Create text-to-speech audio file using gTTS
        tts = gTTS(word, lang='en')
        tts.save(str(speech_file_path))

        time.sleep(delay_seconds)  # Wait before processing the next word

    print("Audio database creation complete.")

if __name__ == "__main__":
    main()
