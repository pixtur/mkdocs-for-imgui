# Flags & Enumerations
## Flags for ImGui::Begin()
## enum  **<enum> ImGuiWindowFlags_**
### [Internal]


### [Obsolete]


## Flags for ImGui::InputText()
## enum  **<enum> ImGuiInputTextFlags_**
### [Internal]


## Flags for ImGui::TreeNodeEx(), ImGui::CollapsingHeader*()
## enum  **<enum> ImGuiTreeNodeFlags_**
## Flags for ImGui::Selectable()
## enum  **<enum> ImGuiSelectableFlags_**
## Flags for ImGui::BeginCombo()
## enum  **<enum> ImGuiComboFlags_**
## Flags for ImGui::BeginTabBar()
## enum  **<enum> ImGuiTabBarFlags_**
## Flags for ImGui::BeginTabItem()
## enum  **<enum> ImGuiTabItemFlags_**
## Flags for ImGui::IsWindowFocused()
## enum  **<enum> ImGuiFocusedFlags_**
## Flags for ImGui::IsItemHovered(), ImGui::IsWindowHovered()
Note: if you are trying to check whether your mouse should be dispatched to Dear ImGui or to your app, you should use 'io.WantCaptureMouse' instead! Please read the FAQ!
Note: windows with the ImGuiWindowFlags_NoInputs flag are ignored by IsWindowHovered() calls.
## enum  **<enum> ImGuiHoveredFlags_**
## Flags for ImGui::BeginDragDropSource(), ImGui::AcceptDragDropPayload()
## enum  **<enum> ImGuiDragDropFlags_**
### BeginDragDropSource() flags


### AcceptDragDropPayload() flags


## Standard Drag and Drop payload types. You can define you own payload types using short strings. Types starting with '_' are defined by Dear ImGui.
## A primary data type
## enum  **<enum> ImGuiDataType_**
## A cardinal direction
## enum  **<enum> ImGuiDir_**
## User fill ImGuiIO.KeyMap[] array with indices into the ImGuiIO.KeysDown[512] array
## enum  **<enum> ImGuiKey_**
## To test io.KeyMods (which is a combination of individual fields io.KeyCtrl, io.KeyShift, io.KeyAlt set by user/back-end)
## enum  **<enum> ImGuiKeyModFlags_**
## Gamepad/Keyboard navigation
Keyboard: Set io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard to enable. NewFrame() will automatically fill io.NavInputs[] based on your io.KeysDown[] + io.KeyMap[] arrays.
Gamepad:  Set io.ConfigFlags |= ImGuiConfigFlags_NavEnableGamepad to enable. Back-end: set ImGuiBackendFlags_HasGamepad and fill the io.NavInputs[] fields before calling NewFrame(). Note that io.NavInputs[] is cleared by EndFrame().
Read instructions in imgui.cpp for more details. Download PNG/PSD at http://goo.gl/9LgVZW.
## enum  **<enum> ImGuiNavInput_**
### Gamepad Mapping


### [Internal] Don't use directly! This is used internally to differentiate keyboard from gamepad inputs for behaviors that require to differentiate them.
Keyboard behavior that have no corresponding gamepad mapping (e.g. CTRL+TAB) will be directly reading from io.KeysDown[] instead of io.NavInputs[].


## Configuration flags stored in io.ConfigFlags. Set by user/application.
## enum  **<enum> ImGuiConfigFlags_**
### User storage (to allow your back-end/engine to communicate to code that may be shared between multiple projects. Those flags are not used by core Dear ImGui)


## Back-end capabilities flags stored in io.BackendFlags. Set by imgui_impl_xxx or custom back-end.
## enum  **<enum> ImGuiBackendFlags_**
## Enumeration for PushStyleColor() / PopStyleColor()
## enum  **<enum> ImGuiCol_**
### Obsolete names (will be removed)


## Enumeration for PushStyleVar() / PopStyleVar() to temporarily modify the ImGuiStyle structure.
- The enum only refers to fields of ImGuiStyle which makes sense to be pushed/popped inside UI code.
During initialization or between frames, feel free to just poke into ImGuiStyle directly.
- Tip: Use your programming IDE navigation facilities on the names in the _second column_ below to find the actual members and their description.
In Visual Studio IDE: CTRL+comma ("Edit.NavigateTo") can follow symbols in comments, whereas CTRL+F12 ("Edit.GoToImplementation") cannot.
With Visual Assist installed: ALT+G ("VAssistX.GoToImplementation") can also follow symbols in comments.
- When changing this enum, you need to update the associated internal table GStyleVarInfo[] accordingly. This is where we link enum values to members offset/type.
## enum  **<enum> ImGuiStyleVar_**
### Enum name --------------------- // Member in ImGuiStyle structure (see ImGuiStyle for descriptions)


### Obsolete names (will be removed)


## Flags for ColorEdit3() / ColorEdit4() / ColorPicker3() / ColorPicker4() / ColorButton()
## enum  **<enum> ImGuiColorEditFlags_**
### User Options (right-click on widget to change some of them).


### Defaults Options. You can set application defaults using SetColorEditOptions(). The intent is that you probably don't want to
override them in most of your calls. Let the user choose via the option menu and/or call SetColorEditOptions() once during startup.


### [Internal] Masks


### Obsolete names (will be removed)


## Identify a mouse button.
Those values are guaranteed to be stable and we frequently use 0/1 directly. Named enums provided for convenience.
## enum  **<enum> ImGuiMouseButton_**
## Enumeration for GetMouseCursor()
User code may request binding to display given cursor by calling SetMouseCursor(), which is why we have some cursors that are marked unused here
## enum  **<enum> ImGuiMouseCursor_**
### Obsolete names (will be removed)


## Enumeration for ImGui::SetWindow***(), SetNextWindow***(), SetNextItem***() functions
Represent a condition.
Important: Treat as a regular enum! Do NOT combine multiple values using binary operators! All the functions above treat 0 as a shortcut to ImGuiCond_Always.
## enum  **<enum> ImGuiCond_**
