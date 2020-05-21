# Font API (ImFontConfig, ImFontGlyph, ImFontAtlasFlags, ImFontAtlas, ImFontGlyphRangesBuilder, ImFont)
## struct  **<struct> ImFontConfig**
### [Internal]



``` c
I mFontConfig()
```
## Hold rendering data for one glyph.
(Note: some language parsers may fail to convert the 31+1 bitfield members, in this case maybe drop store a single u32 or we can rework this)

Hold rendering data for one glyph.
(Note: some language parsers may fail to convert the 31+1 bitfield members, in this case maybe drop store a single u32 or we can rework this)
## struct  **<struct> ImFontGlyph**
## Helper to build glyph ranges from text/string data. Feed your application strings/characters to it then call BuildRanges().
This is essentially a tightly packed of vector of 64k booleans = 8KB storage.

Helper to build glyph ranges from text/string data. Feed your application strings/characters to it then call BuildRanges().
This is essentially a tightly packed of vector of 64k booleans = 8KB storage.
## struct  **<struct> ImFontGlyphRangesBuilder**

``` c
void AddText(const char* text, const char* text_end = NULL)
```
Add string (each character of the UTF-8 string are added)

``` c
void AddRanges(const ImWchar* ranges)
```
Add ranges, e.g. builder.AddRanges(ImFontAtlas::GetGlyphRangesDefault()) to force add all of ASCII/Latin+Ext

``` c
void BuildRanges(ImVector<ImWchar>* out_ranges)
```
Output new ranges
## See ImFontAtlas::AddCustomRectXXX functions.

See ImFontAtlas::AddCustomRectXXX functions.
## struct  **<struct> ImFontAtlasCustomRect**
## enum  **<enum> ImFontAtlasFlags_**
## Load and rasterize multiple TTF/OTF fonts into a same texture. The font atlas will build a single texture holding:
- One or more fonts.
- Custom graphics data needed to render the shapes needed by Dear ImGui.
- Mouse cursor shapes for software cursor rendering (unless setting 'Flags |= ImFontAtlasFlags_NoMouseCursors' in the font atlas).
It is the user-code responsibility to setup/build the atlas, then upload the pixel data into a texture accessible by your graphics api.
- Optionally, call any of the AddFont*** functions. If you don't call any, the default font embedded in the code will be loaded for you.
- Call GetTexDataAsAlpha8() or GetTexDataAsRGBA32() to build and retrieve pixels data.
- Upload the pixels data into a texture within your graphics system (see imgui_impl_xxxx.cpp examples)
- Call SetTexID(my_tex_id); and pass the pointer/identifier to your texture in a format natural to your graphics API.
This value will be passed back to you during rendering to identify the texture. Read FAQ entry about ImTextureID for more details.
Common pitfalls:
- If you pass a 'glyph_ranges' array to AddFont*** functions, you need to make sure that your array persist up until the
atlas is build (when calling GetTexData*** or Build()). We only copy the pointer, not the data.
- Important: By default, AddFontFromMemoryTTF() takes ownership of the data. Even though we are not writing to it, we will free the pointer on destruction.
You can set font_cfg->FontDataOwnedByAtlas=false to keep ownership of your data and it won't be freed,
- Even though many functions are suffixed with "TTF", OTF data is supported just as well.
- This is an old API and it is currently awkward for those and and various other reasons! We will address them in the future!

Load and rasterize multiple TTF/OTF fonts into a same texture. The font atlas will build a single texture holding:
- One or more fonts.
- Custom graphics data needed to render the shapes needed by Dear ImGui.
- Mouse cursor shapes for software cursor rendering (unless setting 'Flags |= ImFontAtlasFlags_NoMouseCursors' in the font atlas).
It is the user-code responsibility to setup/build the atlas, then upload the pixel data into a texture accessible by your graphics api.
- Optionally, call any of the AddFont*** functions. If you don't call any, the default font embedded in the code will be loaded for you.
- Call GetTexDataAsAlpha8() or GetTexDataAsRGBA32() to build and retrieve pixels data.
- Upload the pixels data into a texture within your graphics system (see imgui_impl_xxxx.cpp examples)
- Call SetTexID(my_tex_id); and pass the pointer/identifier to your texture in a format natural to your graphics API.
This value will be passed back to you during rendering to identify the texture. Read FAQ entry about ImTextureID for more details.
Common pitfalls:
- If you pass a 'glyph_ranges' array to AddFont*** functions, you need to make sure that your array persist up until the
atlas is build (when calling GetTexData*** or Build()). We only copy the pointer, not the data.
- Important: By default, AddFontFromMemoryTTF() takes ownership of the data. Even though we are not writing to it, we will free the pointer on destruction.
You can set font_cfg->FontDataOwnedByAtlas=false to keep ownership of your data and it won't be freed,
- Even though many functions are suffixed with "TTF", OTF data is supported just as well.
- This is an old API and it is currently awkward for those and and various other reasons! We will address them in the future!
## struct  **<struct> ImFontAtlas**

