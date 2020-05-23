# Draw List API (ImDrawCmd, ImDrawIdx, ImDrawVert, ImDrawChannel, ImDrawListSplitter, ImDrawListFlags, ImDrawList, ImDrawData)
// Hold a series of drawing commands. The user provides a renderer for ImDrawData which essentially contains an array of ImDrawList.
## ImDrawCallback: Draw callbacks for advanced uses [configurable type: override in imconfig.h]
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
## Typically, 1 command = 1 GPU draw call (unless command is a callback)
Pre 1.71 back-ends will typically ignore the VtxOffset/IdxOffset fields. When 'io.BackendFlags & ImGuiBackendFlags_RendererHasVtxOffset'
is enabled, those fields allow us to render meshes larger than 64K vertices while keeping 16-bit indices.
## Vertex index, default to 16-bit
To allow large meshes with 16-bit indices: set 'io.BackendFlags |= ImGuiBackendFlags_RendererHasVtxOffset' and handle ImDrawCmd::VtxOffset in the renderer back-end (recommended).
To use 32-bit indices: override with '#define ImDrawIdx unsigned int' in imconfig.h.
## Vertex layout
## You can override the vertex format layout by defining IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT in imconfig.h
The code expect ImVec2 pos (8 bytes), ImVec2 uv (8 bytes), ImU32 col (4 bytes), but you can re-order them or add other fields as needed to simplify integration in your engine.
The type has to be described within the macro (you can either declare the struct or use a typedef). This is because ImVec2/ImU32 are likely not declared a the time you'd want to set your type up.
NOTE: IMGUI DOESN'T CLEAR THE STRUCTURE AND DOESN'T CALL A CONSTRUCTOR SO ANY CUSTOM FIELD WILL BE UNINITIALIZED. IF YOU ADD EXTRA FIELDS (SUCH AS A 'Z' COORDINATES) YOU WILL NEED TO CLEAR THEM DURING RENDER OR TO IGNORE THEM.
## For use by ImDrawListSplitter.
## Split/Merge functions are used to split the draw list into different layers which can be drawn into out of order.
This is used by the Columns api, so items of each column can be batched together in a same draw call.

**[ImDrawCornerFlags_None](#ImDrawCornerFlags_None)**  –  undefined

**[ImDrawCornerFlags_TopLeft](#ImDrawCornerFlags_TopLeft)**  –  0x1

**[ImDrawCornerFlags_TopRight](#ImDrawCornerFlags_TopRight)**  –  0x2

**[ImDrawCornerFlags_BotLeft](#ImDrawCornerFlags_BotLeft)**  –  0x4

**[ImDrawCornerFlags_BotRight](#ImDrawCornerFlags_BotRight)**  –  0x8

**[ImDrawCornerFlags_Top](#ImDrawCornerFlags_Top)**  –  0x3

**[ImDrawCornerFlags_Bot](#ImDrawCornerFlags_Bot)**  –  0xC

**[ImDrawCornerFlags_Left](#ImDrawCornerFlags_Left)**  –  0x5

**[ImDrawCornerFlags_Right](#ImDrawCornerFlags_Right)**  –  0xA

**[ImDrawListFlags_None](#ImDrawListFlags_None)**  –  undefined

**[ImDrawListFlags_AntiAliasedLines](#ImDrawListFlags_AntiAliasedLines)**  –  Lines are anti-aliased (*2 the number of triangles for 1.0f wide line, otherwise *3 the number of triangles)

**[ImDrawListFlags_AntiAliasedFill](#ImDrawListFlags_AntiAliasedFill)**  –  Filled shapes have anti-aliased edges (*2 the number of vertices)
## Draw command list
This is the low-level list of polygons that ImGui:: functions are filling. At the end of the frame,
all command lists are passed to your ImGuiIO::RenderDrawListFn function for rendering.
Each dear imgui window contains its own ImDrawList. You can use ImGui::GetWindowDrawList() to
access the current window draw list and draw custom primitives.
You can interleave normal ImGui:: calls and adding primitives to the current draw list.
All positions are generally in pixel coordinates (top-left at (0,0), bottom-right at io.DisplaySize), but you are totally free to apply whatever transformation matrix to want to the data (if you apply such transformation you'll want to apply it to ClipRect as well)
Important: Primitives are always added to the list and not culled (culling is done at higher-level by ImGui:: functions), if you use this API a lot consider coarse culling your drawn objects.
## All draw data to render a Dear ImGui frame
(NB: the style and the naming convention here is a little inconsistent, we currently preserve them for backward compatibility purpose,
as this is one of the oldest structure exposed by the library! Basically, ImDrawList == CmdList)
