# ImGui: Dear ImGui end-user API
// (This is a namespace. You can add extra ImGui:: functions in your own separate file. Please don't modify imgui source files!)
## namespace  **<namespace> ImGui**
### Context creation and access
Each context create its own ImFontAtlas by default. You may instance one yourself and pass it to CreateContext() to share a font atlas between imgui contexts.
None of those functions is reliant on the current context.



``` c
ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL)
```

``` c
void DestroyContext(ImGuiContext* ctx = NULL)
```
NULL = destroy current context

``` c
ImGuiContext* GetCurrentContext()
```

``` c
void SetCurrentContext(ImGuiContext* ctx)
```
### Main



``` c
ImGuiIO& GetIO()
```
access the IO structure (mouse/keyboard/gamepad inputs, time, various configuration options/flags)

``` c
ImGuiStyle& GetStyle()
```
access the Style structure (colors, sizes). Always use PushStyleCol(), PushStyleVar() to modify style mid-frame!

``` c
void NewFrame()
```
start a new Dear ImGui frame, you can submit any command from this point until Render()/EndFrame().

``` c
void EndFrame()
```
ends the Dear ImGui frame. automatically called by Render(). If you don't need to render data (skipping rendering) you may call EndFrame() without Render()... but you'll have wasted CPU already! If you don't need to render, better to not create any windows and not call NewFrame() at all!

``` c
void Render()
```
ends the Dear ImGui frame, finalize the draw data. You can get call GetDrawData() to obtain it and run your rendering function (up to v1.60, this used to call io.RenderDrawListsFn(). Nowadays, we allow and prefer calling your render function yourself.)

``` c
ImDrawData* GetDrawData()
```
valid after Render() and until the next call to NewFrame(). this is what you have to render.
### Demo, Debug, Information



``` c
void ShowDemoWindow(bool* p_open = NULL)
```
create Demo window (previously called ShowTestWindow). demonstrate most ImGui features. call this to learn about the library! try to make it always available in your application!

``` c
void ShowAboutWindow(bool* p_open = NULL)
```
create About window. display Dear ImGui version, credits and build/system information.

``` c
void ShowMetricsWindow(bool* p_open = NULL)
```
create Debug/Metrics window. display Dear ImGui internals: draw commands (with individual draw calls and vertices), window list, basic internal state, etc.

``` c
void ShowStyleEditor(ImGuiStyle* ref = NULL)
```
add style editor block (not a window). you can pass in a reference ImGuiStyle structure to compare to, revert to and save to (else it uses the default style)

``` c
bool ShowStyleSelector(const char* label)
```
add style selector block (not a window), essentially a combo listing the default styles.

``` c
void ShowFontSelector(const char* label)
```
add font selector block (not a window), essentially a combo listing the loaded fonts.

``` c
void ShowUserGuide()
```
add basic help/info block (not a window): how to manipulate ImGui as a end-user (mouse/keyboard controls).
### Styles



``` c
void StyleColorsDark(ImGuiStyle* dst = NULL)
```
new, recommended style (default)

``` c
void StyleColorsClassic(ImGuiStyle* dst = NULL)
```
classic imgui style

``` c
void StyleColorsLight(ImGuiStyle* dst = NULL)
```
best used with borders and a custom, thicker font
### Windows
- Begin() = push window to the stack and start appending to it. End() = pop window from the stack.
- You may append multiple times to the same window during the same frame.
- Passing 'bool* p_open != NULL' shows a window-closing widget in the upper-right corner of the window,
which clicking will set the boolean to false when clicked.
- Begin() return false to indicate the window is collapsed or fully clipped, so you may early out and omit submitting
anything to the window. Always call a matching End() for each Begin() call, regardless of its return value!
[Important: due to legacy reason, this is inconsistent with most other functions such as BeginMenu/EndMenu,
BeginPopup/EndPopup, etc. where the EndXXX call should only be called if the corresponding BeginXXX function
returned true. Begin and BeginChild are the only odd ones out. Will be fixed in a future update.]
- Note that the bottom of window stack always contains a window called "Debug".



``` c
bool Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0)
```

``` c
void End()
```
### Child Windows
- Use child windows to begin into a self-contained independent scrolling/clipping regions within a host window. Child windows can embed their own child.
- For each independent axis of 'size': ==0.0f: use remaining host window size / >0.0f: fixed size / <0.0f: use remaining window size minus abs(size) / Each axis can use a different mode, e.g. ImVec2(0,400).
- BeginChild() returns false to indicate the window is collapsed or fully clipped, so you may early out and omit submitting anything to the window.
Always call a matching EndChild() for each BeginChild() call, regardless of its return value [as with Begin: this is due to legacy reason and inconsistent with most BeginXXX functions apart from the regular Begin() which behaves like BeginChild().]



``` c
bool BeginChild(const char* str_id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags flags = 0)
```

``` c
bool BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0,0), bool border = false, ImGuiWindowFlags flags = 0)
```

``` c
void EndChild()
```
### Windows Utilities
- 'current window' = the window we are appending into while inside a Begin()/End() block. 'next window' = next window we will Begin() into.



``` c
bool IsWindowAppearing()
```

``` c
bool IsWindowCollapsed()
```

``` c
bool IsWindowFocused(ImGuiFocusedFlags flags=0)
```
is current window focused? or its root/child, depending on flags. see flags for options.

``` c
bool IsWindowHovered(ImGuiHoveredFlags flags=0)
```
is current window hovered (and typically: not blocked by a popup/modal)? see flags for options. NB: If you are trying to check whether your mouse should be dispatched to imgui or to your app, you should use the 'io.WantCaptureMouse' boolean for that! Please read the FAQ!

``` c
ImDrawList* GetWindowDrawList()
```
get draw list associated to the current window, to append your own drawing primitives

``` c
ImVec2 GetWindowPos()
```
get current window position in screen space (useful if you want to do your own drawing via the DrawList API)

``` c
ImVec2 GetWindowSize()
```
get current window size

``` c
float GetWindowWidth()
```
get current window width (shortcut for GetWindowSize().x)

``` c
float GetWindowHeight()
```
get current window height (shortcut for GetWindowSize().y)
### Prefer using SetNextXXX functions (before Begin) rather that SetXXX functions (after Begin).



