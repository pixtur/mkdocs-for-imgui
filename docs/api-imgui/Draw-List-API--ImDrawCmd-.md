# Draw List API (ImDrawCmd, ImDrawIdx, ImDrawVert, ImDrawChannel, ImDrawListSplitter, ImDrawListFlags, ImDrawList, ImDrawData)
// Hold a series of drawing commands. The user provides a renderer for ImDrawData which essentially contains an array of ImDrawList.
## ImDrawCallback: Draw callbacks for advanced uses [configurable type: override in imconfig.h]
NB: You most likely do NOT need to use draw callbacks just to create your own widget or customized UI rendering,
you can poke into the draw list for that! Draw callback may be useful for example to:
A) Change your GPU render state,
B) render a complex 3D scene inside a UI element without an intermediate texture/render target, etc.
The expected behavior from your rendering function is 'if (cmd.UserCallback != NULL) { cmd.UserCallback(parent_list, cmd); } else { RenderTriangles() }'
If you want to override the signature of ImDrawCallback, you can simply use e.g. '#define ImDrawCallback MyDrawCallback' (in imconfig.h) + update rendering back-end accordingly.

ImDrawCallback: Draw callbacks for advanced uses [configurable type: override in imconfig.h]
NB: You most likely do NOT need to use draw callbacks just to create your own widget or customized UI rendering,
you can poke into the draw list for that! Draw callback may be useful for example to:
A) Change your GPU render state,
B) render a complex 3D scene inside a UI element without an intermediate texture/render target, etc.
The expected behavior from your rendering function is 'if (cmd.UserCallback != NULL) { cmd.UserCallback(parent_list, cmd); } else { RenderTriangles() }'
If you want to override the signature of ImDrawCallback, you can simply use e.g. '#define ImDrawCallback MyDrawCallback' (in imconfig.h) + update rendering back-end accordingly.
## Special Draw callback value to request renderer back-end to reset the graphics/render state.
The renderer back-end needs to handle this special value, otherwise it will crash trying to call a function at this address.
This is useful for example if you submitted callbacks which you know have altered the render state and you want it to be restored.
It is not done by default because they are many perfectly useful way of altering render state for imgui contents (e.g. changing shader/blending settings before an Image call).

Special Draw callback value to request renderer back-end to reset the graphics/render state.
The renderer back-end needs to handle this special value, otherwise it will crash trying to call a function at this address.
This is useful for example if you submitted callbacks which you know have altered the render state and you want it to be restored.
It is not done by default because they are many perfectly useful way of altering render state for imgui contents (e.g. changing shader/blending settings before an Image call).
## Typically, 1 command = 1 GPU draw call (unless command is a callback)
Pre 1.71 back-ends will typically ignore the VtxOffset/IdxOffset fields. When 'io.BackendFlags & ImGuiBackendFlags_RendererHasVtxOffset'
is enabled, those fields allow us to render meshes larger than 64K vertices while keeping 16-bit indices.

Typically, 1 command = 1 GPU draw call (unless command is a callback)
Pre 1.71 back-ends will typically ignore the VtxOffset/IdxOffset fields. When 'io.BackendFlags & ImGuiBackendFlags_RendererHasVtxOffset'
is enabled, those fields allow us to render meshes larger than 64K vertices while keeping 16-bit indices.
## struct  **<struct> ImDrawCmd**
## Vertex index, default to 16-bit
To allow large meshes with 16-bit indices: set 'io.BackendFlags |= ImGuiBackendFlags_RendererHasVtxOffset' and handle ImDrawCmd::VtxOffset in the renderer back-end (recommended).
To use 32-bit indices: override with '#define ImDrawIdx unsigned int' in imconfig.h.

Vertex index, default to 16-bit
To allow large meshes with 16-bit indices: set 'io.BackendFlags |= ImGuiBackendFlags_RendererHasVtxOffset' and handle ImDrawCmd::VtxOffset in the renderer back-end (recommended).
To use 32-bit indices: override with '#define ImDrawIdx unsigned int' in imconfig.h.
## Vertex layout

Vertex layout
## struct  **<struct> ImDrawVert**
## You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
The type has to be described within the macro (you can either declare the struct or use a typedef). This is because ImVec2/ImU32 are likely not declared a the time you'd want to set your type up.
NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.

