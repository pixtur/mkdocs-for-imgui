# Obsolete functions (Will be removed! Read 'API BREAKING CHANGES' section in imgui.cpp for details)
// Please keep your copy of dear imgui up to date! Occasionally set '#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS' in imconfig.h to stay ahead.

### OBSOLETED in 1.72 (from July 2019)


### OBSOLETED in 1.71 (from June 2019)


### OBSOLETED in 1.70 (from May 2019)


### OBSOLETED in 1.69 (from Mar 2019)


### OBSOLETED in 1.66 (from Sep 2018)


### OBSOLETED in 1.63 (between Aug 2018 and Sept 2018)


### OBSOLETED in 1.61 (between Apr 2018 and Aug 2018)


**[InputFloat(...)](#InputFloat)**  Use the 'const char* format' version instead of 'decimal_precision'!


``` c
bool InputFloat(const char* label, float* v, float step, float step_fast, int decimal_precision, ImGuiInputTextFlags flags = 0)
```


**[InputFloat2(...)](#InputFloat2)**

``` c
bool InputFloat2(const char* label, float v[2], int decimal_precision, ImGuiInputTextFlags flags = 0)
```


**[InputFloat3(...)](#InputFloat3)**

``` c
bool InputFloat3(const char* label, float v[3], int decimal_precision, ImGuiInputTextFlags flags = 0)
```


**[InputFloat4(...)](#InputFloat4)**

``` c
bool InputFloat4(const char* label, float v[4], int decimal_precision, ImGuiInputTextFlags flags = 0)
```


### OBSOLETED in 1.60 (between Dec 2017 and Apr 2018)