``` c
void SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0,0))
```
set next window position. call before Begin(). use pivot=(0.5f,0.5f) to center on given point, etc.

``` c
void SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0)
```
set next window size. set axis to 0.0f to force an auto-fit on this axis. call before Begin()

``` c
void SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeCallback custom_callback = NULL, void* custom_callback_data = NULL)
```
set next window size limits. use -1,-1 on either X/Y axis to preserve the current size. Sizes will be rounded down. Use callback to apply non-trivial programmatic constraints.

``` c
void SetNextWindowContentSize(const ImVec2& size)
```
set next window content size (~ scrollable client area, which enforce the range of scrollbars). Not including window decorations (title bar, menu bar, etc.) nor WindowPadding. set an axis to 0.0f to leave it automatic. call before Begin()

``` c
void SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0)
```
set next window collapsed state. call before Begin()

``` c
void SetNextWindowFocus()
```
set next window to be focused / top-most. call before Begin()

``` c
void SetNextWindowBgAlpha(float alpha)
```
set next window background color alpha. helper to easily override the Alpha component of ImGuiCol_WindowBg/ChildBg/PopupBg. you may also use ImGuiWindowFlags_NoBackground.

``` c
void SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0)
```
(not recommended) set current window position - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.

``` c
void SetWindowSize(const ImVec2& size, ImGuiCond cond = 0)
```
(not recommended) set current window size - call within Begin()/End(). set to ImVec2(0,0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.

``` c
void SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0)
```
(not recommended) set current window collapsed state. prefer using SetNextWindowCollapsed().

``` c
void SetWindowFocus()
```
(not recommended) set current window to be focused / top-most. prefer using SetNextWindowFocus().

``` c
void SetWindowFontScale(float scale)
```
set font scale. Adjust IO.FontGlobalScale if you want to scale all windows. This is an old API! For correct scaling, prefer to reload font + rebuild ImFontAtlas + call style.ScaleAllSizes().

``` c
void SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0)
```
set named window position.

``` c
void SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0)
```
set named window size. set axis to 0.0f to force an auto-fit on this axis.

``` c
void SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0)
```
set named window collapsed state

``` c
void SetWindowFocus(const char* name)
```
set named window to be focused / top-most. use NULL to remove focus.
### Content region
- Those functions are bound to be redesigned soon (they are confusing, incomplete and return values in local window coordinates which increases confusion)



``` c
ImVec2 GetContentRegionMax()
```
current content boundaries (typically window boundaries including scrolling, or current column boundaries), in windows coordinates

``` c
ImVec2 GetContentRegionAvail()
```
== GetContentRegionMax() - GetCursorPos()

``` c
ImVec2 GetWindowContentRegionMin()
```
content boundaries min (roughly (0,0)-Scroll), in window coordinates

``` c
ImVec2 GetWindowContentRegionMax()
```
content boundaries max (roughly (0,0)+Size-Scroll) where Size can be override with SetNextWindowContentSize(), in window coordinates

``` c
float GetWindowContentRegionWidth()
```


### Windows Scrolling



``` c
float GetScrollX()
```
get scrolling amount [0..GetScrollMaxX()]

``` c
float GetScrollY()
```
get scrolling amount [0..GetScrollMaxY()]

``` c
float GetScrollMaxX()
```
get maximum scrolling amount ~~ ContentSize.X - WindowSize.X

``` c
float GetScrollMaxY()
```
get maximum scrolling amount ~~ ContentSize.Y - WindowSize.Y

``` c
void SetScrollX(float scroll_x)
```
set scrolling amount [0..GetScrollMaxX()]

``` c
void SetScrollY(float scroll_y)
```
set scrolling amount [0..GetScrollMaxY()]

``` c
void SetScrollHereX(float center_x_ratio = 0.5f)
```
adjust scrolling amount to make current cursor position visible. center_x_ratio=0.0: left, 0.5: center, 1.0: right. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.

``` c
void SetScrollHereY(float center_y_ratio = 0.5f)
```
adjust scrolling amount to make current cursor position visible. center_y_ratio=0.0: top, 0.5: center, 1.0: bottom. When using to make a "default/current item" visible, consider using SetItemDefaultFocus() instead.

``` c
void SetScrollFromPosX(float local_x, float center_x_ratio = 0.5f)
```
adjust scrolling amount to make given position visible. Generally GetCursorStartPos() + offset to compute a valid position.

``` c
void SetScrollFromPosY(float local_y, float center_y_ratio = 0.5f)
```
adjust scrolling amount to make given position visible. Generally GetCursorStartPos() + offset to compute a valid position.
### Parameters stacks (shared)



``` c
void PushFont(ImFont* font)
```
use NULL as a shortcut to push default font

``` c
void PopFont()
```

``` c
void PushStyleColor(ImGuiCol idx, ImU32 col)
```

``` c
void PushStyleColor(ImGuiCol idx, const ImVec4& col)
```

``` c
void PopStyleColor(int count = 1)
```

``` c
void PushStyleVar(ImGuiStyleVar idx, float val)
```

``` c
void PushStyleVar(ImGuiStyleVar idx, const ImVec2& val)
```

``` c
void PopStyleVar(int count = 1)
```

``` c
ImFont* GetFont()
```
get current font

``` c
float GetFontSize()
```
get current font size (= height in pixels) of current font with current scale applied

``` c
ImVec2 GetFontTexUvWhitePixel()
```
get UV coordinate for a while pixel, useful to draw custom shapes via the ImDrawList API

``` c
ImU32 GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f)
```
retrieve given style color with style alpha applied and optional extra alpha multiplier

``` c
ImU32 GetColorU32(const ImVec4& col)
```
retrieve given color with style alpha applied

``` c
ImU32 GetColorU32(ImU32 col)
```
retrieve given color with style alpha applied
### Parameters stacks (current window)



``` c
void PushItemWidth(float item_width)
```
push width of items for common large "item+label" widgets. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side). 0.0f = default to ~2/3 of windows width,

``` c
void PopItemWidth()
```

``` c
void SetNextItemWidth(float item_width)
```
set width of the _next_ common large "item+label" widget. >0.0f: width in pixels, <0.0f align xx pixels to the right of window (so -1.0f always align width to the right side)