You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
The type has to be described within the macro (you can either declare the struct or use a typedef). This is because ImVec2/ImU32 are likely not declared a the time you'd want to set your type up.
NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
## For use by ImDrawListSplitter.

For use by ImDrawListSplitter.
## struct  **<struct> ImDrawChannel**
## Split/Merge functions are used to split the draw list into different layers which can be drawn into out of order.
This is used by the Columns api, so items of each column can be batched together in a same draw call.

Split/Merge functions are used to split the draw list into different layers which can be drawn into out of order.
This is used by the Columns api, so items of each column can be batched together in a same draw call.
## struct  **<struct> ImDrawListSplitter**

``` c
void ClearFreeMemory()
```

``` c
void Split(ImDrawList* draw_list, int count)
```

``` c
void Merge(ImDrawList* draw_list)
```

``` c
void SetCurrentChannel(ImDrawList* draw_list, int channel_idx)
```
## enum  **<enum> ImDrawCornerFlags_**
## enum  **<enum> ImDrawListFlags_**
## Draw command list
This is the low-level list of polygons that ImGui:: functions are filling. At the end of the frame,
all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
Each dear imgui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to
access the current window draw list and draw custom primitives.
You can interleave normal ImGui:: calls and adding primitives to the current draw list.
All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), but you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.

Draw command list
This is the low-level list of polygons that ImGui:: functions are filling. At the end of the frame,
all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
Each dear imgui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to
access the current window draw list and draw custom primitives.
You can interleave normal ImGui:: calls and adding primitives to the current draw list.
All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), but you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
## struct  **<struct> ImDrawList**
### This is what you have to render


### [Internal, used while building lists]


### If you want to create ImDrawList instances, pass them ImGui::GetDrawListSharedData() or create and use your own ImDrawListSharedData (so you can use ImDrawList without ImGui)



``` c
void PushClipRect(ImVec2 clip_rect_min, ImVec2 clip_rect_max, bool intersect_with_current_clip_rect = false)
```
Render-level scissoring. This is passed down to your render function but not used for CPU-side coarse clipping. Prefer using higher-level ImGui::PushClipRect() to affect logic (hit-testing and widget culling)

``` c
void PushClipRectFullScreen()
```

``` c
void PopClipRect()
```

``` c
void PushTextureID(ImTextureID texture_id)
```

``` c
void PopTextureID()
```
### Primitives
- For rectangular primitives, "p_min" and "p_max" represent the upper-left and lower-right corners.
- For circle primitives, use "num_segments == 0" to automatically calculate tessellation (preferred).
In future versions we will use textures to provide cheaper and higher-quality circles.
Use AddNgon() and AddNgonFilled() functions if you need to guaranteed a specific number of sides.



``` c
void AddLine(const ImVec2& p1, const ImVec2& p2, ImU32 col, float thickness = 1.0f)
```

``` c
void AddRect(const ImVec2& p_min, const ImVec2& p_max, ImU32 col, float rounding = 0.0f, ImDrawCornerFlags rounding_corners = ImDrawCornerFlags_All, float thickness = 1.0f)
```
a: upper-left, b: lower-right (== upper-left + size), rounding_corners_flags: 4 bits corresponding to which corner to round

``` c
void AddRectFilled(const ImVec2& p_min, const ImVec2& p_max, ImU32 col, float rounding = 0.0f, ImDrawCornerFlags rounding_corners = ImDrawCornerFlags_All)
```
a: upper-left, b: lower-right (== upper-left + size)

``` c
void AddRectFilledMultiColor(const ImVec2& p_min, const ImVec2& p_max, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left)
```

``` c
void AddQuad(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col, float thickness = 1.0f)
```

``` c
void AddQuadFilled(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col)
```

``` c
void AddTriangle(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, ImU32 col, float thickness = 1.0f)
```

``` c
void AddTriangleFilled(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, ImU32 col)
```

``` c
void AddCircle(const ImVec2& center, float radius, ImU32 col, int num_segments = 12, float thickness = 1.0f)
```

``` c
void AddCircleFilled(const ImVec2& center, float radius, ImU32 col, int num_segments = 12)
```

``` c
void AddNgon(const ImVec2& center, float radius, ImU32 col, int num_segments, float thickness = 1.0f)
```

