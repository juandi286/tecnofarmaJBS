# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## AI Features (Genkit with Google AI)

This application uses Genkit to integrate with Google AI for features like product restock suggestions. To enable these features, you'll need a Google AI API key.

1.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Create a file named `.env` in the root of your project (if it doesn't already exist).
3.  Add your API key to the `.env` file like this:

    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY_HERE
    ```

4.  **Important**: Ensure that `.env` is listed in your `.gitignore` file to prevent your API key from being committed to version control. If you don't have a `.gitignore` file, you should create one and add `.env` to it.

After adding the API key, restart your development server for the changes to take effect.