``` c
I mFontAtlas()
```

``` c
~ ImFontAtlas()
```

``` c
ImFont* AddFont(const ImFontConfig* font_cfg)
```

``` c
ImFont* AddFontDefault(const ImFontConfig* font_cfg = NULL)
```

``` c
ImFont* AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL)
```

``` c
ImFont* AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL)
```
Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after destruction of the atlas. Set font_cfg->FontDataOwnedByAtlas=false to keep ownership of your data and it won't be freed.

``` c
ImFont* AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL)
```
'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.

``` c
ImFont* AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL)
```
'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.

``` c
void ClearInputData()
```
Clear input data (all ImFontConfig structures including sizes, TTF data, glyph ranges, etc.) = all the data used to build the texture and fonts.

``` c
void ClearTexData()
```
Clear output texture data (CPU side). Saves RAM once the texture has been copied to graphics memory.

``` c
void ClearFonts()
```
Clear output font data (glyphs storage, UV coordinates).

``` c
void Clear()
```
Clear all input and output.
### Build atlas, retrieve pixel data.
User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
The pitch is always = Width * BytesPerPixels (1 or 4)
Building in RGBA32 format is provided for convenience and compatibility, but note that unless you manually manipulate or copy color data into
the texture (e.g. when using the AddCustomRect*** api), then the RGB pixels emitted will always be white (~75% of memory/bandwidth waste.



``` c
bool Build()
```
Build pixels data. This is called automatically for you by the GetTexData*** functions.

``` c
void GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL)
```
1 byte per-pixel

``` c
void GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL)
```
4 bytes-per-pixel
### Glyph Ranges


### Helpers to retrieve list of common Unicode ranges (2 value per range, values are inclusive, zero-terminated list)
NB: Make sure that your string are UTF-8 and NOT in your local code page. In C++11, you can create UTF-8 string literal using the u8"Hello world" syntax. See FAQ for details.
NB: Consider using ImFontGlyphRangesBuilder to build glyph ranges from textual data.


### [BETA] Custom Rectangles/Glyphs API


### You can request arbitrary rectangles to be packed into the atlas, for your own purposes.
After calling Build(), you can query the rectangle position and render your pixels.
You can also request your rectangles to be mapped as font glyph (given a font + Unicode point),
so you can render e.g. custom colorful icons and use them as regular glyphs.
Read docs/FONTS.txt for more details about using colorful icons.
Note: this API may be redesigned later in order to support multi-monitor varying DPI settings.



``` c
int AddCustomRectRegular(int width, int height)
```

``` c
int AddCustomRectFontGlyph(ImFont* font, ImWchar id, int width, int height, float advance_x, const ImVec2& offset = ImVec2(0,0))
```
### [Internal]



``` c
void CalcCustomRectUV(const ImFontAtlasCustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max) const;
    IMGUI_API bool              GetMouseCursorTexData(ImGuiMouseCursor cursor, ImVec2* out_offset, ImVec2* out_size, ImVec2 out_uv_border[2], ImVec2 out_uv_fill[2])
```
### Members


### [Internal]
NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.


## Font runtime data and rendering
ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().

Font runtime data and rendering
ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().
## struct  **<struct> ImFont**
### Members: Hot ~20/24 bytes (for CalcTextSize)


### Members: Hot ~36/48 bytes (for CalcTextSize + render loop)


### Members: Cold ~32/40 bytes


### Methods



``` c
I mFont()
```

``` c
~ ImFont()
```
### 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.


### [Internal] Don't use!



``` c
void BuildLookupTable()
```

``` c
void ClearOutputData()
```

``` c
void GrowIndex(int new_size)
```

``` c
void AddGlyph(ImWchar c, float x0, float y0, float x1, float y1, float u0, float v0, float u1, float v1, float advance_x)
```

``` c
void AddRemapChar(ImWchar dst, ImWchar src, bool overwrite_dst = true)
```
Makes 'dst' character/glyph points to 'src' character/glyph. Currently needs to be called AFTER fonts have been built.

``` c
void SetGlyphVisible(ImWchar c, bool visible)
```

``` c
void SetFallbackChar(ImWchar c)
```

``` c
bool IsGlyphRangeUnused(unsigned int c_begin, unsigned int c_last)
```
## Include imgui_user.h at the end of imgui.h (convenient for user to only explicitly include vanilla imgui.h)

Include imgui_user.h at the end of imgui.h (convenient for user to only explicitly include vanilla imgui.h)