``` c
void AddNgonFilled(const ImVec2& center, float radius, ImU32 col, int num_segments)
```

``` c
void AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL)
```

``` c
void AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL)
```

``` c
void AddPolyline(const ImVec2* points, int num_points, ImU32 col, bool closed, float thickness)
```

``` c
void AddConvexPolyFilled(const ImVec2* points, int num_points, ImU32 col)
```
Note: Anti-aliased filling requires points to be in clockwise order.

``` c
void AddBezierCurve(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col, float thickness, int num_segments = 0)
```
### Image primitives
- Read FAQ to understand what ImTextureID is.
- "p_min" and "p_max" represent the upper-left and lower-right corners of the rectangle.
- "uv_min" and "uv_max" represent the normalized texture coordinates to use for those corners. Using (0,0)->(1,1) texture coordinates will generally display the entire texture.



``` c
void AddImage(ImTextureID user_texture_id, const ImVec2& p_min, const ImVec2& p_max, const ImVec2& uv_min = ImVec2(0, 0), const ImVec2& uv_max = ImVec2(1, 1), ImU32 col = IM_COL32_WHITE)
```

``` c
void AddImageQuad(ImTextureID user_texture_id, const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, const ImVec2& uv1 = ImVec2(0, 0), const ImVec2& uv2 = ImVec2(1, 0), const ImVec2& uv3 = ImVec2(1, 1), const ImVec2& uv4 = ImVec2(0, 1), ImU32 col = IM_COL32_WHITE)
```

``` c
void AddImageRounded(ImTextureID user_texture_id, const ImVec2& p_min, const ImVec2& p_max, const ImVec2& uv_min, const ImVec2& uv_max, ImU32 col, float rounding, ImDrawCornerFlags rounding_corners = ImDrawCornerFlags_All)
```
### Stateful path API, add points then finish with PathFillConvex() or PathStroke()



``` c
void PathArcTo(const ImVec2& center, float radius, float a_min, float a_max, int num_segments = 10)
```

``` c
void PathArcToFast(const ImVec2& center, float radius, int a_min_of_12, int a_max_of_12)
```
Use precomputed angles for a 12 steps circle

``` c
void PathBezierCurveTo(const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, int num_segments = 0)
```

``` c
void PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, ImDrawCornerFlags rounding_corners = ImDrawCornerFlags_All)
```
### Advanced



``` c
void AddCallback(ImDrawCallback callback, void* callback_data)
```
Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.

``` c
void AddDrawCmd()
```
This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible
### Advanced: Channels
- Use to split render into layers. By switching channels to can render out-of-order (e.g. submit FG primitives before BG primitives)
- Use to minimize draw calls (e.g. if going back-and-forth between multiple clipping rectangles, prefer to append into separate channels then merge at the end)
- FIXME-OBSOLETE: This API shouldn't have been in ImDrawList in the first place!
Prefer using your own persistent copy of ImDrawListSplitter as you can stack them.
Using the ImDrawList::ChannelsXXXX you cannot stack a split over another.


### Internal helpers
NB: all primitives needs to be reserved via PrimReserve() beforehand!



``` c
void Clear()
```

``` c
void ClearFreeMemory()
```

``` c
void PrimReserve(int idx_count, int vtx_count)
```

``` c
void PrimUnreserve(int idx_count, int vtx_count)
```

``` c
void PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col)
```
Axis aligned rectangle (composed of two triangles)

``` c
void PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col)
```

``` c
void PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col)
```

``` c
void UpdateClipRect()
```

``` c
void UpdateTextureID()
```
## All draw data to render a Dear ImGui frame
(NB: the style and the naming convention here is a little inconsistent, we currently preserve them for backward compatibility purpose,
as this is one of the oldest structure exposed by the library! Basically, ImDrawList == CmdList)

All draw data to render a Dear ImGui frame
(NB: the style and the naming convention here is a little inconsistent, we currently preserve them for backward compatibility purpose,
as this is one of the oldest structure exposed by the library! Basically, ImDrawList == CmdList)
## struct  **<struct> ImDrawData**
### Functions



``` c
void DeIndexAllBuffers()
```
Helper to convert all buffers from indexed to non-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!

``` c
void ScaleClipRects(const ImVec2& fb_scale)
```
Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than Dear ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