``` c
float CalcItemWidth()
```
width of item given pushed settings and current cursor position. NOT necessarily the width of last item unlike most 'Item' functions.

``` c
void PushTextWrapPos(float wrap_local_pos_x = 0.0f)
```
push word-wrapping position for Text*() commands. < 0.0f: no wrapping; 0.0f: wrap to end of window (or column); > 0.0f: wrap at 'wrap_pos_x' position in window local space

``` c
void PopTextWrapPos()
```

``` c
void PushAllowKeyboardFocus(bool allow_keyboard_focus)
```
allow focusing using TAB/Shift-TAB, enabled by default but you can disable it for certain widgets

``` c
void PopAllowKeyboardFocus()
```

``` c
void PushButtonRepeat(bool repeat)
```
in 'repeat' mode, Button*() functions return repeated true in a typematic manner (using io.KeyRepeatDelay/io.KeyRepeatRate setting). Note that you can call IsItemActive() after any Button() to tell if the button is held in the current frame.

``` c
void PopButtonRepeat()
```
### Cursor / Layout
- By "cursor" we mean the current output position.
- The typical widget behavior is to output themselves at the current cursor position, then move the cursor one line down.
- You can call SameLine() between widgets to undo the last carriage return and output at the right of the preceeding widget.
- Attention! We currently have inconsistencies between window-local and absolute positions we will aim to fix with future API:
Window-local coordinates:   SameLine(), GetCursorPos(), SetCursorPos(), GetCursorStartPos(), GetContentRegionMax(), GetWindowContentRegion*(), PushTextWrapPos()
Absolute coordinate:        GetCursorScreenPos(), SetCursorScreenPos(), all ImDrawList:: functions.



``` c
void Separator()
```
separator, generally horizontal. inside a menu bar or in horizontal layout mode, this becomes a vertical separator.

``` c
void SameLine(float offset_from_start_x=0.0f, float spacing=-1.0f)
```
call between widgets or groups to layout them horizontally. X position given in window coordinates.

``` c
void NewLine()
```
undo a SameLine() or force a new line when in an horizontal-layout context.

``` c
void Spacing()
```
add vertical spacing.

``` c
void Dummy(const ImVec2& size)
```
add a dummy item of given size. unlike InvisibleButton(), Dummy() won't take the mouse click or be navigable into.

``` c
void Indent(float indent_w = 0.0f)
```
move content position toward the right, by style.IndentSpacing or indent_w if != 0

``` c
void Unindent(float indent_w = 0.0f)
```
move content position back to the left, by style.IndentSpacing or indent_w if != 0

``` c
void BeginGroup()
```
lock horizontal starting position

``` c
void EndGroup()
```
unlock horizontal starting position + capture the whole group bounding box into one "item" (so you can use IsItemHovered() or layout primitives such as SameLine() on whole group, etc.)

``` c
ImVec2 GetCursorPos()
```
cursor position in window coordinates (relative to window position)

``` c
float GetCursorPosX()
```
  (some functions are using window-relative coordinates, such as: GetCursorPos, GetCursorStartPos, GetContentRegionMax, GetWindowContentRegion* etc.

``` c
float GetCursorPosY()
```
   other functions such as GetCursorScreenPos or everything in ImDrawList::

``` c
void SetCursorPos(const ImVec2& local_pos)
```
   are using the main, absolute coordinate system.

``` c
void SetCursorPosX(float local_x)
```
   GetWindowPos() + GetCursorPos() == GetCursorScreenPos() etc.)

``` c
void SetCursorPosY(float local_y)
```
    IMGUI_API ImVec2        GetCursorStartPos();                                            // initial cursor position in window coordinates

``` c
ImVec2 GetCursorScreenPos()
```
cursor position in absolute screen coordinates [0..io.DisplaySize] (useful to work with ImDrawList API)

``` c
void SetCursorScreenPos(const ImVec2& pos)
```
cursor position in absolute screen coordinates [0..io.DisplaySize]

``` c
void AlignTextToFramePadding()
```
vertically align upcoming text baseline to FramePadding.y so that it will align properly to regularly framed items (call if you have text on a line before a framed item)

``` c
float GetTextLineHeight()
```
~ FontSize

``` c
float GetTextLineHeightWithSpacing()
```
~ FontSize + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of text)

``` c
float GetFrameHeight()
```
~ FontSize + style.FramePadding.y * 2

``` c
float GetFrameHeightWithSpacing()
```
~ FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y (distance in pixels between 2 consecutive lines of framed widgets)
### ID stack/scopes
- Read the FAQ for more details about how ID are handled in dear imgui. If you are creating widgets in a loop you most
likely want to push a unique identifier (e.g. object pointer, loop index) to uniquely differentiate them.
- The resulting ID are hashes of the entire stack.
- You can also use the "Label##foobar" syntax within widget label to distinguish them from each others.
- In this header file we use the "label"/"name" terminology to denote a string that will be displayed and used as an ID,
whereas "str_id" denote a string that is only used as an ID and not normally displayed.



``` c
void PushID(const char* str_id)
```
push string into the ID stack (will hash string).

``` c
void PushID(const char* str_id_begin, const char* str_id_end)
```
push string into the ID stack (will hash string).

``` c
void PushID(const void* ptr_id)
```
push pointer into the ID stack (will hash pointer).

``` c
void PushID(int int_id)
```
push integer into the ID stack (will hash integer).

``` c
void PopID()
```
pop from the ID stack.

``` c
ImGuiID GetID(const char* str_id)
```
calculate unique ID (hash of whole ID stack + given parameter). e.g. if you want to query into ImGuiStorage yourself

``` c
ImGuiID GetID(const char* str_id_begin, const char* str_id_end)
```

``` c
ImGuiID GetID(const void* ptr_id)
```
### Widgets: Text



``` c
void TextUnformatted(const char* text, const char* text_end = NULL)
```
raw text without formatting. Roughly equivalent to Text("%s", text) but: A) doesn't require null terminated string if 'text_end' is specified, B) it's faster, no memory copy is done, no buffer size limits, recommended for long chunks of text.

``` c
void Text(const char* fmt, ...)                                      IM_FMTARGS(1)
```
formatted text

``` c
void TextV(const char* fmt, va_list args)                            IM_FMTLIST(1)
```

