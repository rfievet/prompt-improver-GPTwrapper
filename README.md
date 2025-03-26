# Prompt Improver GPT Wrapper

Prompt Improver GPT Wrapper is a Chrome extension that enhances your productivity while using ChatGPT. With this tool, you can enter a basic prompt, which is then enhanced by a locally running LLM (via [Ollama](https://ollama.com/)), and automatically inserted into the ChatGPT input field for immediate use.

![screenshot](https://github.com/user-attachments/assets/c88cc65d-39ca-4ed4-9895-0050a40afe73)

## ✨ Key Features

- 🚀 **Prompt Enhancement** – Transforms basic user prompts into high-quality inputs for ChatGPT using a local LLM (default: `mistral-small`).
- 🧠 **Local AI Integration** – Uses [Ollama](https://ollama.com/) for fast, private, and offline prompt enhancement.
- ⌨️ **Keyboard Shortcut** – Launch the extension quickly with `Ctrl+Shift+G` on Windows/Linux or `Command+Shift+L` on macOS.
- 🖱️ **One-Click Usage** – Submit prompts directly to ChatGPT from the extension popup.

## 🧰 Requirements

- Google Chrome (latest version recommended)
- [Ollama installed and running](https://ollama.com/download)
- A local model like `mistral-small` added to Ollama (`ollama run mistral`)

## 🔧 Installation

1. Clone or download this repository.
2. Go to `chrome://extensions/` in Chrome.
3. Enable **Developer Mode** in the top right corner.
4. Click **Load unpacked** and select the folder containing this project.
5. The extension icon will now appear in your Chrome toolbar.

For a visual guide, refer to this article:  
👉 [How to install a custom Chrome extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)

## 🧪 How It Works

1. Type your basic prompt in the popup input field.
2. The prompt is sent to `http://localhost:11434/api/generate`.
3. Ollama uses the selected local LLM to improve your prompt.
4. The enhanced prompt is injected into the ChatGPT input field and submitted automatically.

## 🗂️ Project Structure

- `manifest.json`: Chrome extension configuration.
- `popup.html`: UI for entering prompts.
- `popup.js`: Script for processing and sending prompts.
- `content.js`: Injects enhanced prompts into ChatGPT.
- `background.js`: (Optional) Background service worker logic.

## 🛠️ Configuration

- Make sure your local Ollama server is running before using the extension.
- The model name can be customized in `popup.js` (`model: "mistral-small"`).

## 💡 Example

Input:  
```
make a list of features
```

Output (via Ollama):  
```
As a senior product manager, create a detailed list of user-facing features for a SaaS productivity platform, including functionality, benefits, and use-case scenarios.
```

## 📌 Troubleshooting

- Ensure `Ollama` is running on `localhost:11434`.
- Make sure the correct model is installed and running locally.
- Keep the ChatGPT tab open when using the extension.

## 📃 License

This project is licensed under the MIT License.
