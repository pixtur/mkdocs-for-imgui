# Helpers
##  Helper: Unicode defines
##  Helper: Execute a block of code at maximum once a frame. Convenient if you want to quickly create an UI within deep-nested code that runs multiple times every frame.
 Usage: static ImGuiOnceUponAFrame oaf; if (oaf) ImGui::Text("This will be called only once per frame");
##  Helper: Parse and apply text filters. In format "aaaaa[,bbbb][,ccccc]"
##  Helper: Growable text buffer for logging/accumulating text
 (this could be called 'ImGuiTextBuilder' / 'ImGuiStringBuilder')
##  Helper: Key->Value storage
 Typically you don't have to worry about this since a storage is held within each Window.
 We use it to e.g. store collapse state for a tree (Int 0/1)
 This is optimized for efficient lookup (dichotomy into a contiguous buffer) and rare insertion (typically tied to user interactions aka max once a frame)
 You can use it as custom user storage for temporary values. Declare your own storage if, for example:
 - You want to manipulate the open/close state of a particular sub-tree in your interface (tree node uses Int 0/1 to store their state).
 - You want to store custom debug data easily without adding or editing structures in your code (probably not efficient, but convenient)
 Types are NOT stored, so it is up to you to make sure your Key don't collide with different types.
##  Helper: Manually clip large list of items.
 If you are submitting lots of evenly spaced items and you have a random access to the list, you can perform coarse clipping based on visibility to save yourself from processing those items at all.
 The clipper calculates the range of visible items and advance the cursor to compensate for the non-visible items we have skipped.
 ImGui already clip items based on their bounds but it needs to measure text size to do so. Coarse clipping before submission makes this cost and your own data fetching/submission cost null.
 Usage:
     ImGuiListClipper clipper(1000);   we have 1000 elements, evenly spaced.
     while (clipper.Step())
         for (int i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
             ImGui::Text("line number %d", i);
 - Step 0: the clipper let you process the first element, regardless of it being visible or not, so we can measure the element height (step skipped if we passed a known height as second arg to constructor).
 - Step 1: the clipper infer height from first element, calculate the actual range of elements to display, and position the cursor before the first element.
 - (Step 2: dummy step only required if an explicit items_height was passed to constructor or Begin() and user call Step(). Does nothing and switch to Step 3.)
 - Step 3: the clipper validate that we have reached the expected Y position (corresponding to element DisplayEnd), advance the cursor to the end of the list and then returns 'false' to end the loop.
##  Helpers macros to generate 32-bit encoded colors
##  Helper: ImColor() implicitly converts colors to either ImU32 (packed 4x1 byte) or ImVec4 (4x1 float)
 Prefer using IM_COL32() macros if you want a guaranteed compile-time ImU32 for usage with ImDrawList API.
 **Avoid storing ImColor! Store either u32 of ImVec4. This is not a full-featured color class. MAY OBSOLETE.
 **None of the ImGui API are using ImColor directly but you can use it as a convenience to pass colors in either ImU32 or ImVec4 formats. Explicitly cast to ImU32 or ImVec4 if needed.