``` c
void TextColored(const ImVec4& col, const char* fmt, ...)            IM_FMTARGS(2)
```
shortcut for PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();

``` c
void TextColoredV(const ImVec4& col, const char* fmt, va_list args)  IM_FMTLIST(2)
```

``` c
void TextDisabled(const char* fmt, ...)                              IM_FMTARGS(1)
```
shortcut for PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();

``` c
void TextDisabledV(const char* fmt, va_list args)                    IM_FMTLIST(1)
```

``` c
void TextWrapped(const char* fmt, ...)                               IM_FMTARGS(1)
```
shortcut for PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();. Note that this won't work on an auto-resizing window if there's no other widgets to extend the window width, yoy may need to set a size using SetNextWindowSize().

``` c
void TextWrappedV(const char* fmt, va_list args)                     IM_FMTLIST(1)
```

``` c
void LabelText(const char* label, const char* fmt, ...)              IM_FMTARGS(2)
```
display text+label aligned the same way as value+label widgets

``` c
void LabelTextV(const char* label, const char* fmt, va_list args)    IM_FMTLIST(2)
```

``` c
void BulletText(const char* fmt, ...)                                IM_FMTARGS(1)
```
shortcut for Bullet()+Text()

``` c
void BulletTextV(const char* fmt, va_list args)                      IM_FMTLIST(1)
```
### Widgets: Main
- Most widgets return true when the value has been changed or when pressed/selected
- You may also use one of the many IsItemXXX functions (e.g. IsItemActive, IsItemHovered, etc.) to query widget state.



``` c
bool Button(const char* label, const ImVec2& size = ImVec2(0,0))
```
button

``` c
bool SmallButton(const char* label)
```
button with FramePadding=(0,0) to easily embed within text

``` c
bool InvisibleButton(const char* str_id, const ImVec2& size)
```
button behavior without the visuals, frequently useful to build custom behaviors using the public api (along with IsItemActive, IsItemHovered, etc.)

``` c
bool ArrowButton(const char* str_id, ImGuiDir dir)
```
square button with an arrow shape

``` c
void Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0), const ImVec2& uv1 = ImVec2(1,1), const ImVec4& tint_col = ImVec4(1,1,1,1), const ImVec4& border_col = ImVec4(0,0,0,0))
```

``` c
bool ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0,0),  const ImVec2& uv1 = ImVec2(1,1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0,0,0,0), const ImVec4& tint_col = ImVec4(1,1,1,1))
```
<0 frame_padding uses default frame padding settings. 0 for no padding

``` c
bool Checkbox(const char* label, bool* v)
```

``` c
bool CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value)
```

``` c
bool RadioButton(const char* label, bool active)
```
use with e.g. if (RadioButton("one", my_value==1)) { my_value = 1; }

``` c
bool RadioButton(const char* label, int* v, int v_button)
```
shortcut to handle the above pattern when value is an integer

``` c
void ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-1,0), const char* overlay = NULL)
```

``` c
void Bullet()
```
draw a small circle and keep the cursor on the same line. advance cursor x position by GetTreeNodeToLabelSpacing(), same distance that TreeNode() uses
### Widgets: Combo Box
- The BeginCombo()/EndCombo() api allows you to manage your contents and selection state however you want it, by creating e.g. Selectable() items.
- The old Combo() api are helpers over BeginCombo()/EndCombo() which are kept available for convenience purpose.



``` c
bool BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0)
```

``` c
void EndCombo()
```
only call EndCombo() if BeginCombo() returns true!

``` c
bool Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1)
```

``` c
bool Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1)
```
Separate items with \0 within a string, end item-list with \0\0. e.g. "One\0Two\0Three\0"

``` c
bool Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1)
```
### Widgets: Drags
- CTRL+Click on any drag box to turn them into an input box. Manually input values aren't clamped and can go off-bounds.
- For all the Float2/Float3/Float4/Int2/Int3/Int4 versions of every functions, note that a 'float v[X]' function argument is the same as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible. You can pass address of your first element out of a contiguous set, e.g. &myvector.x
- Adjust format string to decorate the value with a prefix, a suffix, or adapt the editing and display precision e.g. "%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1; etc.
- Speed are per-pixel of mouse movement (v_speed=0.2f: mouse needs to move by 5 pixels to increase value by 1). For gamepad/keyboard navigation, minimum speed is Max(v_speed, minimum_step_at_given_precision).
- Use v_min < v_max to clamp edits to given limits. Note that CTRL+Click manual input can override those limits.
- Use v_max = FLT_MAX / INT_MAX etc to avoid clamping to a maximum, same with v_min = -FLT_MAX / INT_MIN to avoid clamping to a minimum.
- Use v_min > v_max to lock edits.



``` c
bool DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", float power = 1.0f)
```
If v_min >= v_max we have no bound

``` c
bool DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", const char* format_max = NULL, float power = 1.0f)
```

``` c
bool DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d")
```
If v_min >= v_max we have no bound

``` c
bool DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d")
```

``` c
bool DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d")
```

``` c
bool DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d")
```

``` c
bool DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", const char* format_max = NULL)
```

``` c
bool DragScalar(const char* label, ImGuiDataType data_type, void* p_data, float v_speed, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, float power = 1.0f)
```

``` c
bool DragScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, float v_speed, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, float power = 1.0f)
```
### Widgets: Sliders
- CTRL+Click on any slider to turn them into an input box. Manually input values aren't clamped and can go off-bounds.
- Adjust format string to decorate the value with a prefix, a suffix, or adapt the editing and display precision e.g. "%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1; etc.



``` c
bool SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", float power = 1.0f)
```
adjust format to decorate the value with a prefix or a suffix for in-slider labels or unit display. Use power!=1.0 for power curve sliders

``` c
bool SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f, const char* format = "%.0f deg")
```

``` c
bool SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d")
```

``` c
bool SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d")
```

``` c
bool SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d")
```

``` c
bool SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d")
```

``` c
bool SliderScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, float power = 1.0f)
```

``` c
bool SliderScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_min, const void* p_max, const char* format = NULL, float power = 1.0f)
```

``` c
bool VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", float power = 1.0f)
```

``` c
bool VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d")
```

