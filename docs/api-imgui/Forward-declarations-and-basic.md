# Forward declarations and basic types
## Forward declarations
## Enums/Flags (declared as int for compatibility with old C++, to allow using as flags and to not pollute the top of this file)
- Tip: Use your programming IDE navigation facilities on the names in the _central column_ below to find the actual flags/enum lists!
In Visual Studio IDE: CTRL+comma ("Edit.NavigateTo") can follow symbols in comments, whereas CTRL+F12 ("Edit.GoToImplementation") cannot.
With Visual Assist installed: ALT+G ("VAssistX.GoToImplementation") can also follow symbols in comments.
## Other types
## Decoded character types
(we generally use UTF-8 encoded string in the API. This is storage specifically for a decoded character used for keyboard input and display)
## Basic scalar data types
## 2D vector (often used to store positions or sizes)
## struct  **<struct> ImVec2**
## 4D vector (often used to store floating-point colors)
## struct  **<struct> ImVec4**
