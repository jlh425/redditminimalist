# redditminimalist

npm create vite@latest redditminimalist

npm install firebase

npm install react-google-button

npm install react-router-dom

npm install -D tailwindcss
    npx tailwindcss init
    Configure your template paths
    Add the paths to all of your template files in your tailwind.config.js file.
        /** @type {import('tailwindcss').Config} */
                    module.exports = {
                    content: ["./src/**/*.{html,js}"],
                    theme: {
                        extend: {},
                    },
                    plugins: [],
                    }
    Add the Tailwind directives to your CSS
        Add the @tailwind directives for each of Tailwind’s layers to your main CSS file.
        add the following to the top of css pages   @tailwind base;
                                                    @tailwind components;
                                                    @tailwind utilities;
    Start the Tailwind CLI build process
        Run the CLI tool to scan your template files for classes and build your CSS.
        npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
    Start using Tailwind in your HTML

npm install @reduxjs/toolkit