``` c
bool VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, float power = 1.0f)
```
### Widgets: Input with Keyboard
- If you want to use InputText() with std::string or any custom dynamic string type, see misc/cpp/imgui_stdlib.h and comments in imgui_demo.cpp.
- Most of the ImGuiInputTextFlags flags are only useful for InputText() and not for InputFloatX, InputIntX, InputDouble etc.



``` c
bool InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL)
```

``` c
bool InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0,0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL)
```

``` c
bool InputTextWithHint(const char* label, const char* hint, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL)
```

``` c
bool InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags flags = 0)
```

``` c
bool InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags flags = 0)
```

``` c
bool InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags flags = 0)
```

``` c
bool InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags flags = 0)
```

``` c
bool InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags flags = 0)
```

``` c
bool InputInt2(const char* label, int v[2], ImGuiInputTextFlags flags = 0)
```

``` c
bool InputInt3(const char* label, int v[3], ImGuiInputTextFlags flags = 0)
```

``` c
bool InputInt4(const char* label, int v[4], ImGuiInputTextFlags flags = 0)
```

``` c
bool InputDouble(const char* label, double* v, double step = 0.0, double step_fast = 0.0, const char* format = "%.6f", ImGuiInputTextFlags flags = 0)
```

``` c
bool InputScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0)
```

``` c
bool InputScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0)
```
### Widgets: Color Editor/Picker (tip: the ColorEdit* functions have a little colored preview square that can be left-clicked to open a picker, and right-clicked to open an option menu.)
- Note that in C++ a 'float v[X]' function argument is the _same_ as 'float* v', the array syntax is just a way to document the number of elements that are expected to be accessible.
- You can pass the address of a first float element out of a contiguous structure, e.g. &myvector.x



``` c
bool ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0)
```

``` c
bool ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0)
```

``` c
bool ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0)
```

``` c
bool ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL)
```

``` c
bool ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, ImVec2 size = ImVec2(0,0))
```
display a colored square/button, hover for details, return true when pressed.

``` c
void SetColorEditOptions(ImGuiColorEditFlags flags)
```
initialize current options (generally on application startup) if you want to select a default format, picker type, etc. User will be able to change many settings, unless you pass the _NoOptions flag to your calls.
### Widgets: Trees
- TreeNode functions return true when the node is open, in which case you need to also call TreePop() when you are finished displaying the tree node contents.



``` c
bool TreeNode(const char* label)
```

``` c
bool TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2)
```
helper variation to easily decorelate the id from the displayed string. Read the FAQ about why and how to use ID. to align arbitrary text at the same level as a TreeNode() you can use Bullet().

``` c
bool TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2)
```
"

``` c
bool TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2)
```

``` c
bool TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2)
```

``` c
bool TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0)
```

``` c
bool TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3)
```

``` c
bool TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3)
```

``` c
bool TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3)
```

``` c
bool TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3)
```

``` c
void TreePush(const char* str_id)
```
~ Indent()+PushId(). Already called by TreeNode() when returning true, but you can call TreePush/TreePop yourself if desired.

``` c
void TreePush(const void* ptr_id = NULL)
```
"

``` c
void TreePop()
```
~ Unindent()+PopId()

``` c
float GetTreeNodeToLabelSpacing()
```
horizontal distance preceding label when using TreeNode*() or Bullet() == (g.FontSize + style.FramePadding.x*2) for a regular unframed TreeNode

``` c
bool CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0)
```
if returning 'true' the header is open. doesn't indent nor push on ID stack. user doesn't have to call TreePop().

``` c
bool CollapsingHeader(const char* label, bool* p_open, ImGuiTreeNodeFlags flags = 0)
```
when 'p_open' isn't NULL, display an additional small close button on upper right of the header

``` c
void SetNextItemOpen(bool is_open, ImGuiCond cond = 0)
```
set next TreeNode/CollapsingHeader open state.
### Widgets: Selectables
- A selectable highlights when hovered, and can display another color when selected.
- Neighbors selectable extend their highlight bounds in order to leave no gap between them. This is so a series of selected Selectable appear contiguous.



``` c
bool Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0))
```
"bool selected" carry the selection state (read-only). Selectable() is clicked is returns true so you can modify your selection state. size.x==0.0: use remaining width, size.x>0.0: specify width. size.y==0.0: use label height, size.y>0.0: specify height

``` c
bool Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0,0))
```
"bool* p_selected" point to the selection state (read-write), as a convenient helper.
### Widgets: List Boxes
- FIXME: To be consistent with all the newer API, ListBoxHeader/ListBoxFooter should in reality be called BeginListBox/EndListBox. Will rename them.



``` c
bool ListBox(const char* label, int* current_item, const char* const items[], int items_count, int height_in_items = -1)
```

``` c
bool ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1)
```

``` c
bool ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0,0))
```
use if you want to reimplement ListBox() will custom data or interactions. if the function return true, you can output elements then call ListBoxFooter() afterwards.

``` c
bool ListBoxHeader(const char* label, int items_count, int height_in_items = -1)
```
"

``` c
void ListBoxFooter()
```
terminate the scrolling region. only call ListBoxFooter() if ListBoxHeader() returned true!
### Widgets: Data Plotting



``` c
void PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float))
```

``` c
void PlotLines(const char* label, float(*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0))
```

``` c
void PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float))
```

``` c
void PlotHistogram(const char* label, float(*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0))
```
### Widgets: Value() Helpers.
- Those are merely shortcut to calling Text() with a format string. Output single value in "name: value" format (tip: freely declare more in your code to handle your types. you can add functions to the ImGui namespace)



``` c
void Value(const char* prefix, bool b)
```

``` c
void Value(const char* prefix, int v)
```

``` c
void Value(const char* prefix, unsigned int v)
```

``` c
void Value(const char* prefix, float v, const char* float_format = NULL)
```
### Widgets: Menus
- Use BeginMenuBar() on a window ImGuiWindowFlags_MenuBar to append to its menu bar.
- Use BeginMainMenuBar() to create a menu bar at the top of the screen and append to it.
- Use BeginMenu() to create a menu. You can call BeginMenu() multiple time with the same identifier to append more items to it.



``` c
bool BeginMenuBar()
```
append to menu-bar of current window (requires ImGuiWindowFlags_MenuBar flag set on parent window).

