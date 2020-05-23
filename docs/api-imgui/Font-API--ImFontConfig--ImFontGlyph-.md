# Font API (ImFontConfig, ImFontGlyph, ImFontAtlasFlags, ImFontAtlas, ImFontGlyphRangesBuilder, ImFont)
##  Hold rendering data for one glyph.
 (Note: some language parsers may fail to convert the 31+1 bitfield members, in this case maybe drop store a single u32 or we can rework this)
##  Helper to build glyph ranges from text/string data. Feed your application strings/characters to it then call BuildRanges().
 This is essentially a tightly packed of vector of 64k booleans = 8KB storage.
##  See ImFontAtlas::AddCustomRectXXX functions.

**[ImFontAtlasFlags_None](#ImFontAtlasFlags_None)**  –  undefined

**[ImFontAtlasFlags_NoPowerOfTwoHeight](#ImFontAtlasFlags_NoPowerOfTwoHeight)**  –  Don't round the height to next power of two
##  Load and rasterize multiple TTF/OTF fonts into a same texture. The font atlas will build a single texture holding:
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
##  Font runtime data and rendering
 ImFontAtlas automatically loads a default embedded font for you when you call GetTexDataAsAlpha8() or GetTexDataAsRGBA32().
##  Include imgui_user.h at the end of imgui.h (convenient for user to only explicitly include vanilla imgui.h)
