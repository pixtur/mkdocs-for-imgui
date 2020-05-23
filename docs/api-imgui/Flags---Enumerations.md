# Flags & Enumerations
##  Flags for ImGui::Begin()

**[ImGuiWindowFlags_None](#ImGuiWindowFlags_None)**  –  undefined

**[ImGuiWindowFlags_NoTitleBar](#ImGuiWindowFlags_NoTitleBar)**  –  Disable title-bar

**[ImGuiWindowFlags_NoResize](#ImGuiWindowFlags_NoResize)**  –  Disable user resizing with the lower-right grip

**[ImGuiWindowFlags_NoMove](#ImGuiWindowFlags_NoMove)**  –  Disable user moving the window

**[ImGuiWindowFlags_NoScrollbar](#ImGuiWindowFlags_NoScrollbar)**  –  Disable scrollbars (window can still scroll with mouse or programmatically)

**[ImGuiWindowFlags_NoScrollWithMouse](#ImGuiWindowFlags_NoScrollWithMouse)**  –  Disable user vertically scrolling with mouse wheel. On child window, mouse wheel will be forwarded to the parent unless NoScrollbar is also set.

**[ImGuiWindowFlags_NoCollapse](#ImGuiWindowFlags_NoCollapse)**  –  Disable user collapsing window by double-clicking on it

**[ImGuiWindowFlags_AlwaysAutoResize](#ImGuiWindowFlags_AlwaysAutoResize)**  –  Resize every window to its content every frame

**[ImGuiWindowFlags_NoBackground](#ImGuiWindowFlags_NoBackground)**  –  Disable drawing background color (WindowBg, etc.) and outside border. Similar as using SetNextWindowBgAlpha(0.0f).

**[ImGuiWindowFlags_NoSavedSettings](#ImGuiWindowFlags_NoSavedSettings)**  –  Never load/save settings in .ini file

**[ImGuiWindowFlags_NoMouseInputs](#ImGuiWindowFlags_NoMouseInputs)**  –  Disable catching mouse, hovering test with pass through.

**[ImGuiWindowFlags_MenuBar](#ImGuiWindowFlags_MenuBar)**  –  Has a menu-bar

**[ImGuiWindowFlags_HorizontalScrollbar](#ImGuiWindowFlags_HorizontalScrollbar)**  –  Allow horizontal scrollbar to appear (off by default). You may use SetNextWindowContentSize(ImVec2(width,0.0f)); prior to calling Begin() to specify width. Read code in imgui_demo in the "Horizontal Scrolling" section.

**[ImGuiWindowFlags_NoFocusOnAppearing](#ImGuiWindowFlags_NoFocusOnAppearing)**  –  Disable taking focus when transitioning from hidden to visible state

**[ImGuiWindowFlags_NoBringToFrontOnFocus](#ImGuiWindowFlags_NoBringToFrontOnFocus)**  –  Disable bringing window to front when taking focus (e.g. clicking on it or programmatically giving it focus)

**[14](#14)**  –  Always show vertical scrollbar (even if ContentSize.y < Size.y)

**[15](#15)**  –  Always show horizontal scrollbar (even if ContentSize.x < Size.x)

**[ImGuiWindowFlags_AlwaysUseWindowPadding](#ImGuiWindowFlags_AlwaysUseWindowPadding)**  –  Ensure child windows without border uses style.WindowPadding (ignored by default for non-bordered child windows, because more convenient)

**[ImGuiWindowFlags_NoNavInputs](#ImGuiWindowFlags_NoNavInputs)**  –  No gamepad/keyboard navigation within the window

**[ImGuiWindowFlags_NoNavFocus](#ImGuiWindowFlags_NoNavFocus)**  –  No focusing toward this window with gamepad/keyboard navigation (e.g. skipped by CTRL+TAB)

**[ImGuiWindowFlags_UnsavedDocument](#ImGuiWindowFlags_UnsavedDocument)**  –  Append '*' to title without affecting the ID, as a convenience to avoid using the ### operator. When used in a tab/docking context, tab is selected on closure and closure is deferred by one frame to allow code to cancel the closure (with a confirmation popup, etc.) without flicker.

**[ImGuiWindowFlags_NoNav](#ImGuiWindowFlags_NoNav)**  –  undefined

**[ImGuiWindowFlags_NoDecoration](#ImGuiWindowFlags_NoDecoration)**  –  undefined

**[ImGuiWindowFlags_NoInputs](#ImGuiWindowFlags_NoInputs)**  –  undefined

**[ImGuiWindowFlags_NavFlattened](#ImGuiWindowFlags_NavFlattened)**  –  [BETA] Allow gamepad/keyboard navigation to cross over parent border to this child (only use on child that have no scrolling!)

**[ImGuiWindowFlags_ChildWindow](#ImGuiWindowFlags_ChildWindow)**  –  Don't use! For internal use by BeginChild()

**[ImGuiWindowFlags_Tooltip](#ImGuiWindowFlags_Tooltip)**  –  Don't use! For internal use by BeginTooltip()

**[ImGuiWindowFlags_Popup](#ImGuiWindowFlags_Popup)**  –  Don't use! For internal use by BeginPopup()

**[ImGuiWindowFlags_Modal](#ImGuiWindowFlags_Modal)**  –  Don't use! For internal use by BeginPopupModal()

**[ImGuiWindowFlags_ChildMenu](#ImGuiWindowFlags_ChildMenu)**  –  --> Set style.FrameBorderSize=1.0f or style.WindowBorderSize=1.0f to enable borders around items or windows.

**[ImGuiWindowFlags_ResizeFromAnySide](#ImGuiWindowFlags_ResizeFromAnySide)**  –  --> Set io.ConfigWindowsResizeFromEdges=true and make sure mouse cursors are supported by back-end (io.BackendFlags & ImGuiBackendFlags_HasMouseCursors)
##  Flags for ImGui::InputText()

**[ImGuiInputTextFlags_None](#ImGuiInputTextFlags_None)**  –  undefined

**[ImGuiInputTextFlags_CharsDecimal](#ImGuiInputTextFlags_CharsDecimal)**  –  Allow 0123456789.+-*/

**[ImGuiInputTextFlags_CharsHexadecimal](#ImGuiInputTextFlags_CharsHexadecimal)**  –  Allow 0123456789ABCDEFabcdef

**[ImGuiInputTextFlags_CharsUppercase](#ImGuiInputTextFlags_CharsUppercase)**  –  Turn a..z into A..Z

**[ImGuiInputTextFlags_CharsNoBlank](#ImGuiInputTextFlags_CharsNoBlank)**  –  Filter out spaces, tabs

**[ImGuiInputTextFlags_AutoSelectAll](#ImGuiInputTextFlags_AutoSelectAll)**  –  Select entire text when first taking mouse focus

**[ImGuiInputTextFlags_EnterReturnsTrue](#ImGuiInputTextFlags_EnterReturnsTrue)**  –  Return 'true' when Enter is pressed (as opposed to every time the value was modified). Consider looking at the IsItemDeactivatedAfterEdit() function.

**[ImGuiInputTextFlags_CallbackCompletion](#ImGuiInputTextFlags_CallbackCompletion)**  –  Callback on pressing TAB (for completion handling)

**[ImGuiInputTextFlags_CallbackHistory](#ImGuiInputTextFlags_CallbackHistory)**  –  Callback on pressing Up/Down arrows (for history handling)

**[ImGuiInputTextFlags_CallbackAlways](#ImGuiInputTextFlags_CallbackAlways)**  –  Callback on each iteration. User code may query cursor position, modify text buffer.

**[ImGuiInputTextFlags_CallbackCharFilter](#ImGuiInputTextFlags_CallbackCharFilter)**  –  Callback on character inputs to replace or discard them. Modify 'EventChar' to replace or discard, or return 1 in callback to discard.

**[ImGuiInputTextFlags_AllowTabInput](#ImGuiInputTextFlags_AllowTabInput)**  –  Pressing TAB input a '\t' character into the text field

**[ImGuiInputTextFlags_CtrlEnterForNewLine](#ImGuiInputTextFlags_CtrlEnterForNewLine)**  –  In multi-line mode, unfocus with Enter, add new line with Ctrl+Enter (default is opposite: unfocus with Ctrl+Enter, add line with Enter).

**[ImGuiInputTextFlags_NoHorizontalScroll](#ImGuiInputTextFlags_NoHorizontalScroll)**  –  Disable following the cursor horizontally

**[ImGuiInputTextFlags_AlwaysInsertMode](#ImGuiInputTextFlags_AlwaysInsertMode)**  –  Insert mode

**[ImGuiInputTextFlags_ReadOnly](#ImGuiInputTextFlags_ReadOnly)**  –  Read-only mode

**[ImGuiInputTextFlags_Password](#ImGuiInputTextFlags_Password)**  –  Password mode, display all characters as '*'

**[ImGuiInputTextFlags_NoUndoRedo](#ImGuiInputTextFlags_NoUndoRedo)**  –  Disable undo/redo. Note that input text owns the text data while active, if you want to provide your own undo/redo stack you need e.g. to call ClearActiveID().

**[ImGuiInputTextFlags_CharsScientific](#ImGuiInputTextFlags_CharsScientific)**  –  Allow 0123456789.+-*/eE (Scientific notation input)

**[ImGuiInputTextFlags_CallbackResize](#ImGuiInputTextFlags_CallbackResize)**  –  Callback on buffer capacity changes request (beyond 'buf_size' parameter value), allowing the string to grow. Notify when the string wants to be resized (for string types which hold a cache of their Size). You will be provided a new BufSize in the callback and NEED to honor it. (see misc/cpp/imgui_stdlib.h for an example of using this)

**[ImGuiInputTextFlags_Multiline](#ImGuiInputTextFlags_Multiline)**  –  For internal use by InputTextMultiline()
##  Flags for ImGui::TreeNodeEx(), ImGui::CollapsingHeader*()

**[ImGuiTreeNodeFlags_None](#ImGuiTreeNodeFlags_None)**  –  undefined

**[ImGuiTreeNodeFlags_Selected](#ImGuiTreeNodeFlags_Selected)**  –  Draw as selected

**[ImGuiTreeNodeFlags_Framed](#ImGuiTreeNodeFlags_Framed)**  –  Full colored frame (e.g. for CollapsingHeader)

**[ImGuiTreeNodeFlags_AllowItemOverlap](#ImGuiTreeNodeFlags_AllowItemOverlap)**  –  Hit testing to allow subsequent widgets to overlap this one

**[ImGuiTreeNodeFlags_NoTreePushOnOpen](#ImGuiTreeNodeFlags_NoTreePushOnOpen)**  –  Don't do a TreePush() when open (e.g. for CollapsingHeader) = no extra indent nor pushing on ID stack

**[ImGuiTreeNodeFlags_NoAutoOpenOnLog](#ImGuiTreeNodeFlags_NoAutoOpenOnLog)**  –  Don't automatically and temporarily open node when Logging is active (by default logging will automatically open tree nodes)

**[ImGuiTreeNodeFlags_DefaultOpen](#ImGuiTreeNodeFlags_DefaultOpen)**  –  Default node to be open

**[ImGuiTreeNodeFlags_OpenOnDoubleClick](#ImGuiTreeNodeFlags_OpenOnDoubleClick)**  –  Need double-click to open node

**[ImGuiTreeNodeFlags_OpenOnArrow](#ImGuiTreeNodeFlags_OpenOnArrow)**  –  Only open when clicking on the arrow part. If ImGuiTreeNodeFlags_OpenOnDoubleClick is also set, single-click arrow or double-click all box to open.

**[ImGuiTreeNodeFlags_Leaf](#ImGuiTreeNodeFlags_Leaf)**  –  No collapsing, no arrow (use as a convenience for leaf nodes).

**[ImGuiTreeNodeFlags_Bullet](#ImGuiTreeNodeFlags_Bullet)**  –  Display a bullet instead of arrow

**[ImGuiTreeNodeFlags_FramePadding](#ImGuiTreeNodeFlags_FramePadding)**  –  Use FramePadding (even for an unframed text node) to vertically align text baseline to regular widget height. Equivalent to calling AlignTextToFramePadding().

**[ImGuiTreeNodeFlags_SpanAvailWidth](#ImGuiTreeNodeFlags_SpanAvailWidth)**  –  Extend hit box to the right-most edge, even if not framed. This is not the default in order to allow adding other items on the same line. In the future we may refactor the hit system to be front-to-back, allowing natural overlaps and then this can become the default.

**[ImGuiTreeNodeFlags_SpanFullWidth](#ImGuiTreeNodeFlags_SpanFullWidth)**  –  Extend hit box to the left-most and right-most edges (bypass the indented area).

**[ImGuiTreeNodeFlags_NavLeftJumpsBackHere](#ImGuiTreeNodeFlags_NavLeftJumpsBackHere)**  –  (WIP) Nav: left direction may move to this TreeNode() from any of its child (items submitted between TreeNode and TreePop)

**[ImGuiTreeNodeFlags_NoScrollOnOpen](#ImGuiTreeNodeFlags_NoScrollOnOpen)**  –  FIXME: TODO: Disable automatic scroll on TreePop() if node got just open and contents is not visible
##  Flags for ImGui::Selectable()

**[ImGuiSelectableFlags_None](#ImGuiSelectableFlags_None)**  –  undefined

**[ImGuiSelectableFlags_DontClosePopups](#ImGuiSelectableFlags_DontClosePopups)**  –  Clicking this don't close parent popup window

**[ImGuiSelectableFlags_SpanAllColumns](#ImGuiSelectableFlags_SpanAllColumns)**  –  Selectable frame can span all columns (text will still fit in current column)

**[ImGuiSelectableFlags_AllowDoubleClick](#ImGuiSelectableFlags_AllowDoubleClick)**  –  Generate press events on double clicks too

**[ImGuiSelectableFlags_Disabled](#ImGuiSelectableFlags_Disabled)**  –  Cannot be selected, display grayed out text
##  Flags for ImGui::BeginCombo()

**[ImGuiComboFlags_None](#ImGuiComboFlags_None)**  –  undefined

**[ImGuiComboFlags_PopupAlignLeft](#ImGuiComboFlags_PopupAlignLeft)**  –  Align the popup toward the left by default

**[ImGuiComboFlags_HeightSmall](#ImGuiComboFlags_HeightSmall)**  –  Max ~4 items visible. Tip: If you want your combo popup to be a specific size you can use SetNextWindowSizeConstraints() prior to calling BeginCombo()

**[ImGuiComboFlags_HeightRegular](#ImGuiComboFlags_HeightRegular)**  –  Max ~8 items visible (default)

**[ImGuiComboFlags_HeightLarge](#ImGuiComboFlags_HeightLarge)**  –  Max ~20 items visible

**[ImGuiComboFlags_HeightLargest](#ImGuiComboFlags_HeightLargest)**  –  As many fitting items as possible

**[ImGuiComboFlags_NoArrowButton](#ImGuiComboFlags_NoArrowButton)**  –  Display on the preview box without the square arrow button

**[ImGuiComboFlags_NoPreview](#ImGuiComboFlags_NoPreview)**  –  Display only a square arrow button
##  Flags for ImGui::BeginTabBar()

**[ImGuiTabBarFlags_None](#ImGuiTabBarFlags_None)**  –  undefined

**[ImGuiTabBarFlags_Reorderable](#ImGuiTabBarFlags_Reorderable)**  –  Allow manually dragging tabs to re-order them + New tabs are appended at the end of list

**[ImGuiTabBarFlags_AutoSelectNewTabs](#ImGuiTabBarFlags_AutoSelectNewTabs)**  –  Automatically select new tabs when they appear

**[ImGuiTabBarFlags_TabListPopupButton](#ImGuiTabBarFlags_TabListPopupButton)**  –  Disable buttons to open the tab list popup

**[ImGuiTabBarFlags_NoCloseWithMiddleMouseButton](#ImGuiTabBarFlags_NoCloseWithMiddleMouseButton)**  –  Disable behavior of closing tabs (that are submitted with p_open != NULL) with middle mouse button. You can still repro this behavior on user's side with if (IsItemHovered() && IsMouseClicked(2)) *p_open = false.

**[ImGuiTabBarFlags_NoTabListScrollingButtons](#ImGuiTabBarFlags_NoTabListScrollingButtons)**  –  Disable scrolling buttons (apply when fitting policy is ImGuiTabBarFlags_FittingPolicyScroll)

**[ImGuiTabBarFlags_NoTooltip](#ImGuiTabBarFlags_NoTooltip)**  –  Disable tooltips when hovering a tab

**[ImGuiTabBarFlags_FittingPolicyResizeDown](#ImGuiTabBarFlags_FittingPolicyResizeDown)**  –  Resize tabs when they don't fit

**[ImGuiTabBarFlags_FittingPolicyScroll](#ImGuiTabBarFlags_FittingPolicyScroll)**  –  Add scroll buttons when tabs don't fit

**[ImGuiTabBarFlags_FittingPolicyMask_](#ImGuiTabBarFlags_FittingPolicyMask_)**  –  undefined
##  Flags for ImGui::BeginTabItem()

**[ImGuiTabItemFlags_None](#ImGuiTabItemFlags_None)**  –  undefined

**[ImGuiTabItemFlags_UnsavedDocument](#ImGuiTabItemFlags_UnsavedDocument)**  –  Append '*' to title without affecting the ID, as a convenience to avoid using the ### operator. Also: tab is selected on closure and closure is deferred by one frame to allow code to undo it without flicker.

**[ImGuiTabItemFlags_SetSelected](#ImGuiTabItemFlags_SetSelected)**  –  Trigger flag to programmatically make the tab selected when calling BeginTabItem()

**[ImGuiTabItemFlags_NoCloseWithMiddleMouseButton](#ImGuiTabItemFlags_NoCloseWithMiddleMouseButton)**  –  Disable behavior of closing tabs (that are submitted with p_open != NULL) with middle mouse button. You can still repro this behavior on user's side with if (IsItemHovered() && IsMouseClicked(2)) *p_open = false.
##  Flags for ImGui::IsWindowFocused()

**[ImGuiFocusedFlags_None](#ImGuiFocusedFlags_None)**  –  undefined

**[ImGuiFocusedFlags_ChildWindows](#ImGuiFocusedFlags_ChildWindows)**  –  IsWindowFocused(): Return true if any children of the window is focused

**[ImGuiFocusedFlags_RootWindow](#ImGuiFocusedFlags_RootWindow)**  –  IsWindowFocused(): Test from root window (top most parent of the current hierarchy)

**[ImGuiFocusedFlags_AnyWindow](#ImGuiFocusedFlags_AnyWindow)**  –  IsWindowFocused(): Return true if any window is focused. Important: If you are trying to tell how to dispatch your low-level inputs, do NOT use this. Use 'io.WantCaptureMouse' instead! Please read the FAQ!
##  Flags for ImGui::IsItemHovered(), ImGui::IsWindowHovered()
 Note: if you are trying to check whether your mouse should be dispatched to Dear ImGui or to your app, you should use 'io.WantCaptureMouse' instead! Please read the FAQ!
 Note: windows with the ImGuiWindowFlags_NoInputs flag are ignored by IsWindowHovered() calls.

**[ImGuiHoveredFlags_None](#ImGuiHoveredFlags_None)**  –  Return true if directly over the item/window, not obstructed by another window, not obstructed by an active popup or modal blocking inputs under them.

**[ImGuiHoveredFlags_ChildWindows](#ImGuiHoveredFlags_ChildWindows)**  –  IsWindowHovered() only: Return true if any children of the window is hovered

**[ImGuiHoveredFlags_RootWindow](#ImGuiHoveredFlags_RootWindow)**  –  IsWindowHovered() only: Test from root window (top most parent of the current hierarchy)

**[ImGuiHoveredFlags_AnyWindow](#ImGuiHoveredFlags_AnyWindow)**  –  IsWindowHovered() only: Return true if any window is hovered

**[ImGuiHoveredFlags_AllowWhenBlockedByPopup](#ImGuiHoveredFlags_AllowWhenBlockedByPopup)**  –  Return true even if a popup window is normally blocking access to this item/window

**[ImGuiHoveredFlags_AllowWhenBlockedByModal](#ImGuiHoveredFlags_AllowWhenBlockedByModal)**  –  Return true even if a modal popup window is normally blocking access to this item/window. FIXME-TODO: Unavailable yet.

**[ImGuiHoveredFlags_AllowWhenBlockedByActiveItem](#ImGuiHoveredFlags_AllowWhenBlockedByActiveItem)**  –  Return true even if an active item is blocking access to this item/window. Useful for Drag and Drop patterns.

**[ImGuiHoveredFlags_AllowWhenOverlapped](#ImGuiHoveredFlags_AllowWhenOverlapped)**  –  Return true even if the position is obstructed or overlapped by another window

**[ImGuiHoveredFlags_AllowWhenDisabled](#ImGuiHoveredFlags_AllowWhenDisabled)**  –  Return true even if the item is disabled

**[ImGuiHoveredFlags_RectOnly](#ImGuiHoveredFlags_RectOnly)**  –  undefined
##  Flags for ImGui::BeginDragDropSource(), ImGui::AcceptDragDropPayload()

**[ImGuiDragDropFlags_None](#ImGuiDragDropFlags_None)**  –  undefined

**[ImGuiDragDropFlags_SourceNoPreviewTooltip](#ImGuiDragDropFlags_SourceNoPreviewTooltip)**  –  By default, a successful call to BeginDragDropSource opens a tooltip so you can display a preview or description of the source contents. This flag disable this behavior.

**[ImGuiDragDropFlags_SourceNoDisableHover](#ImGuiDragDropFlags_SourceNoDisableHover)**  –  By default, when dragging we clear data so that IsItemHovered() will return false, to avoid subsequent user code submitting tooltips. This flag disable this behavior so you can still call IsItemHovered() on the source item.

**[ImGuiDragDropFlags_SourceNoHoldToOpenOthers](#ImGuiDragDropFlags_SourceNoHoldToOpenOthers)**  –  Disable the behavior that allows to open tree nodes and collapsing header by holding over them while dragging a source item.

**[ImGuiDragDropFlags_SourceAllowNullID](#ImGuiDragDropFlags_SourceAllowNullID)**  –  Allow items such as Text(), Image() that have no unique identifier to be used as drag source, by manufacturing a temporary identifier based on their window-relative position. This is extremely unusual within the dear imgui ecosystem and so we made it explicit.

**[ImGuiDragDropFlags_SourceExtern](#ImGuiDragDropFlags_SourceExtern)**  –  External source (from outside of dear imgui), won't attempt to read current item/window info. Will always return true. Only one Extern source can be active simultaneously.

**[ImGuiDragDropFlags_SourceAutoExpirePayload](#ImGuiDragDropFlags_SourceAutoExpirePayload)**  –  Automatically expire the payload if the source cease to be submitted (otherwise payloads are persisting while being dragged)

**[ImGuiDragDropFlags_AcceptBeforeDelivery](#ImGuiDragDropFlags_AcceptBeforeDelivery)**  –  AcceptDragDropPayload() will returns true even before the mouse button is released. You can then call IsDelivery() to test if the payload needs to be delivered.

**[ImGuiDragDropFlags_AcceptNoDrawDefaultRect](#ImGuiDragDropFlags_AcceptNoDrawDefaultRect)**  –  Do not draw the default highlight rectangle when hovering over target.

**[ImGuiDragDropFlags_AcceptNoPreviewTooltip](#ImGuiDragDropFlags_AcceptNoPreviewTooltip)**  –  Request hiding the BeginDragDropSource tooltip from the BeginDragDropTarget site.
##  Standard Drag and Drop payload types. You can define you own payload types using short strings. Types starting with '_' are defined by Dear ImGui.
##  A primary data type

**[ImGuiDataType_S8](#ImGuiDataType_S8)**  –  signed char / char (with sensible compilers)

**[ImGuiDataType_U8](#ImGuiDataType_U8)**  –  unsigned char

**[ImGuiDataType_S16](#ImGuiDataType_S16)**  –  short

**[ImGuiDataType_U16](#ImGuiDataType_U16)**  –  unsigned short

**[ImGuiDataType_S32](#ImGuiDataType_S32)**  –  int

**[ImGuiDataType_U32](#ImGuiDataType_U32)**  –  unsigned int

**[ImGuiDataType_S64](#ImGuiDataType_S64)**  –  long long / __int64

**[ImGuiDataType_U64](#ImGuiDataType_U64)**  –  unsigned long long / unsigned __int64

**[ImGuiDataType_Float](#ImGuiDataType_Float)**  –  float

**[ImGuiDataType_Double](#ImGuiDataType_Double)**  –  double
##  A cardinal direction

**[ImGuiDir_None](#ImGuiDir_None)**  –  undefined

**[ImGuiDir_Left](#ImGuiDir_Left)**  –  undefined

**[ImGuiDir_Right](#ImGuiDir_Right)**  –  undefined

**[ImGuiDir_Up](#ImGuiDir_Up)**  –  undefined

**[ImGuiDir_Down](#ImGuiDir_Down)**  –  undefined
##  User fill ImGuiIO.KeyMap[] array with indices into the ImGuiIO.KeysDown[512] array

**[ImGuiKey_Tab](#ImGuiKey_Tab)**  –  undefined

**[ImGuiKey_LeftArrow](#ImGuiKey_LeftArrow)**  –  undefined

**[ImGuiKey_RightArrow](#ImGuiKey_RightArrow)**  –  undefined

**[ImGuiKey_UpArrow](#ImGuiKey_UpArrow)**  –  undefined

**[ImGuiKey_DownArrow](#ImGuiKey_DownArrow)**  –  undefined

**[ImGuiKey_PageUp](#ImGuiKey_PageUp)**  –  undefined

**[ImGuiKey_PageDown](#ImGuiKey_PageDown)**  –  undefined

**[ImGuiKey_Home](#ImGuiKey_Home)**  –  undefined

**[ImGuiKey_End](#ImGuiKey_End)**  –  undefined

**[ImGuiKey_Insert](#ImGuiKey_Insert)**  –  undefined

**[ImGuiKey_Delete](#ImGuiKey_Delete)**  –  undefined

**[ImGuiKey_Backspace](#ImGuiKey_Backspace)**  –  undefined

**[ImGuiKey_Space](#ImGuiKey_Space)**  –  undefined

**[ImGuiKey_Enter](#ImGuiKey_Enter)**  –  undefined

**[ImGuiKey_Escape](#ImGuiKey_Escape)**  –  undefined

**[ImGuiKey_KeyPadEnter](#ImGuiKey_KeyPadEnter)**  –  undefined

**[ImGuiKey_A](#ImGuiKey_A)**  –  for text edit CTRL+A: select all

**[ImGuiKey_C](#ImGuiKey_C)**  –  for text edit CTRL+C: copy

**[ImGuiKey_V](#ImGuiKey_V)**  –  for text edit CTRL+V: paste

**[ImGuiKey_X](#ImGuiKey_X)**  –  for text edit CTRL+X: cut

**[ImGuiKey_Y](#ImGuiKey_Y)**  –  for text edit CTRL+Y: redo

**[ImGuiKey_Z](#ImGuiKey_Z)**  –  for text edit CTRL+Z: undo
##  To test io.KeyMods (which is a combination of individual fields io.KeyCtrl, io.KeyShift, io.KeyAlt set by user/back-end)

**[ImGuiKeyModFlags_None](#ImGuiKeyModFlags_None)**  –  undefined

**[ImGuiKeyModFlags_Ctrl](#ImGuiKeyModFlags_Ctrl)**  –  undefined

**[ImGuiKeyModFlags_Shift](#ImGuiKeyModFlags_Shift)**  –  undefined

**[ImGuiKeyModFlags_Alt](#ImGuiKeyModFlags_Alt)**  –  undefined
##  Gamepad/Keyboard navigation
 - XXXKeyboard: Set `io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard` to enable. `NewFrame()` will automatically fill `io.NavInputs[]` based on your `io.KeysDown[]` and `io.KeyMap[]` arrays.
 - Gamepad:  Set io.ConfigFlags |= ImGuiConfigFlags_NavEnableGamepad to enable. Back-end: set ImGuiBackendFlags_HasGamepad and fill the `io.NavInputs[]` fields before calling `NewFrame()`. Note that `io.NavInputs[]` is cleared by `EndFrame()`.
 - Read instructions in imgui.cpp for more details. Download PNG/PSD at http:goo.gl/9LgVZW.

**[ImGuiNavInput_Activate](#ImGuiNavInput_Activate)**  –  activate / open / toggle / tweak value       // e.g. Cross  (PS4), A (Xbox), A (Switch), Space (Keyboard)

**[ImGuiNavInput_Cancel](#ImGuiNavInput_Cancel)**  –  cancel / close / exit                        // e.g. Circle (PS4), B (Xbox), B (Switch), Escape (Keyboard)

**[ImGuiNavInput_Input](#ImGuiNavInput_Input)**  –  text input / on-screen keyboard              // e.g. Triang.(PS4), Y (Xbox), X (Switch), Return (Keyboard)

**[ImGuiNavInput_Menu](#ImGuiNavInput_Menu)**  –  tap: toggle menu / hold: focus, move, resize // e.g. Square (PS4), X (Xbox), Y (Switch), Alt (Keyboard)

**[ImGuiNavInput_DpadLeft](#ImGuiNavInput_DpadLeft)**  –  move / tweak / resize window (w/ PadMenu)    // e.g. D-pad Left/Right/Up/Down (Gamepads), Arrow keys (Keyboard)

**[ImGuiNavInput_DpadRight](#ImGuiNavInput_DpadRight)**  –  ImGuiNavInput_DpadUp,        //

**[ImGuiNavInput_DpadDown](#ImGuiNavInput_DpadDown)**  –  ImGuiNavInput_LStickLeft,    // scroll / move window (w/ PadMenu)            // e.g. Left Analog Stick Left/Right/Up/Down

**[ImGuiNavInput_LStickRight](#ImGuiNavInput_LStickRight)**  –  ImGuiNavInput_LStickUp,      //

**[ImGuiNavInput_LStickDown](#ImGuiNavInput_LStickDown)**  –  ImGuiNavInput_FocusPrev,     // next window (w/ PadMenu)                     // e.g. L1 or L2 (PS4), LB or LT (Xbox), L or ZL (Switch)

**[ImGuiNavInput_FocusNext](#ImGuiNavInput_FocusNext)**  –  prev window (w/ PadMenu)                     // e.g. R1 or R2 (PS4), RB or RT (Xbox), R or ZL (Switch)

**[ImGuiNavInput_TweakSlow](#ImGuiNavInput_TweakSlow)**  –  slower tweaks                                // e.g. L1 or L2 (PS4), LB or LT (Xbox), L or ZL (Switch)

**[ImGuiNavInput_TweakFast](#ImGuiNavInput_TweakFast)**  –  faster tweaks                                // e.g. R1 or R2 (PS4), RB or RT (Xbox), R or ZL (Switch)

**[ImGuiNavInput_KeyMenu_](#ImGuiNavInput_KeyMenu_)**  –  toggle menu                                  // = io.KeyAlt

**[ImGuiNavInput_KeyLeft_](#ImGuiNavInput_KeyLeft_)**  –  move left                                    // = Arrow keys

**[ImGuiNavInput_KeyRight_](#ImGuiNavInput_KeyRight_)**  –  move right

**[ImGuiNavInput_KeyUp_](#ImGuiNavInput_KeyUp_)**  –  move up

**[ImGuiNavInput_KeyDown_](#ImGuiNavInput_KeyDown_)**  –  move down

**[ImGuiNavInput_COUNT](#ImGuiNavInput_COUNT)**  –  undefined
##  Configuration flags stored in io.ConfigFlags. Set by user/application.

**[ImGuiConfigFlags_None](#ImGuiConfigFlags_None)**  –  undefined

**[ImGuiConfigFlags_NavEnableKeyboard](#ImGuiConfigFlags_NavEnableKeyboard)**  –  Master keyboard navigation enable flag. NewFrame() will automatically fill io.NavInputs[] based on io.KeysDown[].

**[ImGuiConfigFlags_NavEnableGamepad](#ImGuiConfigFlags_NavEnableGamepad)**  –  Master gamepad navigation enable flag. This is mostly to instruct your imgui back-end to fill io.NavInputs[]. Back-end also needs to set ImGuiBackendFlags_HasGamepad.

**[ImGuiConfigFlags_NavEnableSetMousePos](#ImGuiConfigFlags_NavEnableSetMousePos)**  –  Instruct navigation to move the mouse cursor. May be useful on TV/console systems where moving a virtual mouse is awkward. Will update io.MousePos and set io.WantSetMousePos=true. If enabled you MUST honor io.WantSetMousePos requests in your binding, otherwise ImGui will react as if the mouse is jumping around back and forth.

**[ImGuiConfigFlags_NavNoCaptureKeyboard](#ImGuiConfigFlags_NavNoCaptureKeyboard)**  –  Instruct navigation to not set the io.WantCaptureKeyboard flag when io.NavActive is set.

**[ImGuiConfigFlags_NoMouse](#ImGuiConfigFlags_NoMouse)**  –  Instruct imgui to clear mouse position/buttons in NewFrame(). This allows ignoring the mouse information set by the back-end.

**[ImGuiConfigFlags_NoMouseCursorChange](#ImGuiConfigFlags_NoMouseCursorChange)**  –  Instruct back-end to not alter mouse cursor shape and visibility. Use if the back-end cursor changes are interfering with yours and you don't want to use SetMouseCursor() to change mouse cursor. You may want to honor requests from imgui by reading GetMouseCursor() yourself instead.

**[ImGuiConfigFlags_IsSRGB](#ImGuiConfigFlags_IsSRGB)**  –  Application is SRGB-aware.
##  Back-end capabilities flags stored in io.BackendFlags. Set by imgui_impl_xxx or custom back-end.

**[ImGuiBackendFlags_None](#ImGuiBackendFlags_None)**  –  undefined

**[ImGuiBackendFlags_HasGamepad](#ImGuiBackendFlags_HasGamepad)**  –  Back-end Platform supports gamepad and currently has one connected.

**[ImGuiBackendFlags_HasMouseCursors](#ImGuiBackendFlags_HasMouseCursors)**  –  Back-end Platform supports honoring GetMouseCursor() value to change the OS cursor shape.

**[ImGuiBackendFlags_HasSetMousePos](#ImGuiBackendFlags_HasSetMousePos)**  –  Back-end Platform supports io.WantSetMousePos requests to reposition the OS mouse position (only used if ImGuiConfigFlags_NavEnableSetMousePos is set).
##  Enumeration for PushStyleColor() / PopStyleColor()

**[ImGuiCol_Text](#ImGuiCol_Text)**  –  undefined

**[ImGuiCol_TextDisabled](#ImGuiCol_TextDisabled)**  –  undefined

**[ImGuiCol_WindowBg](#ImGuiCol_WindowBg)**  –  Background of normal windows

**[ImGuiCol_ChildBg](#ImGuiCol_ChildBg)**  –  Background of child windows

**[ImGuiCol_PopupBg](#ImGuiCol_PopupBg)**  –  Background of popups, menus, tooltips windows

**[ImGuiCol_Border](#ImGuiCol_Border)**  –  undefined

**[ImGuiCol_BorderShadow](#ImGuiCol_BorderShadow)**  –  undefined

**[ImGuiCol_FrameBg](#ImGuiCol_FrameBg)**  –  Background of checkbox, radio button, plot, slider, text input

**[ImGuiCol_FrameBgHovered](#ImGuiCol_FrameBgHovered)**  –  undefined

**[ImGuiCol_FrameBgActive](#ImGuiCol_FrameBgActive)**  –  undefined

**[ImGuiCol_TitleBg](#ImGuiCol_TitleBg)**  –  undefined

**[ImGuiCol_TitleBgActive](#ImGuiCol_TitleBgActive)**  –  undefined

**[ImGuiCol_TitleBgCollapsed](#ImGuiCol_TitleBgCollapsed)**  –  undefined

**[ImGuiCol_MenuBarBg](#ImGuiCol_MenuBarBg)**  –  undefined

**[ImGuiCol_ScrollbarBg](#ImGuiCol_ScrollbarBg)**  –  undefined

**[ImGuiCol_ScrollbarGrab](#ImGuiCol_ScrollbarGrab)**  –  undefined

**[ImGuiCol_ScrollbarGrabHovered](#ImGuiCol_ScrollbarGrabHovered)**  –  undefined

**[ImGuiCol_ScrollbarGrabActive](#ImGuiCol_ScrollbarGrabActive)**  –  undefined

**[ImGuiCol_CheckMark](#ImGuiCol_CheckMark)**  –  undefined

**[ImGuiCol_SliderGrab](#ImGuiCol_SliderGrab)**  –  undefined

**[ImGuiCol_SliderGrabActive](#ImGuiCol_SliderGrabActive)**  –  undefined

**[ImGuiCol_Button](#ImGuiCol_Button)**  –  undefined

**[ImGuiCol_ButtonHovered](#ImGuiCol_ButtonHovered)**  –  undefined

**[ImGuiCol_ButtonActive](#ImGuiCol_ButtonActive)**  –  undefined

**[ImGuiCol_Header](#ImGuiCol_Header)**  –  Header* colors are used for CollapsingHeader, TreeNode, Selectable, MenuItem

**[ImGuiCol_HeaderHovered](#ImGuiCol_HeaderHovered)**  –  undefined

**[ImGuiCol_HeaderActive](#ImGuiCol_HeaderActive)**  –  undefined

**[ImGuiCol_Separator](#ImGuiCol_Separator)**  –  undefined

**[ImGuiCol_SeparatorHovered](#ImGuiCol_SeparatorHovered)**  –  undefined

**[ImGuiCol_SeparatorActive](#ImGuiCol_SeparatorActive)**  –  undefined

**[ImGuiCol_ResizeGrip](#ImGuiCol_ResizeGrip)**  –  undefined

**[ImGuiCol_ResizeGripHovered](#ImGuiCol_ResizeGripHovered)**  –  undefined

**[ImGuiCol_ResizeGripActive](#ImGuiCol_ResizeGripActive)**  –  undefined

**[ImGuiCol_Tab](#ImGuiCol_Tab)**  –  undefined

**[ImGuiCol_TabHovered](#ImGuiCol_TabHovered)**  –  undefined

**[ImGuiCol_TabActive](#ImGuiCol_TabActive)**  –  undefined

**[ImGuiCol_TabUnfocused](#ImGuiCol_TabUnfocused)**  –  undefined

**[ImGuiCol_TabUnfocusedActive](#ImGuiCol_TabUnfocusedActive)**  –  undefined

**[ImGuiCol_PlotLines](#ImGuiCol_PlotLines)**  –  undefined

**[ImGuiCol_PlotLinesHovered](#ImGuiCol_PlotLinesHovered)**  –  undefined

**[ImGuiCol_PlotHistogram](#ImGuiCol_PlotHistogram)**  –  undefined

**[ImGuiCol_PlotHistogramHovered](#ImGuiCol_PlotHistogramHovered)**  –  undefined

**[ImGuiCol_TextSelectedBg](#ImGuiCol_TextSelectedBg)**  –  undefined

**[ImGuiCol_DragDropTarget](#ImGuiCol_DragDropTarget)**  –  undefined

**[ImGuiCol_NavHighlight](#ImGuiCol_NavHighlight)**  –  Gamepad/keyboard: current highlighted item

**[ImGuiCol_NavWindowingHighlight](#ImGuiCol_NavWindowingHighlight)**  –  Highlight window when using CTRL+TAB

**[ImGuiCol_NavWindowingDimBg](#ImGuiCol_NavWindowingDimBg)**  –  Darken/colorize entire screen behind the CTRL+TAB window list, when active

**[ImGuiCol_ModalWindowDimBg](#ImGuiCol_ModalWindowDimBg)**  –  Darken/colorize entire screen behind a modal window, when one is active
##  Enumeration for PushStyleVar() / PopStyleVar() to temporarily modify the ImGuiStyle structure.
 - The enum only refers to fields of ImGuiStyle which makes sense to be pushed/popped inside UI code.
   During initialization or between frames, feel free to just poke into ImGuiStyle directly.
 - Tip: Use your programming IDE navigation facilities on the names in the _second column_ below to find the actual members and their description.
   In Visual Studio IDE: CTRL+comma ("Edit.NavigateTo") can follow symbols in comments, whereas CTRL+F12 ("Edit.GoToImplementation") cannot.
   With Visual Assist installed: ALT+G ("VAssistX.GoToImplementation") can also follow symbols in comments.
 - When changing this enum, you need to update the associated internal table GStyleVarInfo[] accordingly. This is where we link enum values to members offset/type.

**[ImGuiStyleVar_Alpha](#ImGuiStyleVar_Alpha)**  –  float     Alpha

**[ImGuiStyleVar_WindowPadding](#ImGuiStyleVar_WindowPadding)**  –  ImVec2    WindowPadding

**[ImGuiStyleVar_WindowRounding](#ImGuiStyleVar_WindowRounding)**  –  float     WindowRounding

**[ImGuiStyleVar_WindowBorderSize](#ImGuiStyleVar_WindowBorderSize)**  –  float     WindowBorderSize

**[ImGuiStyleVar_WindowMinSize](#ImGuiStyleVar_WindowMinSize)**  –  ImVec2    WindowMinSize

**[ImGuiStyleVar_WindowTitleAlign](#ImGuiStyleVar_WindowTitleAlign)**  –  ImVec2    WindowTitleAlign

**[ImGuiStyleVar_ChildRounding](#ImGuiStyleVar_ChildRounding)**  –  float     ChildRounding

**[ImGuiStyleVar_ChildBorderSize](#ImGuiStyleVar_ChildBorderSize)**  –  float     ChildBorderSize

**[ImGuiStyleVar_PopupRounding](#ImGuiStyleVar_PopupRounding)**  –  float     PopupRounding

**[ImGuiStyleVar_PopupBorderSize](#ImGuiStyleVar_PopupBorderSize)**  –  float     PopupBorderSize

**[ImGuiStyleVar_FramePadding](#ImGuiStyleVar_FramePadding)**  –  ImVec2    FramePadding

**[ImGuiStyleVar_FrameRounding](#ImGuiStyleVar_FrameRounding)**  –  float     FrameRounding

**[ImGuiStyleVar_FrameBorderSize](#ImGuiStyleVar_FrameBorderSize)**  –  float     FrameBorderSize

**[ImGuiStyleVar_ItemSpacing](#ImGuiStyleVar_ItemSpacing)**  –  ImVec2    ItemSpacing

**[ImGuiStyleVar_ItemInnerSpacing](#ImGuiStyleVar_ItemInnerSpacing)**  –  ImVec2    ItemInnerSpacing

**[ImGuiStyleVar_IndentSpacing](#ImGuiStyleVar_IndentSpacing)**  –  float     IndentSpacing

**[ImGuiStyleVar_ScrollbarSize](#ImGuiStyleVar_ScrollbarSize)**  –  float     ScrollbarSize

**[ImGuiStyleVar_ScrollbarRounding](#ImGuiStyleVar_ScrollbarRounding)**  –  float     ScrollbarRounding

**[ImGuiStyleVar_GrabMinSize](#ImGuiStyleVar_GrabMinSize)**  –  float     GrabMinSize

**[ImGuiStyleVar_GrabRounding](#ImGuiStyleVar_GrabRounding)**  –  float     GrabRounding

**[ImGuiStyleVar_TabRounding](#ImGuiStyleVar_TabRounding)**  –  float     TabRounding

**[ImGuiStyleVar_ButtonTextAlign](#ImGuiStyleVar_ButtonTextAlign)**  –  ImVec2    ButtonTextAlign

**[ImGuiStyleVar_SelectableTextAlign](#ImGuiStyleVar_SelectableTextAlign)**  –  ImVec2    SelectableTextAlign
##  Flags for ColorEdit3() / ColorEdit4() / ColorPicker3() / ColorPicker4() / ColorButton()

**[ImGuiColorEditFlags_None](#ImGuiColorEditFlags_None)**  –  undefined

**[ImGuiColorEditFlags_NoAlpha](#ImGuiColorEditFlags_NoAlpha)**  –  // ColorEdit, ColorPicker, ColorButton: ignore Alpha component (will only read 3 components from the input pointer).

**[ImGuiColorEditFlags_NoPicker](#ImGuiColorEditFlags_NoPicker)**  –  // ColorEdit: disable picker when clicking on colored square.

**[ImGuiColorEditFlags_NoOptions](#ImGuiColorEditFlags_NoOptions)**  –  // ColorEdit: disable toggling options menu when right-clicking on inputs/small preview.

**[ImGuiColorEditFlags_NoSmallPreview](#ImGuiColorEditFlags_NoSmallPreview)**  –  // ColorEdit, ColorPicker: disable colored square preview next to the inputs. (e.g. to show only the inputs)

**[ImGuiColorEditFlags_NoInputs](#ImGuiColorEditFlags_NoInputs)**  –  // ColorEdit, ColorPicker: disable inputs sliders/text widgets (e.g. to show only the small preview colored square).

**[ImGuiColorEditFlags_NoTooltip](#ImGuiColorEditFlags_NoTooltip)**  –  // ColorEdit, ColorPicker, ColorButton: disable tooltip when hovering the preview.

**[ImGuiColorEditFlags_NoLabel](#ImGuiColorEditFlags_NoLabel)**  –  // ColorEdit, ColorPicker: disable display of inline text label (the label is still forwarded to the tooltip and picker).

**[ImGuiColorEditFlags_NoSidePreview](#ImGuiColorEditFlags_NoSidePreview)**  –  // ColorPicker: disable bigger color preview on right side of the picker, use small colored square preview instead.

**[ImGuiColorEditFlags_NoDragDrop](#ImGuiColorEditFlags_NoDragDrop)**  –  // ColorEdit: disable drag and drop target. ColorButton: disable drag and drop source.

**[ImGuiColorEditFlags_NoBorder](#ImGuiColorEditFlags_NoBorder)**  –  // ColorButton: disable border (which is enforced by default)

**[ImGuiColorEditFlags_AlphaBar](#ImGuiColorEditFlags_AlphaBar)**  –  // ColorEdit, ColorPicker: show vertical alpha bar/gradient in picker.

**[ImGuiColorEditFlags_AlphaPreview](#ImGuiColorEditFlags_AlphaPreview)**  –  // ColorEdit, ColorPicker, ColorButton: display preview as a transparent color over a checkerboard, instead of opaque.

**[18](#18)**  –  // ColorEdit, ColorPicker, ColorButton: display half opaque / half checkerboard, instead of opaque.

**[ImGuiColorEditFlags_HDR](#ImGuiColorEditFlags_HDR)**  –  // (WIP) ColorEdit: Currently only disable 0.0f..1.0f limits in RGBA edition (note: you probably want to use ImGuiColorEditFlags_Float flag as well).

**[ImGuiColorEditFlags_DisplayRGB](#ImGuiColorEditFlags_DisplayRGB)**  –  [Display]    // ColorEdit: override _display_ type among RGB/HSV/Hex. ColorPicker: select any combination using one or more of RGB/HSV/Hex.

**[ImGuiColorEditFlags_DisplayHSV](#ImGuiColorEditFlags_DisplayHSV)**  –  [Display]    // "

**[ImGuiColorEditFlags_DisplayHex](#ImGuiColorEditFlags_DisplayHex)**  –  [Display]    // "

**[ImGuiColorEditFlags_Uint8](#ImGuiColorEditFlags_Uint8)**  –  [DataType]   // ColorEdit, ColorPicker, ColorButton: _display_ values formatted as 0..255.

**[ImGuiColorEditFlags_Float](#ImGuiColorEditFlags_Float)**  –  [DataType]   // ColorEdit, ColorPicker, ColorButton: _display_ values formatted as 0.0f..1.0f floats instead of 0..255 integers. No round-trip of value via integers.

**[ImGuiColorEditFlags_PickerHueBar](#ImGuiColorEditFlags_PickerHueBar)**  –  [Picker]     // ColorPicker: bar for Hue, rectangle for Sat/Value.

**[ImGuiColorEditFlags_PickerHueWheel](#ImGuiColorEditFlags_PickerHueWheel)**  –  [Picker]     // ColorPicker: wheel for Hue, triangle for Sat/Value.

**[ImGuiColorEditFlags_InputRGB](#ImGuiColorEditFlags_InputRGB)**  –  [Input]      // ColorEdit, ColorPicker: input and output data in RGB format.

**[ImGuiColorEditFlags_InputHSV](#ImGuiColorEditFlags_InputHSV)**  –  [Input]      // ColorEdit, ColorPicker: input and output data in HSV format.

**[ImGuiColorEditFlags__OptionsDefault](#ImGuiColorEditFlags__OptionsDefault)**  –  undefined

**[ImGuiColorEditFlags__DisplayMask](#ImGuiColorEditFlags__DisplayMask)**  –  undefined

**[ImGuiColorEditFlags__DataTypeMask](#ImGuiColorEditFlags__DataTypeMask)**  –  undefined

**[ImGuiColorEditFlags__PickerMask](#ImGuiColorEditFlags__PickerMask)**  –  undefined
##  Identify a mouse button.
 Those values are guaranteed to be stable and we frequently use 0/1 directly. Named enums provided for convenience.

**[ImGuiMouseButton_Left](#ImGuiMouseButton_Left)**  –  undefined

**[ImGuiMouseButton_Right](#ImGuiMouseButton_Right)**  –  undefined

**[ImGuiMouseButton_Middle](#ImGuiMouseButton_Middle)**  –  undefined
##  Enumeration for GetMouseCursor()
 User code may request binding to display given cursor by calling SetMouseCursor(), which is why we have some cursors that are marked unused here

**[ImGuiMouseCursor_None](#ImGuiMouseCursor_None)**  –  undefined

**[ImGuiMouseCursor_Arrow](#ImGuiMouseCursor_Arrow)**  –  undefined

**[ImGuiMouseCursor_TextInput](#ImGuiMouseCursor_TextInput)**  –  When hovering over InputText, etc.

**[ImGuiMouseCursor_ResizeAll](#ImGuiMouseCursor_ResizeAll)**  –  (Unused by Dear ImGui functions)

**[ImGuiMouseCursor_ResizeNS](#ImGuiMouseCursor_ResizeNS)**  –  When hovering over an horizontal border

**[ImGuiMouseCursor_ResizeEW](#ImGuiMouseCursor_ResizeEW)**  –  When hovering over a vertical border or a column

**[ImGuiMouseCursor_ResizeNESW](#ImGuiMouseCursor_ResizeNESW)**  –  When hovering over the bottom-left corner of a window

**[ImGuiMouseCursor_ResizeNWSE](#ImGuiMouseCursor_ResizeNWSE)**  –  When hovering over the bottom-right corner of a window

**[ImGuiMouseCursor_Hand](#ImGuiMouseCursor_Hand)**  –  (Unused by Dear ImGui functions. Use for e.g. hyperlinks)

**[ImGuiMouseCursor_NotAllowed](#ImGuiMouseCursor_NotAllowed)**  –  When hovering something with disallowed interaction. Usually a crossed circle.
##  Enumeration for ImGui::SetWindow***(), SetNextWindow***(), SetNextItem***() functions
 Represent a condition.
 Important: Treat as a regular enum! Do NOT combine multiple values using binary operators! All the functions above treat 0 as a shortcut to ImGuiCond_Always.

**[ImGuiCond_Always](#ImGuiCond_Always)**  –  Set the variable

**[ImGuiCond_Once](#ImGuiCond_Once)**  –  Set the variable once per runtime session (only the first call will succeed)

**[ImGuiCond_FirstUseEver](#ImGuiCond_FirstUseEver)**  –  Set the variable if the object/window has no persistently saved data (no entry in .ini file)