``` c
void EndMenuBar()
```
only call EndMenuBar() if BeginMenuBar() returns true!

``` c
bool BeginMainMenuBar()
```
create and append to a full screen menu-bar.

``` c
void EndMainMenuBar()
```
only call EndMainMenuBar() if BeginMainMenuBar() returns true!

``` c
bool BeginMenu(const char* label, bool enabled = true)
```
create a sub-menu entry. only call EndMenu() if this returns true!

``` c
void EndMenu()
```
only call EndMenu() if BeginMenu() returns true!

``` c
bool MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true)
```
return true when activated. shortcuts are displayed for convenience but not processed by ImGui at the moment

``` c
bool MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true)
```
return true when activated + toggle (*p_selected) if p_selected != NULL
### Tooltips
- Tooltip are windows following the mouse which do not take focus away.



``` c
void BeginTooltip()
```
begin/append a tooltip window. to create full-featured tooltip (with any kind of items).

``` c
void EndTooltip()
```

``` c
void SetTooltip(const char* fmt, ...) IM_FMTARGS(1)
```
set a text-only tooltip, typically use with ImGui::IsItemHovered(). override any previous call to SetTooltip().

``` c
void SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1)
```
### Popups, Modals
The properties of popups windows are:
- They block normal mouse hovering detection outside them. (*1)
- Unless modal, they can be closed by clicking anywhere outside them, or by pressing ESCAPE.
Because hovering detection is disabled outside the popup, when clicking outside the click will not be seen by underlying widgets! (*1)
- Their visibility state (~bool) is held internally by Dear ImGui instead of being held by the programmer as we are used to with regular Begin() calls.
User can manipulate the visibility state by calling OpenPopup(), CloseCurrentPopup() etc.
- We default to use the right mouse (ImGuiMouseButton_Right=1) for the Popup Context functions.
Those three properties are connected: we need to retain popup visibility state in the library because popups may be closed as any time.
(*1) You can bypass that restriction and detect hovering even when normally blocked by a popup.
To do this use the ImGuiHoveredFlags_AllowWhenBlockedByPopup when calling IsItemHovered() or IsWindowHovered().
This is what BeginPopupContextItem() and BeginPopupContextWindow() are doing already, allowing a right-click to reopen another popups without losing the click.



