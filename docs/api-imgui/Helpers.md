# Helpers
## Helper: Unicode defines

Helper: Unicode defines
## Helper: Execute a block of code at maximum once a frame. Convenient if you want to quickly create an UI within deep-nested code that runs multiple times every frame.
Usage: static ImGuiOnceUponAFrame oaf; if (oaf) ImGui::Text("This will be called only once per frame");

Helper: Execute a block of code at maximum once a frame. Convenient if you want to quickly create an UI within deep-nested code that runs multiple times every frame.
Usage: static ImGuiOnceUponAFrame oaf; if (oaf) ImGui::Text("This will be called only once per frame");
## struct  **<struct> ImGuiOnceUponAFrame**
## Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"

Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"
## struct  **<struct> ImGuiTextFilter**

``` c
I mGuiTextFilter(const char* default_filter = "")
```

``` c
bool Draw(const char* label = "Filter (inc,-exc)", float width = 0.0f)
```
Helper calling InputText+Build

``` c
bool PassFilter(const char* text, const char* text_end = NULL) const;
    IMGUI_API void      Build()
```
### [Internal]


## Helper: Growable text buffer for logging/accumulating text
(this could be called 'ImGuiTextBuilder' / 'ImGuiStringBuilder')

Helper: Growable text buffer for logging/accumulating text
(this could be called 'ImGuiTextBuilder' / 'ImGuiStringBuilder')
## struct  **<struct> ImGuiTextBuffer**

``` c
void append(const char* str, const char* str_end = NULL)
```

``` c
void appendf(const char* fmt, ...) IM_FMTARGS(2)
```

``` c
void appendfv(const char* fmt, va_list args) IM_FMTLIST(2)
```
## Helper: Key->Value storage
Typically you don't have to worry about this since a storage is held within each Window.
We use it to e.g. store collapse state for a tree (Int 0/1)
This is optimized for efficient lookup (dichotomy into a contiguous buffer) and rare insertion (typically tied to user interactions aka max once a frame)
You can use it as custom user storage for temporary values. Declare your own storage if, for example:
- You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
- You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.

Helper: Key->Value storage
Typically you don't have to worry about this since a storage is held within each Window.
We use it to e.g. store collapse state for a tree (Int 0/1)
This is optimized for efficient lookup (dichotomy into a contiguous buffer) and rare insertion (typically tied to user interactions aka max once a frame)
You can use it as custom user storage for temporary values. Declare your own storage if, for example:
- You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
- You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.
## struct  **<struct> ImGuiStorage**
### [Internal]


### - Get***() functions find pair, never add/allocate. Pairs are sorted so a query is O(log N)
- Set***() functions find pair, insertion on demand if missing.
- Sorted insertion is costly, paid once. A typical frame shouldn't need to insert any new pair.



``` c
int GetInt(ImGuiID key, int default_val = 0) const;
    IMGUI_API void      SetInt(ImGuiID key, int val)
```

``` c
bool GetBool(ImGuiID key, bool default_val = false) const;
    IMGUI_API void      SetBool(ImGuiID key, bool val)
```

``` c
float GetFloat(ImGuiID key, float default_val = 0.0f) const;
    IMGUI_API void      SetFloat(ImGuiID key, float val)
```

``` c
void* GetVoidPtr(ImGuiID key) const; // default_val is NULL
    IMGUI_API void      SetVoidPtr(ImGuiID key, void* val)
```
### - Get***Ref() functions finds pair, insert on demand if missing, return pointer. Useful if you intend to do Get+Set.
- References are only valid until a new value is added to the storage. Calling a Set***() function or a Get***Ref() function invalidates the pointer.
- A typical use case where this is convenient for quick hacking (e.g. add storage during a live Edit&Continue session if you can't modify existing struct)
float* pvar = ImGui::GetFloatRef(key); ImGui::SliderFloat("var", pvar, 0, 100.0f); some_var += *pvar;



``` c
int* GetIntRef(ImGuiID key, int default_val = 0)
```

``` c
bool* GetBoolRef(ImGuiID key, bool default_val = false)
```

``` c
float* GetFloatRef(ImGuiID key, float default_val = 0.0f)
```

``` c
void** GetVoidPtrRef(ImGuiID key, void* default_val = NULL)
```
### Use on your own storage if you know only integer are being stored (open/close all tree nodes)



``` c
void SetAllInt(int val)
```
### For quicker full rebuild of a storage (instead of an incremental one), you may add all your contents and then sort once.



``` c
void BuildSortByKey()
```
## Helper: Manually clip large list of items.
If you are submitting lots of evenly spaced items and you have a random access to the list, you can perform coarse clipping based on visibility to save yourself from processing those items at all.
The clipper calculates the range of visible items and advance the cursor to compensate for the non-visible items we have skipped.
ImGui already clip items based on their bounds but it needs to measure text size to do so. Coarse clipping before submission makes this cost and your own data fetching/submission cost null.
Usage:
ImGuiListClipper clipper(1000);  we have 1000 elements, evenly spaced.
while (clipper.Step())
for (int i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
ImGui::Text("line number %d", i);
- Step 0: the clipper let you process the first element, regardless of it being visible or not, so we can measure the element height (step skipped if we passed a known height as second arg to constructor).
- Step 1: the clipper infer height from first element, calculate the actual range of elements to display, and position the cursor before the first element.
- (Step 2: dummy step only required if an explicit items_height was passed to constructor or Begin() and user call Step(). Does nothing and switch to Step 3.)
- Step 3: the clipper validate that we have reached the expected Y position (corresponding to element DisplayEnd), advance the cursor to the end of the list and then returns 'false' to end the loop.

Helper: Manually clip large list of items.
If you are submitting lots of evenly spaced items and you have a random access to the list, you can perform coarse clipping based on visibility to save yourself from processing those items at all.
The clipper calculates the range of visible items and advance the cursor to compensate for the non-visible items we have skipped.
ImGui already clip items based on their bounds but it needs to measure text size to do so. Coarse clipping before submission makes this cost and your own data fetching/submission cost null.
Usage:
ImGuiListClipper clipper(1000);  we have 1000 elements, evenly spaced.
while (clipper.Step())
for (int i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
ImGui::Text("line number %d", i);
- Step 0: the clipper let you process the first element, regardless of it being visible or not, so we can measure the element height (step skipped if we passed a known height as second arg to constructor).
- Step 1: the clipper infer height from first element, calculate the actual range of elements to display, and position the cursor before the first element.
- (Step 2: dummy step only required if an explicit items_height was passed to constructor or Begin() and user call Step(). Does nothing and switch to Step 3.)
- Step 3: the clipper validate that we have reached the expected Y position (corresponding to element DisplayEnd), advance the cursor to the end of the list and then returns 'false' to end the loop.
## struct  **<struct> ImGuiListClipper**
### [Internal]


### items_count:  Use -1 to ignore (you can call Begin later). Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step).
items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
If you don't specify an items_height, you NEED to call Step(). If you specify items_height you may call the old Begin()/End() api directly, but prefer calling Step().



``` c
bool Step()
```
Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.

``` c
void Begin(int items_count, float items_height = -1.0f)
```
Automatically called by constructor if you passed 'items_count' or by Step() in Step 1.

``` c
void End()
```
Automatically called on the last call of Step() that returns false.
## Helpers macros to generate 32-bit encoded colors

Helpers macros to generate 32-bit encoded colors
## Helper: ImColor() implicitly converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
**Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
**None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.

Helper: ImColor() implicitly converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
**Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
**None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.
## struct  **<struct> ImColor**
### FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.