``` c
void OpenPopup(const char* str_id)
```
call to mark popup as open (don't call every frame!). popups are closed when user click outside, or if CloseCurrentPopup() is called within a BeginPopup()/EndPopup() block. By default, Selectable()/MenuItem() are calling CloseCurrentPopup(). Popup identifiers are relative to the current ID-stack (so OpenPopup and BeginPopup needs to be at the same level).

``` c
bool BeginPopup(const char* str_id, ImGuiWindowFlags flags = 0)
```
return true if the popup is open, and you can start outputting to it. only call EndPopup() if BeginPopup() returns true!

``` c
bool BeginPopupContextItem(const char* str_id = NULL, ImGuiMouseButton mouse_button = 1)
```
helper to open and begin popup when clicked on last item. if you can pass a NULL str_id only if the previous item had an id. If you want to use that on a non-interactive item such as Text() you need to pass in an explicit ID here. read comments in .cpp!

``` c
bool BeginPopupContextWindow(const char* str_id = NULL, ImGuiMouseButton mouse_button = 1, bool also_over_items = true)
```
helper to open and begin popup when clicked on current window.

``` c
bool BeginPopupContextVoid(const char* str_id = NULL, ImGuiMouseButton mouse_button = 1)
```
helper to open and begin popup when clicked in void (where there are no imgui windows).

``` c
bool BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0)
```
modal dialog (regular window with title bar, block interactions behind the modal window, can't close the modal window by clicking outside)

``` c
void EndPopup()
```
only call EndPopup() if BeginPopupXXX() returns true!

``` c
bool OpenPopupOnItemClick(const char* str_id = NULL, ImGuiMouseButton mouse_button = 1)
```
helper to open popup when clicked on last item (note: actually triggers on the mouse _released_ event to be consistent with popup behaviors). return true when just opened.

``` c
bool IsPopupOpen(const char* str_id)
```
return true if the popup is open at the current begin-ed level of the popup stack.

``` c
void CloseCurrentPopup()
```
close the popup we have begin-ed into. clicking on a MenuItem or Selectable automatically close the current popup.
### Columns
- You can also use SameLine(pos_x) to mimic simplified columns.
- The columns API is work-in-progress and rather lacking (columns are arguably the worst part of dear imgui at the moment!)
- There is a maximum of 64 columns.
- Currently working on new 'Tables' api which will replace columns around Q2 2020 (see GitHub #2957).



``` c
void Columns(int count = 1, const char* id = NULL, bool border = true)
```

``` c
void NextColumn()
```
next column, defaults to current row or next row if the current row is finished

``` c
int GetColumnIndex()
```
get current column index

``` c
float GetColumnWidth(int column_index = -1)
```
get column width (in pixels). pass -1 to use current column

``` c
void SetColumnWidth(int column_index, float width)
```
set column width (in pixels). pass -1 to use current column

``` c
float GetColumnOffset(int column_index = -1)
```
get position of column line (in pixels, from the left side of the contents region). pass -1 to use current column, otherwise 0..GetColumnsCount() inclusive. column 0 is typically 0.0f

``` c
void SetColumnOffset(int column_index, float offset_x)
```
set position of column line (in pixels, from the left side of the contents region). pass -1 to use current column

``` c
int GetColumnsCount()
```
### Tab Bars, Tabs



``` c
bool BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0)
```
create and append into a TabBar

``` c
void EndTabBar()
```
only call EndTabBar() if BeginTabBar() returns true!

``` c
bool BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0)
```
create a Tab. Returns true if the Tab is selected.

``` c
void EndTabItem()
```
only call EndTabItem() if BeginTabItem() returns true!

``` c
void SetTabItemClosed(const char* tab_or_docked_window_label)
```
notify TabBar or Docking system of a closed tab/window ahead (useful to reduce visual flicker on reorderable tab bars). For tab-bar: call after BeginTabBar() and before Tab submissions. Otherwise call with a window name.
### Logging/Capture
- All text output from the interface can be captured into tty/file/clipboard. By default, tree nodes are automatically opened during logging.



``` c
void LogToTTY(int auto_open_depth = -1)
```
start logging to tty (stdout)

``` c
void LogToFile(int auto_open_depth = -1, const char* filename = NULL)
```
start logging to file

``` c
void LogToClipboard(int auto_open_depth = -1)
```
start logging to OS clipboard

``` c
void LogFinish()
```
stop logging (close file, etc.)

``` c
void LogButtons()
```
helper to display buttons for logging to tty/file/clipboard

``` c
void LogText(const char* fmt, ...) IM_FMTARGS(1)
```
pass text data straight to log (without being displayed)
### Drag and Drop
- [BETA API] API may evolve!



``` c
bool BeginDragDropSource(ImGuiDragDropFlags flags = 0)
```
call when the current item is active. If this return true, you can call SetDragDropPayload() + EndDragDropSource()

``` c
bool SetDragDropPayload(const char* type, const void* data, size_t sz, ImGuiCond cond = 0)
```
type is a user defined string of maximum 32 characters. Strings starting with '_' are reserved for dear imgui internal types. Data is copied and held by imgui.

``` c
void EndDragDropSource()
```
only call EndDragDropSource() if BeginDragDropSource() returns true!

``` c
bool BeginDragDropTarget()
```
call after submitting an item that may receive a payload. If this returns true, you can call AcceptDragDropPayload() + EndDragDropTarget()

``` c
void EndDragDropTarget()
```
only call EndDragDropTarget() if BeginDragDropTarget() returns true!
### Clipping



``` c
void PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect)
```

``` c
void PopClipRect()
```
### Focus, Activation
- Prefer using "SetItemDefaultFocus()" over "if (IsWindowAppearing()) SetScrollHereY()" when applicable to signify "this is the default item"



``` c
void SetItemDefaultFocus()
```
make last item the default focused item of a window.

``` c
void SetKeyboardFocusHere(int offset = 0)
```
focus keyboard on the next widget. Use positive 'offset' to access sub components of a multiple component widget. Use -1 to access previous widget.
### Item/Widgets Utilities
- Most of the functions are referring to the last/previous item we submitted.
- See Demo Window under "Widgets->Querying Status" for an interactive visualization of most of those functions.



``` c
bool IsItemHovered(ImGuiHoveredFlags flags = 0)
```
is the last item hovered? (and usable, aka not blocked by a popup, etc.). See ImGuiHoveredFlags for more options.

``` c
bool IsItemActive()
```
is the last item active? (e.g. button being held, text field being edited. This will continuously return true while holding mouse button on an item. Items that don't interact will always return false)

``` c
bool IsItemFocused()
```
is the last item focused for keyboard/gamepad navigation?

``` c
bool IsItemClicked(ImGuiMouseButton mouse_button = 0)
```
is the last item clicked? (e.g. button/node just clicked on) == IsMouseClicked(mouse_button) && IsItemHovered()

``` c
bool IsItemVisible()
```
is the last item visible? (items may be out of sight because of clipping/scrolling)

``` c
bool IsItemEdited()
```
did the last item modify its underlying value this frame? or was pressed? This is generally the same as the "bool" return value of many widgets.

``` c
bool IsItemActivated()
```
was the last item just made active (item was previously inactive).

``` c
bool IsItemDeactivated()
```
was the last item just made inactive (item was previously active). Useful for Undo/Redo patterns with widgets that requires continuous editing.

``` c
bool IsItemDeactivatedAfterEdit()
```
was the last item just made inactive and made a value change when it was active? (e.g. Slider/Drag moved). Useful for Undo/Redo patterns with widgets that requires continuous editing. Note that you may get false positives (some widgets such as Combo()/ListBox()/Selectable() will return true even when clicking an already selected item).

``` c
bool IsItemToggledOpen()
```
was the last item open state toggled? set by TreeNode().

``` c
bool IsAnyItemHovered()
```
is any item hovered?

``` c
bool IsAnyItemActive()
```
is any item active?

``` c
bool IsAnyItemFocused()
```
is any item focused?

``` c
ImVec2 GetItemRectMin()
```
get upper-left bounding rectangle of the last item (screen space)

``` c
ImVec2 GetItemRectMax()
```
get lower-right bounding rectangle of the last item (screen space)

``` c
ImVec2 GetItemRectSize()
```
get size of last item

``` c
void SetItemAllowOverlap()
```
allow last item to be overlapped by a subsequent item. sometimes useful with invisible buttons, selectables, etc. to catch unused area.
### Miscellaneous Utilities



``` c
bool IsRectVisible(const ImVec2& size)
```
test if rectangle (of given size, starting from cursor position) is visible / not clipped.

``` c
bool IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max)
```
test if rectangle (in screen space) is visible / not clipped. to perform coarse clipping on user's side.

``` c
double GetTime()
```
get global imgui time. incremented by io.DeltaTime every frame.

``` c
int GetFrameCount()
```
get global imgui frame count. incremented by 1 every frame.

``` c
ImDrawList* GetBackgroundDrawList()
```
this draw list will be the first rendering one. Useful to quickly draw shapes/text behind dear imgui contents.

``` c
ImDrawList* GetForegroundDrawList()
```
this draw list will be the last rendered one. Useful to quickly draw shapes/text over dear imgui contents.

``` c
ImDrawListSharedData* GetDrawListSharedData()
```
you may use this when creating your own ImDrawList instances.

``` c
void SetStateStorage(ImGuiStorage* storage)
```
replace current window storage with our own (if you want to manipulate it yourself, typically clear subsection of it)

``` c
ImGuiStorage* GetStateStorage()
```

``` c
void CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end)
```
calculate coarse clipping for large list of evenly sized items. Prefer using the ImGuiListClipper higher-level helper if you can.

``` c
bool BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags flags = 0)
```
helper to create a child window / scrolling region that looks like a normal widget frame

``` c
void EndChildFrame()
```
always call EndChildFrame() regardless of BeginChildFrame() return values (which indicates a collapsed/clipped window)
### Text Utilities



``` c
ImVec2 CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f)
```
### Color Utilities



``` c
ImVec4 ColorConvertU32ToFloat4(ImU32 in)
```

``` c
ImU32 ColorConvertFloat4ToU32(const ImVec4& in)
```

``` c
void ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v)
```

``` c
void ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b)
```
### Inputs Utilities: Keyboard
- For 'int user_key_index' you can use your own indices/enums according to how your backend/engine stored them in io.KeysDown[].
- We don't know the meaning of those value. You can use GetKeyIndex() to map a ImGuiKey_ value into the user index.



``` c
int GetKeyIndex(ImGuiKey imgui_key)
```
map ImGuiKey_* values into user's key index. == io.KeyMap[key]

``` c
bool IsKeyDown(int user_key_index)
```
is key being held. == io.KeysDown[user_key_index].

``` c
bool IsKeyPressed(int user_key_index, bool repeat = true)
```
was key pressed (went from !Down to Down)? if repeat=true, uses io.KeyRepeatDelay / KeyRepeatRate

``` c
bool IsKeyReleased(int user_key_index)
```
was key released (went from Down to !Down)?

``` c
int GetKeyPressedAmount(int key_index, float repeat_delay, float rate)
```
uses provided repeat rate/delay. return a count, most often 0 or 1 but might be >1 if RepeatRate is small enough that DeltaTime > RepeatRate

``` c
void CaptureKeyboardFromApp(bool want_capture_keyboard_value = true)
```
attention: misleading name! manually override io.WantCaptureKeyboard flag next frame (said flag is entirely left for your application to handle). e.g. force capture keyboard when your widget is being hovered. This is equivalent to setting "io.WantCaptureKeyboard = want_capture_keyboard_value"; after the next NewFrame() call.
### Inputs Utilities: Mouse
- To refer to a mouse button, you may use named enums in your code e.g. ImGuiMouseButton_Left, ImGuiMouseButton_Right.
- You can also use regular integer: it is forever guaranteed that 0=Left, 1=Right, 2=Middle.
- Dragging operations are only reported after mouse has moved a certain distance away from the initial clicking position (see 'lock_threshold' and 'io.MouseDraggingThreshold')



``` c
bool IsMouseDown(ImGuiMouseButton button)
```
is mouse button held?

``` c
bool IsMouseClicked(ImGuiMouseButton button, bool repeat = false)
```
did mouse button clicked? (went from !Down to Down)

``` c
bool IsMouseReleased(ImGuiMouseButton button)
```
did mouse button released? (went from Down to !Down)

``` c
bool IsMouseDoubleClicked(ImGuiMouseButton button)
```
did mouse button double-clicked? a double-click returns false in IsMouseClicked(). uses io.MouseDoubleClickTime.

``` c
bool IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true)
```
is mouse hovering given bounding rect (in screen space). clipped by current clipping settings, but disregarding of other consideration of focus/window ordering/popup-block.

``` c
bool IsMousePosValid(const ImVec2* mouse_pos = NULL)
```
by convention we use (-FLT_MAX,-FLT_MAX) to denote that there is no mouse available

``` c
bool IsAnyMouseDown()
```
is any mouse button held?

``` c
ImVec2 GetMousePos()
```
shortcut to ImGui::GetIO().MousePos provided by user, to be consistent with other calls

``` c
ImVec2 GetMousePosOnOpeningCurrentPopup()
```
retrieve mouse position at the time of opening popup we have BeginPopup() into (helper to avoid user backing that value themselves)

``` c
bool IsMouseDragging(ImGuiMouseButton button, float lock_threshold = -1.0f)
```
is mouse dragging? (if lock_threshold < -1.0f, uses io.MouseDraggingThreshold)

``` c
ImVec2 GetMouseDragDelta(ImGuiMouseButton button = 0, float lock_threshold = -1.0f)
```
return the delta from the initial clicking position while the mouse button is pressed or was just released. This is locked and return 0.0f until the mouse moves past a distance threshold at least once (if lock_threshold < -1.0f, uses io.MouseDraggingThreshold)

``` c
void ResetMouseDragDelta(ImGuiMouseButton button = 0)
```
    IMGUI_API ImGuiMouseCursor GetMouseCursor();                                                // get desired cursor type, reset in ImGui::NewFrame(), this is updated during the frame. valid before Render(). If you use software rendering by setting io.MouseDrawCursor ImGui will render those for you

``` c
void SetMouseCursor(ImGuiMouseCursor cursor_type)
```
set desired cursor type

``` c
void CaptureMouseFromApp(bool want_capture_mouse_value = true)
```
attention: misleading name! manually override io.WantCaptureMouse flag next frame (said flag is entirely left for your application to handle). This is equivalent to setting "io.WantCaptureMouse = want_capture_mouse_value;" after the next NewFrame() call.
### Clipboard Utilities
- Also see the LogToClipboard() function to capture GUI into clipboard, or easily output text data to the clipboard.



``` c
void SetClipboardText(const char* text)
```
### Settings/.Ini Utilities
- The disk functions are automatically called if io.IniFilename != NULL (default is "imgui.ini").
- Set io.IniFilename to NULL to load/save manually. Read io.WantSaveIniSettings description about handling .ini saving manually.



``` c
void LoadIniSettingsFromDisk(const char* ini_filename)
```
call after CreateContext() and before the first call to NewFrame(). NewFrame() automatically calls LoadIniSettingsFromDisk(io.IniFilename).

``` c
void LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0)
```
call after CreateContext() and before the first call to NewFrame() to provide .ini data from your own data source.

``` c
void SaveIniSettingsToDisk(const char* ini_filename)
```
this is automatically called (if io.IniFilename is not empty) a few seconds after any modification that should be reflected in the .ini file (and also by DestroyContext).
### Debug Utilities



``` c
bool DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert, size_t sz_drawidx)
```
This is called by IMGUI_CHECKVERSION() macro.
### Memory Allocators
- All those functions are not reliant on the current context.
- If you reload the contents of imgui.cpp at runtime, you may need to call SetCurrentContext() + SetAllocatorFunctions() again because we use global storage for those.



``` c
void SetAllocatorFunctions(void* (*alloc_func)(size_t sz, void* user_data), void (*free_func)(void* ptr, void* user_data), void* user_data = NULL)
```

``` c
void* MemAlloc(size_t size)
```

``` c
void MemFree(void* ptr)
```
